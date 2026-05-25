import { create } from "zustand";

import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../services/TravelBudgetsService.js";
let debounceTimer = null;

export const useTravelBudgetsStore = create((set, get) => ({
  budgets: [],
  loading: false,
  error: null,

  page: 1,
  limit: 8,
  search: "",
  totalPages: 1,

 
  fetchBudgets: async (page = 1, search = "") => {
    set({ loading: true, error: null });

    try {
      const limit = get().limit;

      const data = await getBudgets({
        page,
        limit,
        search,
      });

      set({
        budgets: data.data,
        totalPages: data.totalPages,
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message || err,
        loading: false,
      });
    }
  },

  setPage: (page) => set({ page }),
  
  addBudget: async (data) => {
    try {
      await createBudget(data);

      await get().fetchBudgets();

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err.message || err,
      };
    }
  },

  // Editar
  editBudget: async (id, data) => {
    try {
      await updateBudget(id, data);

      await get().fetchBudgets();

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err.message || err,
      };
    }
  },

  // Eliminar
  removeBudget: async (id) => {
    try {
      await deleteBudget(id);

      await get().fetchBudgets();

      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err.message || err,
      };
    }
  },
}));