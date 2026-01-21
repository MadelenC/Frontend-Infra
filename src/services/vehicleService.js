import api from "../helpers/axiosClient";

// Obtener todos los vehículos
export const getVehicles = async () => {
  try {
    const response = await api.get("/vehicle");
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

// Eliminar vehículo
export const deleteVehicle = async (id) => {
  try {
    const response = await api.delete(`/vehicle/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar vehículo";
  }
};

