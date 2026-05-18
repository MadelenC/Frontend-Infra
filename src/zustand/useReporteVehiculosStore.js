import { create } from "zustand";
import { getReporteVehiculos } from "../services/reporteVehiculosService";

export const useReporteVehiculosStore = create((set) => ({

  reporte: [],
   totales: null,
  loading: false,

  fetchReporte: async () => {
    set({ loading: true });

    try {
      const res = await getReporteVehiculos();

       set({
        reporte: res.data?.data || [],
        totales: res.data?.totales || null
      });

    } catch (error) {
      console.error("Error reporte vehículos", error);
    }

    set({ loading: false });
  }

}));