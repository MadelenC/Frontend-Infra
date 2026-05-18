import api from "../helpers/axiosClient.js";

export const getReporteUsuarios =
async (tipo) => {

  const res = await axios.get(
    `/reporte-usuarios?tipo=${tipo}`
  );

  return res.data;

};