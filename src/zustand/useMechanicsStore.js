import { create } from "zustand";

import {
  getMechanics,
  createMechanic,
  updateMechanic,
  deleteMechanic,
} from "../services/mechanicsService.js";

export const useMechanicsStore = create((set, get) => ({
  mechanics: [],
  loading: false,
  error: null,

  page: 1,
  limit: 8,
  totalPages: 1,
  total: 0,
  search: "",

  setPage: (page) => set({ page }),

  setSearch: (search) => {
    set({ search, page: 1 });
  },

  fetchMechanics: async () => {
    set({ loading: true, error: null });

    try {
      const {
        page,
        limit,
        search,
      } = get();

      const data = await getMechanics({
        page,
        limit,
        search,
      });

      const mapped = data.data.map((m) => ({
        id: m.id,
        fecha: m.fecha,
        cantidad: m.cantidad,
        unidad: m.unidad,
        trabajo: m.trabajo,
        marca: m.marca,
        codigo: m.codigo,
        observacion: m.observacion,
        kilometraje: m.kilometraje,
        insertador: m.insertador,
        solicitud_id: m.solicitud_id,

        solicitud: m.solicitud
          ? { ...m.solicitud }
          : null,

        created_at: m.created_at,
        updated_at: m.updated_at,
      }));

      set({
        mechanics: mapped,
        totalPages: data.totalPages,
        total: data.total,
        loading: false,
      });

    } catch (err) {

      set({
        error: err.message || err,
        loading: false,
      });

    }
  },

  addMechanic: async (data) => {
    try {

      await createMechanic(data);

      await get().fetchMechanics();

      return { ok: true };

    } catch (err) {

      return {
        ok: false,
        error: err.message || err,
      };

    }
  },

  editMechanic: async (id, data) => {
    try {

      await updateMechanic(id, data);

      await get().fetchMechanics();

      return { ok: true };

    } catch (err) {

      return {
        ok: false,
        error: err.message || err,
      };

    }
  },

  removeMechanic: async (id) => {
    try {

      await deleteMechanic(id);

      await get().fetchMechanics();

      return { ok: true };

    } catch (err) {

      return {
        ok: false,
        error: err.message || err,
      };

    }
  },
}));