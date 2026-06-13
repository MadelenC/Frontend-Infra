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
export const getCombustibleMensual = async (year) => {
  const response = await api.get(
    "/vehiculos-combustible/combustible-mensual",
    {
      params: { year },
    }
  );

  return response.data;
};