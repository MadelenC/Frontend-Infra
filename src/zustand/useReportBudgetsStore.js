// stores/useBudgetsReportStore.js

import { create } from "zustand";

import {
getBudgetById 
} from "../services/reportBudgetsService";



export const useBudgetsReportStore = create((set) => ({

  loading: false,

  fetchReporte: async (id) => {

    set({ loading: true });

    try {

      const data = await getBudgetById (id);

      console.log("DATA REPORTE =>", data);

      set({ loading: false });

      return data; 

    } catch (error) {

      console.log(error);

      set({ loading: false });

      return null;
    }
  },

}));


