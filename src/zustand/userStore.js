import { create } from "zustand";
import {
  getUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser
} from "../services/userService";

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  page: 1,
  limit: 8,
  totalPages: 1,

  search: "",
  roleFilter: "",


  fetchUsers: async () => {
    set({ loading: true, error: null });

    try {
      const { page, limit, search, roleFilter } = get();

      const res = await getUsers({
        page,
        limit,
        search,
        role: roleFilter,
      });

      set({
        users: res.data,        
        totalPages: res.totalPages,
        loading: false,
      });

    } catch (err) {
      set({
        error: err.message || "Error al cargar usuarios",
        loading: false,
      });
    }
  },

  // ================= PAGINACIÓN =================
  setPage: (page) => {
    set({ page });
    get().fetchUsers(); // 🔥 CLAVE
  },

  setSearch: (term) => {
    set({ search: term, page: 1 });
    get().fetchUsers();
  },

  setRoleFilter: (role) => {
    set({ roleFilter: role, page: 1 });
    get().fetchUsers();
  },

  // ================= CRUD =================
  createUser: async (userData) => {
    try {
      const newUser = await apiCreateUser(userData);
      set({ users: [newUser, ...get().users] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  updateUser: async (id, updatedData) => {
    try {
      const updatedUser = await apiUpdateUser(id, updatedData);

      set({
        users: get().users.map(u =>
          u.id === id ? updatedUser : u
        ),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  deleteUser: async (id) => {
    try {
      await apiDeleteUser(id);

      set({
        users: get().users.filter(u => u.id !== id),
      });

      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // ================= HELPERS =================
  getDrivers: async () => {
  const allDrivers = [];
  let page = 1;
  let totalPages;

  // Mientras haya más páginas, solicita los choferes de todas las páginas
  do {
    const { limit, search, roleFilter } = get();

    // Solicita la página actual con la paginación
    const res = await getUsers({
      page,
      limit,
      search,
      role: roleFilter,
    });

    // Obtén solo los choferes de esta página y agrégalos al array
    allDrivers.push(...res.data.filter(u => u.tipo === "chofer"));

    // Actualiza la variable de totalPages desde la respuesta de la API
    totalPages = res.totalPages;

    // Incrementa la página para la siguiente solicitud
    page++;
  } while (page <= totalPages);

  return allDrivers;
}
}));






