import api from "../helpers/axiosClient";

// Traer todos los usuarios
export const getUsers = async ({ page, limit, search, role }) => {
  try {
    const response = await api.get("/users", {
      params: {
        page,
        limit,
        search,
        role,
      },
    });

    return response.data;

  } catch (err) {
    throw err.response?.data?.message || "Error al obtener usuarios";
  }
};

// Crear usuario
export const createUser = async (userData) => {
  console.log(userData);
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al crear usuario";
  }
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al actualizar usuario";
  }
};

// Eliminar usuario
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.message || "Error al eliminar usuario";
  }
};

// Cambiar estado usuario
export const toggleUserStatus = async (id) => {
  try {
    const response = await api.patch(`/users/${id}/status`);

    return response.data;

  } catch (err) {
    throw err.response?.data?.message || "Error al cambiar estado";
  }
};