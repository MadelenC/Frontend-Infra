import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
      user: null,
      token: null,
      // Guardar usuario
      setUser: (user) => set({ user }),
      
      // Guardar token
      setToken: (token) => set({ token }),

      // Limpiar sesión
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // Nombre en localStorage
    }
  )
)
);

