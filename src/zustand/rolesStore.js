import { create } from "zustand";

export const useRoleStore = create((set) => ({
  roles: ["administrador", "encargado", "chofer", "supervisor", "mecanico", "mensajero"],


  setRoles: (newRoles) => set({ roles: newRoles }),
}));
