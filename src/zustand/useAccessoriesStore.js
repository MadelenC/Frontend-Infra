import { create } from "zustand";
import {
  getAccessories,
  createAccessory,
  deleteAccessory,
} from "../services/accesoriesService";

export const useAccessoriesStore = create((set, get) => ({
  accessories: [],
  loading: false,
  error: null,


  fetchAccessories: async (solicitudId = null) => {
    set({ loading: true, error: null });

    try {
      const data = await getAccessories(solicitudId);

      const mapped = data.map(a => ({
        id: a.id,
        solicitud1: a.solicitud1,
        solicitud_id: a.solicitud?.id || a.solicitud_id,
      }));

      set({ accessories: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

 
  addAccessory: async (data) => {
    try {
      const newAcc = await createAccessory({
        solicitud: data.solicitud,
        solicitud_id: data.solicitud_id,
      });

      const mapped = {
        id: newAcc.id,
        solicitud: newAcc.solicitud,
        solicitud_id: newAcc.solicitud_id,
      };

      set({ accessories: [...get().accessories, mapped] });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  
  removeAccessory: async (id) => {
    try {
      await deleteAccessory(id);
      set({
        accessories: get().accessories.filter(a => a.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));