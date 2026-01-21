import { create } from "zustand";
import { getRolTravels, createRolTravel, updateRolTravel, deleteRolTravel } from "../services/rolTravelService";

export const useRolTravelStore = create((set, get) => ({
  rolTravels: [],
  loading: false,
  error: null,

  fetchRolTravels: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getRolTravels();
      // Mapeo para mostrar chofer y tipos correctamente
      const mapped = data.map(v => ({
        id: v.id,
        chofer: v.user?.nombres + " " + v.user?.apellidos,
        tipoA: v.tipoa,
        tipoB: v.tipob,
        tipoC: v.tipoc,
        cantidad: v.cantidad,
        fecha: v.fecha,
        excepciones: v.excepciones || "",
      }));
      set({ rolTravels: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  addRolTravel: async (data) => {
    try {
      const newTravel = await createRolTravel(data);
      set({ rolTravels: [...get().rolTravels, newTravel] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  editRolTravel: async (id, data) => {
    try {
      const updated = await updateRolTravel(id, data);
      set({
        rolTravels: get().rolTravels.map(v => v.id === id ? updated : v)
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  removeRolTravel: async (id) => {
    try {
      await deleteRolTravel(id);
      set({ rolTravels: get().rolTravels.filter(v => v.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));

