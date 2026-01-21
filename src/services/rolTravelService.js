import api from "../helpers/axiosClient";

// Traer todos los viajes
export const getRolTravels = async () => {
  try {
    const response = await api.get("/rolTravel");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener los viajes";
  }
};

// Traer un viaje por ID
export const getRolTravelById = async (id) => {
  try {
    const response = await api.get(`/rolTravel/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el viaje";
  }
};

// Crear un nuevo viaje
export const createRolTravel = async (data) => {
  try {
    const response = await api.post("/rolTravel", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el viaje";
  }
};

// Actualizar un viaje existente
export const updateRolTravel = async (id, data) => {
  try {
    const response = await api.put(`/rolTravel/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el viaje";
  }
};

// Eliminar un viaje
export const deleteRolTravel = async (id) => {
  try {
    const response = await api.delete(`/rolTravel/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el viaje";
  }
};
