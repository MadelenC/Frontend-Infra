import api from "../helpers/axiosClient";

export const getRequests = async (
  page = 1,
  limit = 8,
  search = ""
) => {
  try {
    const response = await api.get("/peticiones", {
      params: {
        page,
        limit,
        search,
      },
    });

    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message ||
      "Error al obtener peticiones"
    );
  }
};;

// Traer una petición por ID
export const getRequestById = async (id) => {
  try {
    const response = await api.get(`/peticiones/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la petición";
  }
};

// Crear petición
export const createRequest = async (data) => {
  try {
    const response = await api.post("/peticiones", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la petición";
  }
};

// Actualizar petición
export const updateRequest = async (id, data) => {
  try {
    const response = await api.put(`/peticiones/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la petición";
  }
};

// Eliminar petición
export const deleteRequest = async (id) => {
  try {
    const response = await api.delete(`/peticiones/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la petición";
  }
};