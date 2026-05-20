import { create } from "zustand";
import { getReporteDepartureById } from "../services/reporteDepartureService.js";

export const useReporteDepartureStore = create((set) => ({
  boleta: null,
  loading: false,

  fetchBoleta: async (id) => {
    set({ loading: true });

    try {
      const res = await getReporteDepartureById(id);
      set({ boleta: res || null });
      return res || null;
    } catch (error) {
      console.error("Error al obtener la boleta:", error);
      set({ boleta: null });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  clearBoleta: () => set({ boleta: null }),
}));