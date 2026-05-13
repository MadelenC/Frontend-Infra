import { create } from "zustand";

import { getDashboardStats }
from "../services/dashboardService";

export const useDashboardStore =
  create((set) => ({

    stats: null,
    loading: false,

    fetchDashboardStats: async () => {

      try {

        set({ loading: true });

        const data =
          await getDashboardStats();

        set({
          stats: data,
          loading: false,
        });

      } catch (error) {

        console.error(error);

        set({ loading: false });
      }
    },
}));