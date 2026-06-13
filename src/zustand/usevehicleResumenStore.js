import { create } from "zustand";
import { getVehiclesResumen, getCombustibleMensual, } from "../services/vehicle_combustibleService";

export const useVehicleResumenStore = create((set) => ({
  vehicles: [],
  chartData: [],
  loading: false,
  error: null,

  fetchVehiclesResumen: async (estado = "") => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getVehiclesResumen({
        estado,
      });

      set({
        vehicles: response.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.toString(),
        loading: false,
      });
    }
  },
  fetchCombustibleMensual: async (year = new Date().getFullYear()) => {
    try {
      set({ loading: true });

      const data = await getCombustibleMensual(year);

      set({
        chartData: data || [],
        loading: false,
      });
    } catch (error) {
      set({
        error: error.toString(),
        loading: false,
      });
    }
  },

}));