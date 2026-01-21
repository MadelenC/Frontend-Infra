import { create } from "zustand";
import { getDrivers } from "../services/driverService";

export const useDriverStore = create((set) => ({
  drivers: [],
  loading: false,

  fetchDrivers: async () => {
    set({ loading: true });
    const data = await getDrivers();

    set({
      drivers: data.map(u => ({
        id: u.id,
        nombre: `${u.nombres} ${u.apellidos}`,
      })),
      loading: false,
    });
  },
}));
