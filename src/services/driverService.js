import api from "../helpers/axiosClient";

export const getDrivers = async () => {
  try {
    const response = await api.get("/users?rol=CHOFER");
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener choferes";
  }
};
