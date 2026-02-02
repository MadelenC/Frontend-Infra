import { create } from "zustand";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

export const useUserStore = create((set, get) => ({
  users: [],
  loading: true,
  error: null,
  page: 1,
  limit: 8,
  totalPages: 1,
  search: "",
  roleFilter: "",

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getUsers();
      set({ 
        users: data || [], 
        totalPages: Math.ceil((data?.length || 0) / get().limit),
        loading: false
      });
    } catch (err) {
      set({ error: err.message || "Error al cargar usuarios", loading: false });
    }
  },

  createUser: async (userData) => {
    try {
      const newUser = await createUser(userData);
      set({ users: [...get().users, newUser] });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  updateUser: async (id, updatedData) => {
    try {
      const updatedUser = await updateUser(id, updatedData);
      set({
        users: get().users.map(u => u.id === id ? updatedUser : u)
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  deleteUser: async (id) => {
    try {
      await deleteUser(id);
      set({
        users: get().users.filter(u => u.id !== id)
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || err };
    }
  },

  setPage: (page) => set({ page }),
  setSearch: (term) => set({ search: term || "", page: 1 }),
  setRoleFilter: (role) => set({ roleFilter: role || "", page: 1 }),

  get currentUsers() {
    const { users, page, limit, search, roleFilter } = get();
    const filtered = users
      .filter(u => {
        const term = (search || "").toLowerCase();
        const matchesSearch =
          String(u.nombres || "").toLowerCase().includes(term) ||
          String(u.apellidos || "").toLowerCase().includes(term) ||
          String(u.cedula || "").toLowerCase().includes(term) ||
          String(u.celular || "").toLowerCase().includes(term);
        const matchesRole = roleFilter ? u.tipo === roleFilter : true;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => a.id - b.id);
    return filtered.slice((page - 1) * limit, page * limit);
  },

    //SELECT: SOLO CHOFERES (para selects / formularios)
  getDrivers: () => {
    return get().users.filter(u => u.tipo === "chofer");
  },

}));






