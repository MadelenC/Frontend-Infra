import api from "../helpers/axiosClient.js";

export const getHojaRuta = async (id) => {

  const res = await api.get(
    `/hoja-ruta/${id}`
  );

  return res;
};