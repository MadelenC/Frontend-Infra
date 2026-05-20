import { create } from "zustand";
import {
  getTripReports,
  createTripReport,
  updateTripReport,
  deleteTripReport,
} from "../services/TripReportService";

export const useTripReportStore = create((set, get) => ({
  tripReports: [],
  loading: false,
  error: null,

  page: 1,
  limit: 8,
  totalPages: 1,
  search: "",

  

  setPage: (page) => set({ page }),

  setSearch: (search) => set({ search, page: 1 }),


  fetchTripReports: async () => {
    const { page, limit, search } = get();

    set({ loading: true, error: null });

    try {
      const res = await getTripReports({
        page,
        limit,
        search,
      });

      set({
        tripReports: res.data,
        totalPages: res.totalPages,
        loading: false,
      });

    } catch (err) {
      set({
        error: err.message || "Error al cargar trip reports",
        loading: false,
      });
    }
  },

  

  addTripReport: async (data) => {
    try {
      const newReport = await createTripReport(data);

      set((state) => ({
        tripReports: [newReport, ...state.tripReports],
      }));

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  editTripReport: async (id, data) => {
    try {
      const updated = await updateTripReport(id, data);

      set((state) => ({
        tripReports: state.tripReports.map((r) =>
          r.id === id ? updated : r
        ),
      }));

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },


  removeTripReport: async (id) => {
    try {
      await deleteTripReport(id);

      set((state) => ({
        tripReports: state.tripReports.filter((r) => r.id !== id),
      }));

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },
}));