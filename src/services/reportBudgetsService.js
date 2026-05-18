

import api from "../helpers/axiosClient.js";



export const getReportePresupuestos = async () => {

const res = await api.get("/reporte");


return res.data.data || [];

};



export const getBudgetById = async (id) => {

const res = await api.get(`/reporte/${id}`);

return res.data.data || null;

};
