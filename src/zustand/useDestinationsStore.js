import { create } from "zustand";
import { 
  getDestinos, 
  createDestino, 
  updateDestino, 
  deleteDestino 
} from "../services/destinationsService";

export const useDestinoStore = create((set, get) => ({
  destinos: [],
  loading: false,
  error: null,
  page: 1,
  limit: 8,
  totalPages: 1,

 
fetchDestinos: async ( page, limit, departamento, search  ) => {
  set({ loading: true, error: null });

  try {
    const data = await getDestinos({
      page,
      limit,
      departamento,
      search,
    });

    const mapped = data.data.map(d => ({
      id: d.id,
      departamentoInicio: d.dep_inicio,
      departamentoFinal: d.dep_final,
      origen: d.origen,
      destino: d.destino,
      ruta: d.ruta,
      distancia: d.kilometraje,
      tiempo: d.tiempo,
      mapa: d.mapa ? { ...d.mapa } : { lat: -17.3935, lng: -66.1568 },
    }));

    set({
      destinos: mapped,
      totalPages: data.totalPages,
      loading: false,
    });

  } catch (err) {
    set({ error: err.message || err, loading: false });
  }
},

//  TODOS LOS DESTINOS 
  fetchAllDestinos: async () => {
    try {
      const res = await getDestinos({
        page: 1,
        limit: 1000, // 👈 trae todo
        departamento: "",
        search: "",
      });

      return res.data.map(d => ({
        id: d.id,
        departamentoInicio: d.dep_inicio,
        departamentoFinal: d.dep_final,
        origen: d.origen,
        destino: d.destino,
        ruta: d.ruta,
        distancia: d.kilometraje,
        tiempo: d.tiempo,
        mapa: d.mapa ? { ...d.mapa } : { lat: -17.3935, lng: -66.1568 },
      }));

    } catch (err) {
      console.error(err);
      return [];
    }
  },


  // Crear un destino
  addDestino: async (data) => {
    try {
      const newDestino = await createDestino(data);
      const mapped = {
        id: newDestino.id,
        departamentoInicio: newDestino.dep_inicio, 
        origen: newDestino.origen,
        ruta: newDestino.ruta,
        destino: newDestino.destino,
        departamentoFinal: newDestino.dep_final,
        distancia: newDestino.kilometraje,
        tiempo: newDestino.tiempo,
        mapa: newDestino.mapa ? { ...newDestino.mapa } : { lat: -17.3935, lng: -66.1568, titulo: "" },
      };
      set({ destinos: [...get().destinos, mapped] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  // Editar un destino
  editDestino: async (id, data) => {
    try {
      const payload = {
        dep_inicio: data.departamentoInicio,
        dep_final: data.departamentoFinal,
        origen: data.origen,
        destino: data.destino,
        ruta: data.ruta,
        kilometraje: data.distancia,
        tiempo: data.tiempo,
      };

      const updated = await updateDestino(id, payload);

      const mapped = {
        id: updated.id,
        departamentoInicio: updated.dep_inicio,
        origen: updated.origen,
        ruta: updated.ruta,
        destino: updated.destino,
        departamentoFinal: updated.dep_final,
        distancia: updated.kilometraje,
        tiempo: updated.tiempo,
        mapa: updated.mapa ? { ...updated.mapa } : { lat: -17.3935, lng: -66.1568, titulo: "" },
      };

      set({
        destinos: get().destinos.map(d => (d.id === id ? mapped : d)),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

 
  removeDestino: async (id) => {
    try {
      await deleteDestino(id);
      set({ destinos: get().destinos.filter(d => d.id !== id) });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  updateDestinoMapa: async (id, newMapa) => {
    try {
      // Aquí puedes llamar a la API si quieres guardar cambios
      // await updateDestino(id, { mapa: newMapa });

      set({
        destinos: get().destinos.map(d =>
          d.id === id
            ? { ...d, mapa: { ...d.mapa, ...newMapa } }
            : d
        ),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));


