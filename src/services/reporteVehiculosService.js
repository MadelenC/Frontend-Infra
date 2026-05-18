import api from "../helpers/axiosClient.js";


export const getReporteVehiculos = async () => {
  const res = await api.get("/reporte-vehiculos");
  return res;
};