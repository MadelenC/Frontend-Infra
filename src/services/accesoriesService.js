import api from "../helpers/axiosClient";
export const getAccessories = async (solicitudId = null) => {
  try {
    const url = solicitudId
      ? `/accesorios?solicitud_id=${solicitudId}`
      : "/accesorios";

    const response = await api.get(url);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener accesorios";
  }
};


export const getAccessoryById = async (id) => {
  try {
    const response = await api.get(`/accesorios/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener el accesorio";
  }
};


export const createAccessory = async (data) => {
  try {
    const response = await api.post("/accesorios", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el accesorio";
  }
};


export const updateAccessory = async (id, data) => {
  try {
    const response = await api.put(`/accesorios/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el accesorio";
  }
};


export const deleteAccessory = async (id) => {
  try {
    const response = await api.delete(`/accesorios/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el accesorio";
  }
};