import api from "../helpers/axiosClient";

// Obtener todos los vehículos
export const getVehicles = async ({ page, limit, estado }) => {
  try {
    const response = await api.get("/vehicle", {
      params: {
        page,
        limit,
        estado, 
      },
    });

    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al obtener vehículos";
  }
};

// Crear vehículo
export const createVehicle = async (data) => {
  try {
    const response = await api.post("/vehicle", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear vehículo";
  }
};

// Actualizar vehículo
export const updateVehicle = async (id, data) => {
  try {
    const response = await api.put(`/vehicle/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar vehículo";
  }
};

export const registrarCambioAceite = async (id) => {
  try {

    const response = await api.put(
      `/vehicle/${id}/cambio-aceite`
    );

    return response.data;

  } catch (err) {

    throw (
      err.response?.data?.message ||
      "Error al registrar cambio de aceite"
    );

  }
};

// Eliminar vehículo
export const deleteVehicle = async (id) => {
  try {
    const response = await api.delete(`/vehicle/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar vehículo";
  }
};

