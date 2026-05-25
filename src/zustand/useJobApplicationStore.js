import { create } from "zustand";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../services/jobApplicationService";

export const useJobApplicationStore = create((set, get) => ({
  applications: [],
  loading: false,
  error: null,

  page: 1,
  limit: 8,
  totalPages: 1,
  search: "",
chofer: "",
vehiculoId: "",


  setPage: (page) => set({ page }),

  

  fetchApplications: async ({ page, search, chofer, vehiculoId } = {}) => {
  const res = await getApplications({
    page,
    limit: get().limit,
    search: search ?? get().search,
    chofer: chofer ?? get().chofer,
    vehiculoId: vehiculoId ?? get().vehiculoId,
  });

  set({
    applications: res.data,
    totalPages: res.totalPages,
  });
},

  addApplication: async (data) => {
    try {
      const newApp = await createApplication(data);

      const mapped = {
        id: newApp.id,
        chofer: newApp.chofer,
        descripcion: newApp.descripsoli,
        fecha: newApp.fecha,
        vehiculo: newApp.vehiculo,
        accesorios: newApp.accesorios || [],
        createdAt: newApp.created_at,
        updatedAt: newApp.updated_at,
      };

      set({
        applications: [mapped, ...get().applications],
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  

  editApplication: async (id, data) => {
    try {
      const payload = {
        chofer: data.chofer,
        descripsoli: data.descripsoli ?? data.descripcion,
        fecha: data.fecha,
        vehiculo_id: data.vehiculo_id,
        accesorio_ids: data.accesorio_ids || [],
        nuevos_accesorios: data.nuevos_accesorios || [],
      };

      const updated = await updateApplication(id, payload);

      const mapped = {
        id: updated.id,
        chofer: updated.chofer,
        descripcion: updated.descripsoli,
        fecha: updated.fecha,
        vehiculo: updated.vehiculo,
        accesorios: updated.accesorios || [],
        createdAt: updated.created_at,
        updatedAt: updated.updated_at,
      };

      set({
        applications: get().applications.map(a =>
          a.id === id ? mapped : a
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },



  removeApplication: async (id) => {
    try {
      await deleteApplication(id);

      set({
        applications: get().applications.filter(a => a.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  setSearch: (search) => set({ search, page: 1 }),
setChofer: (chofer) => set({ chofer, page: 1 }),
setVehiculoId: (vehiculoId) => set({ vehiculoId, page: 1 }),
}));