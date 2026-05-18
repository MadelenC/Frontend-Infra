import { create }
from "zustand";

import {
  getReporteUsuarios
} from "../services/reporteUsuariosService";

export const useReporteUsuariosStore =
create((set) => ({

  usuarios: [],

  loading: false,

  fetchUsuarios:
  async (tipo) => {

    set({
      loading: true,
    });

    try {

      const res =
        await getReporteUsuarios(tipo);

      set({

        usuarios:
          res.data || [],

      });

      return res.data || [];

    } catch (error) {

      console.log(error);

      return [];

    } finally {

      set({
        loading: false,
      });

    }

  },

}));