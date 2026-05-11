import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useAuthStore = create(
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
       // 🔥 NUEVO: actualizar solo campos del usuario
        updateUser: (data) =>
          set({
            user: {
              ...get().user,
              ...data,
            },
          }),

        logout: () => set({ user: null, token: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

