import api from "../helpers/axiosClient";


export const getExceptions = async () => {
  try {
    const response = await api.get("/excepciones");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener las excepciones";
  }
};


export const getExceptionById = async (id) => {
  try {
    const response = await api.get(`/excepciones/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la excepción";
  }
};


export const createException = async (data) => {
  try {
    const response = await api.post("/excepciones", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la excepción";
  }
};


export const updateException = async (id, data) => {
  try {
    const response = await api.put(`/excepciones/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la excepción";
  }
};


export const deleteException = async (id) => {
  try {
    const response = await api.delete(`/excepciones/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la excepción";
  }
};