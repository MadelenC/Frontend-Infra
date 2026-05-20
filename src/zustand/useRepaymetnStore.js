import { create } from "zustand";
import { 
  getRepayments,
  createRepayment,
  updateRepayment,
  deleteRepayment
} from "../services/repaymentService";

export const useRepaymentStore = create((set, get) => ({
  repayments: [],
  loading: false,
  error: null,

 
  fetchRepayments: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getRepayments();
      const mapped = data.map(d => ({
        id: d.id,
        serial: d.serial,
        fecha: d.fecha,
        nombre: d.nombre,
        cantidad: d.cantidad,
        detalle: d.detalle,
        insertador: d.insertador,
        mecanico: d.mecanico ? { ...d.mecanico } : null,
          
        vehiculo: d.solicitud?.vehiculo
          ? { ...d.solicitud.vehiculo }
          : null,

        solicitud: d.solicitud || null,
        created_at: d.created_at,
        updated_at: d.updated_at,
      }));
      set({ repayments: mapped, loading: false });
    } catch (err) {
      set({ error: err.message || err, loading: false });
    }
  },


  addRepayment: async (data) => {
    try {
      const newRepayment = await createRepayment(data);
      const mapped = {
        id: newRepayment.id,
        serial: newRepayment.serial,
        fecha: newRepayment.fecha,
        nombre: newRepayment.nombre,
        cantidad: newRepayment.cantidad,
        detalle: newRepayment.detalle,
        insertador: newRepayment.insertador,
        mecanico: newRepayment.mecanico ? { ...newRepayment.mecanico } : null,
        created_at: newRepayment.created_at,
        updated_at: newRepayment.updated_at,
      };
      set({ repayments: [...get().repayments, mapped] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },


  editRepayment: async (id, data) => {
    try {
      const updated = await updateRepayment(id, data);
      const mapped = {
        id: updated.id,
        serial: updated.serial,
        fecha: updated.fecha,
        nombre: updated.nombre,
        cantidad: updated.cantidad,
        detalle: updated.detalle,
        insertador: updated.insertador,
        mecanico: updated.mecanico ? { ...updated.mecanico } : null,
        created_at: updated.created_at,
        updated_at: updated.updated_at,
      };
      set({
        repayments: get().repayments.map(r => (r.id === id ? mapped : r))
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },


  removeRepayment: async (id) => {
    try {
      await deleteRepayment(id);
      set({ repayments: get().repayments.filter(r => r.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));