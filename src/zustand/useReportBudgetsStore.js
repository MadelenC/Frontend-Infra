// stores/useBudgetsReportStore.js

import { create } from "zustand";

import {
getReportePresupuestos
} from "../services/reportBudgetsService";



export const useBudgetsReportStore = create((set) => ({

loading: false,


fetchReporte: async () => {


set({

  loading: true,

});

try {

 
  const data =
    await getReportePresupuestos();

  console.log(
    "DATA REPORTE =>",
    data
  );

  set({

    loading: false,

  });

 
  return Array.isArray(data)
    ? data
    : [];

} catch (error) {

  console.log(error);

  set({

    loading: false,

  });

  return [];

}


},

}));
