import { create } from "zustand";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  registrarCambioAceite,
} from "../services/vehicleService";


const mapVehicleFromApi = (v) => ({
    ...v, 
  id: v.id,
  asignacion: v.codigo,
  placa: v.placa,
  color:v.color,
  asientos: v.pasajeros,
  tipog: v.tipog,
  estado: v.estado,
  combustible: v.combustible ??"",

  modelo:v.modelos?.[0]?.modelo ??"",
  tipoe: v.modelos?.[0]?.tipoe ??"",
  //kilometraje: v.modelos && v.modelos.length > 0 ? v.modelos[0].kilometraje : "—",

  
  kilometrajeUI: v.modelos?.[0]?.kilometraje ?? 0,
  
 
  marca: v.modelos?.[0]?.marcas?.[0]?.marca ?? "",
  chasis: v.modelos?.[0]?.marcas?.[0]?.chasis ?? "",
  motor: v.modelos?.[0]?.marcas?.[0]?.motor ?? "",
  cilindrada: v.modelos?.[0]?.marcas?.[0]?.cilindrada ?? "",
});


const mapVehicleToApi = (v) => ({
  codigo: v.asignadoA,
  placa: v.placa,
  pasajeros: v.pasajeros,
  tipog: v.tipoGeneral,
  kilometraje: v.kilometraje,
  estado: v.estado,
  color: v.color,
  motor: v.motor,
  chasis: v.chasis,
  cilindrada: v.cilindrada,
  marca: v.marca,
  modelo: v.modelo,
  tipoe: v.tipoEspecifico,
});

export const useVehicleStore = create((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,
  page: 1,
  limit: 8,
  totalPages: 1,

fetchAllVehicles: async () => {
  try {
    const res = await getVehicles({
      page: 1,
      limit: 1000,
      estado: ""
    });

    const allVehicles = res.data.map(mapVehicleFromApi);

    set({
      vehicles: allVehicles
    });

    return allVehicles;

  } catch (err) {
    console.error(err);

    set({
      vehicles: []
    });

    return [];
  }
},
 fetchVehicles: async () => {
  set({ loading: true, error: null });

  try {
    const { page, limit, estadoFilter } = get();

    const data = await getVehicles({
      page,
      limit,
      estado: estadoFilter,
    });

    set({
      vehicles: data.data.map(mapVehicleFromApi),
      totalPages: data.totalPages,
      loading: false,
    });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},
setPage: (page) => {
    set({ page });
    get().fetchVehicles();
  },

  estadoFilter: "",
setEstadoFilter: (estado) => {
  set({ estadoFilter: estado, page: 1 });
  get().fetchVehicles();
},
  
  addVehicle: async (vehicleUI) => {
  try {
    await createVehicle(mapVehicleToApi(vehicleUI));

    await get().fetchVehicles(); 

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message || err };
  }
},


  editVehicle: async (id, vehicleUI) => {
    try {
      await updateVehicle(id, mapVehicleToApi(vehicleUI));
      await get().fetchVehicles();

      set({
        vehicles: get().vehicles.map((v) =>
          v.id === id ? { ...v, ...vehicleUI } : v
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  updateVehicleKm: async (
  id,
  kilometraje,
  km_ultimo_mantenimiento = null
) => {
  try {

    const data = {
      kilometraje,
    };

    // SOLO si viene mantenimiento
    if (km_ultimo_mantenimiento !== null) {
      data.km_ultimo_mantenimiento =
        km_ultimo_mantenimiento;
    }

    await updateVehicle(id, data);

    await get().fetchVehicles();

    return { ok: true };

  } catch (err) {
    return {
      ok: false,
      error: err.message || err,
    };
  }
},

registrarCambioAceite: async (id) => {
  try {

    await registrarCambioAceite(id);

    await get().fetchVehicles();

    return { ok: true };

  } catch (err) {

    return {
      ok: false,
      error: err.message || err,
    };

  }
},

  
  removeVehicle: async (id) => {
    try {
      await deleteVehicle(id);
      await get().fetchVehicles();
      set({
        vehicles: get().vehicles.filter((v) => v.id !== id),
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },
}));



