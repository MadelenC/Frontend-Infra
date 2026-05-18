import { create } from "zustand";

import {
  getHojaRuta
} from "../services/hojaRutaService";

export const useHojaRutaStore =
  create((set) => ({

    hojaRuta: null,

    loading: false,

    fetchHojaRuta: async (id) => {

      set({ loading: true });

      try {

        const res =
          await getHojaRuta(id);

        set({
          hojaRuta:
            res.data?.data || null,
        });

      } catch (error) {

        console.log(error);

      }

      set({ loading: false });

    },

}));