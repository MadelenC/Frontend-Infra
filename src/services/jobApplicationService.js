import api from "../helpers/axiosClient";

 
export const getApplications = async ({
  page = 1,
  limit = 8,
  search = "",
  chofer = "",
  vehiculoId = "",
} = {}) => {
  try {
    const response = await api.get("/solicitudes", {
      params: { page, limit,search,
        chofer,
        vehiculoId, },
    });

    return response.data;
    // esperado backend:
    // { data, total, totalPages }
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener las solicitudes";
  }
};


export const getApplicationById = async (id) => {
  try {
    const response = await api.get(`/solicitudes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener la solicitud";
  }
};


export const createApplication = async (data) => {
  try {
    const response = await api.post("/solicitudes", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear la solicitud";
  }
};


export const updateApplication = async (id, data) => {
  try {
    const response = await api.put(`/solicitudes/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar la solicitud";
  }
};


export const deleteApplication = async (id) => {
  try {
    const response = await api.delete(`/solicitudes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar la solicitud";
  }
};