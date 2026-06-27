import { create } from "zustand";
import { getVehiclesResumen, getCombustibleMensual,getCombustibleAnual, } from "../services/vehicle_combustibleService";

export const useVehicleResumenStore = create((set) => ({
  vehicles: [],
  chartData: [],
  anualData: [],
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
  fetchCombustibleMensual: async (filters = {}) => {
  try {
    set({ loading: true });

    const data = await getCombustibleMensual(filters);

    set({
      chartData: data,
      loading: false,
    });
  } catch (error) {
    set({
      error: error.toString(),
      loading: false,
    });
  }
},

fetchCombustibleAnual: async (filters = {}) => {
  try {
    set({ loading: true });

    const data = await getCombustibleAnual(filters);

    set({
      anualData: data,
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
