import { create } from "zustand";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";

export const useVehicleStore = create((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getVehicles();

      // 🔁 MAPEO BD → UI
      const mapped = data.map((v) => ({
        id: v.id,
        asignacion: v.codigo,      // BD: codigo
        placa: v.placa,
        asientos: v.pasajeros,     // BD: pasajeros / personas
        tipo: v.tipog,             // BD: tipog
        kilometraje: v.kilometraje || "—",
        estado: v.estado,
      }));

      set({ vehicles: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },

  addVehicle: async (data) => {
    try {
      const newVehicle = await createVehicle(data);
      set({ vehicles: [...get().vehicles, newVehicle] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  editVehicle: async (id, data) => {
    try {
      const updated = await updateVehicle(id, data);
      set({
        vehicles: get().vehicles.map((v) =>
          v.id === id ? updated : v
        ),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  removeVehicle: async (id) => {
    try {
      await deleteVehicle(id);
      set({
        vehicles: get().vehicles.filter((v) => v.id !== id),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));

