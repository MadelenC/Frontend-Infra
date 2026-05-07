import { create } from "zustand";
import {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
  getTripById
} from "../services/TripsService";

export const useTripsStore = create((set, get) => ({
  trips: [],
  loading: false,
  loadingTrip: false,
  error: null,
  selectedTrip: null,

  page: 1,
  limit: 8,
  totalPages: 1,

  setPage: (page) => set({ page }),

  
  fetchTrips: async () => {
    const { page, limit, loading } = get();

    if (loading) return;

    set({ loading: true, error: null });

    try {
      const res = await getTrips({ page, limit });

      set({
        trips: res.data,
        totalPages: res.totalPages,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Error al cargar viajes",
        loading: false,
      });
    }
  },

  
  getTripById: async (id) => {
    try {
      set({ loadingTrip: true });

      const data = await getTripById(id);

      set({
        selectedTrip: data,
        loadingTrip: false,
      });

      return data;
    } catch (err) {
      set({
        loadingTrip: false,
        error: err.message || "Error al obtener viaje"
      });
      return null;
    }
  },


  addTrip: async (data) => {
    try {
      const newTrip = await createTrip(data);

      set((state) => ({
        trips: [...state.trips, newTrip]
      }));

      return { ok: true, data: newTrip };
    } catch (err) {
      return {
        ok: false,
        error: err?.message || "Error al crear viaje"
      };
    }
  },


  editTrip: async (id, data) => {
    try {
      const updated = await updateTrip(id, data);

      set((state) => ({
        trips: state.trips.map((t) =>
          t.id === id ? updated : t
        )
      }));

      return { ok: true, data: updated };
    } catch (err) {
      return {
        ok: false,
        error: err?.message || "Error al actualizar viaje"
      };
    }
  },


  removeTrip: async (id) => {
    try {
      await deleteTrip(id);

      set((state) => ({
        trips: state.trips.filter((t) => t.id !== id)
      }));

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err?.message || "Error al eliminar viaje"
      };
    }
  }
}));