import api from "../helpers/axiosClient";

// Obtener todos los viajes (FULL)
export const getTrips = async ({ page, limit }) => {
  try {
    const response = await api.get("/viajes", {
      params: { page, limit },
    });

    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al obtener los viajes";
  }
};


// Obtener viaje por ID (FULL)
export const getTripById = async (id) => {
  try {
    const response = await api.get(`/viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al obtener el viaje";
  }
};

// Crear viaje completo (FULL)
export const createTrip = async (data) => {
  try {
    const response = await api.post("/viajes", data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al crear el viaje";
  }
};


export const updateTrip = async (id, data) => {
  try {
    const response = await api.put(`/viajes/${id}`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al actualizar el viaje";
  }
};


export const deleteTrip = async (id) => {
  try {
    const response = await api.delete(`/viajes/${id}`);
    return response.data;
  } catch (err) {
    throw err.response?.data?.error || "Error al eliminar el viaje";
  }
};


export const cancelTrip = async (id) => {

  const res = await fetch(
    `http://localhost:3000/api/viajes/${id}/cancelar`,
    {
      method: "PATCH",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getAllTrips = async () => {

  try {

    const response = await api.get("/viajes/all");

    return response.data;

  } catch (err) {

    throw err.response?.data?.error ||
      "Error al obtener todos los viajes";

  }

};