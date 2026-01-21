import api from "../helpers/axiosClient";

// Traer todos los destinos
export const getDestinos = async () => {
  try {
    const response = await api.get("/destino");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener los destinos";
  }
};

// Traer un destino por ID
export const getDestinoById = async (id) => {
  try {
    const response = await api.get(`/destino/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el destino";
  }
};

// Crear un destino
export const createDestino = async (data) => {
  try {
    const response = await api.post("/destino", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el destino";
  }
};

// Actualizar un destino
export const updateDestino = async (id, data) => {
  try {
    const response = await api.put(`/destino/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el destino";
  }
};

// Eliminar un destino
export const deleteDestino = async (id) => {
  try {
    const response = await api.delete(`/destino/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el destino";
  }
};
