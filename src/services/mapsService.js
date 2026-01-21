import api from "../helpers/axiosClient";

// Traer todos los mapas
export const getMaps = async () => {
  try {
    const response = await api.get("/mapas");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener los mapas";
  }
};

// Traer un mapa por ID
export const getMapById = async (id) => {
  try {
    const response = await api.get(`/mapas/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el mapa";
  }
};

// Crear un mapa
export const createMap = async (data) => {
  try {
    const response = await api.post("/mapas", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el mapa";
  }
};

// Actualizar un mapa
export const updateMap = async (id, data) => {
  try {
    const response = await api.put(`/mapas/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el mapa";
  }
};

// Eliminar un mapa
export const deleteMap = async (id) => {
  try {
    const response = await api.delete(`/mapas/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el mapa";
  }
};
