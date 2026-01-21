import { create } from "zustand";
import {
  getMaps,
  createMap,
  updateMap,
  deleteMap,
} from "../services/mapsService";

export const useMapsStore = create((set, get) => ({
  maps: [],
  loading: false,
  error: null,

  // Traer todos los mapas
  fetchMaps: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getMaps();

      const mapped = data.map((m) => ({
        id: m.id,
        destino: m.user?.destino || "",
        titulo: m.titulo,
        lat: m.lat,
        lng: m.lng,
      }));

      set({ maps: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  // Crear mapa
  addMap: async (data) => {
    try {
      const newMap = await createMap(data);

      const mapped = {
        id: newMap.id,
        destino: newMap.destino,
        titulo: newMap.titulo,
        lat: newMap.lat,
        lng: newMap.lng,
      };

      set({ maps: [...get().maps, mapped] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar mapa
  editMap: async (id, data) => {
    try {
      const updated = await updateMap(id, data);

      const mapped = {
        id: updated.id,
        destino: updated.destino,
        titulo: updated.titulo,
        lat: updated.lat,
        lng: updated.lng,
      };

      set({
        maps: get().maps.map((m) => (m.id === id ? mapped : m)),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Eliminar mapa
  removeMap: async (id) => {
    try {
      await deleteMap(id);
      set({ maps: get().maps.filter((m) => m.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));
