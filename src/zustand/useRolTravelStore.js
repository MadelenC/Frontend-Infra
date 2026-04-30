import { create } from "zustand";
import {
  getRolTravels,
  createRolTravel,
  updateRolTravel,
  deleteRolTravel,
} from "../services/rolTravelService";

function assignDisplayId(arr) {
  return arr.map((item, index) => ({
    ...item,
    displayId: index + 1,
  }));
}

export const useRolTravelStore = create((set, get) => ({
  rolTravels: [],
  loading: false,
  error: null,

  page: 1,
  limit: 10,
  totalPages: 1,

  
  fetchRolTravels: async () => {
    set({ loading: true, error: null });

    try {
      const { page, limit } = get();

      const res = await getRolTravels({ page, limit });

      const mapped = res.data.map((v) => ({
        id: v.id,
        chofer:
          v.user?.nombres + " " + v.user?.apellidos || "Desconocido",
        chofer_id: v.user?.id,
        tipoA: v.tipoa,
        tipoB: v.tipob,
        tipoC: v.tipoc,
        cantidad: v.cantidad,
        fecha: v.fecha,
        exceptions: v.exceptions || [],
      }));

      set({
        rolTravels: assignDisplayId(mapped),
        totalPages: res.totalPages,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  setPage: (page) => {
    set({ page });
    get().fetchRolTravels();
  },

  
  addRolTravel: async (data) => {
    try {
      await createRolTravel(data);
      get().fetchRolTravels();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  editRolTravel: async (id, data) => {
    try {
      await updateRolTravel(id, data);
      get().fetchRolTravels();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  removeRolTravel: async (id) => {
    try {
      await deleteRolTravel(id);
      get().fetchRolTravels();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },
}));

