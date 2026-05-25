import api from "../helpers/axiosClient";

// RESUMEN VEHÍCULOS
export const getVehiclesResumen = async ({ estado }) => {
  try {
    const response = await api.get(
      "/vehiculos-combustible/resumen",
      {
        params: {
          estado,
        },
      }
    );

    return response.data;
  } catch (err) {
    throw (
      err.response?.data?.message ||
      "Error al obtener resumen de vehículos"
    );
  }
};