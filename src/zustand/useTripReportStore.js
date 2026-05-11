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

  setPage: (page) => {
    set({ page });
    get().fetchTripReports();
  },

  setSearch: (search) => {
    set({ search, page: 1 });
    get().fetchTripReports();
  },

  
  fetchTripReports: async () => {
    set({ loading: true, error: null });

    try {
      const res = await getTripReports({
        page: get().page,
        limit: get().limit,
        search: get().search,
      });

      set({
        tripReports: res.data,      
        totalPages: res.totalPages, 
        loading: false,
      });

    } catch (err) {
      set({
        error: err.message || err,
        loading: false,
      });
    }
  },

  addTripReport: async (data) => {
    try {
      const newReport = await createTripReport(data);

      set({
        tripReports: [newReport, ...get().tripReports],
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  editTripReport: async (id, data) => {
    try {
      const updated = await updateTripReport(id, data);

      set({
        tripReports: get().tripReports.map((r) =>
          r.id === id ? { ...r, ...updated } : r
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

 
  removeTripReport: async (id) => {
    try {
      await deleteTripReport(id);

      set({
        tripReports: get().tripReports.filter((r) => r.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));