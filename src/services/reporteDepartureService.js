import api from "../helpers/axiosClient.js";

export const getReporteDepartureById = async (id) => {
  try {
    const res = await api.get(`/salidas/${id}`);

  
    if (!res || !res.data) {
      throw new Error("Respuesta vacía del servidor");
    }

  
    return res.data.data ?? res.data;

  } catch (error) {
    console.error("Error al obtener la boleta de salida:", error);
    throw error;
  }
};