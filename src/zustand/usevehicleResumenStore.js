import { create } from "zustand";
import { getVehiclesResumen } from "../services/vehicle_combustibleService";

export const useVehicleResumenStore = create((set) => ({
  vehicles: [],
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
}));