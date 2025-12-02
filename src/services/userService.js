import api from "../helpers/axiosClient";

// Servicio para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await api.get("/users"); // endpoint real
    return response.data; // devuelve el array de usuarios
  } catch (error) {
    throw error.response?.data?.message || "Error al obtener usuarios";
  }
};

