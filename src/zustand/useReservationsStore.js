import { create } from "zustand";
import { getReservas, createReserva, updateReserva, deleteReserva } from "../services/reservationsService";

export const useReservaStore = create((set, get) => ({
  reservas: [],
  loading: false,
  error: null,

 page: 1,
  limit: 8,
  totalPages: 1,

  estadoFilter: "",


  setPage: (page) => {
    set({ page });
  },

  setEstadoFilter: (estado) => {
    set({ estadoFilter: estado, page: 1 });
  },

  fetchReservas: async () => {
    const { page, limit, estadoFilter, loading } = get();

    if (loading) return;

    set({ loading: true, error: null });

    try {
      const res = await getReservas({
        page,
        limit,
        estado: estadoFilter,
      });

      set({
        reservas: res.data,
        totalPages: res.totalPages,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Error al cargar reservas",
        loading: false,
      });
    }
  },

  addReserva: async (data) => {
    const response = await createReserva(data);
    if (response.ok) {
      set({ reservas: [...get().reservas, response.data] });
      return { ok: true };
    } else {
      return { ok: false, error: response.error };
    }
  },

  editReserva: async (id, data) => {
    const response = await updateReserva(id, data);
    if (response.ok) {
      set({
        reservas: get().reservas.map(r => r.id === id ? response.data : r),
      });
      return { ok: true };
    } else {
      return { ok: false, error: response.error };
    }
  },

  removeReserva: async (id) => {
    const response = await deleteReserva(id);
    if (response.ok) {
      set({ reservas: get().reservas.filter(r => r.id !== id) });
      return { ok: true };
    } else {
      return { ok: false, error: response.error };
    }
  },
}));