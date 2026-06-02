import api from "../helpers/axiosClient.js";


export const getMechanics = async ({
  page = 1,
  limit = 8,
  search = "",
}) => {

  try {

    const response = await api.get("/mecanicos", {
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
      "Error al obtener los mecánicos"
    );

  }
};

export const createMechanic = async (data) => {
  try {
    const response = await api.post("/mecanicos", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear el mecánico";
  }
};


export const updateMechanic = async (id, data) => {
  try {
    const response = await api.put(`/mecanicos/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar el mecánico";
  }
};


export const deleteMechanic = async (id) => {
  try {
    const response = await api.delete(`/mecanicos/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar el mecánico";
  }
};