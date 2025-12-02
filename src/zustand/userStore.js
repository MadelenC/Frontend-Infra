import { create } from "zustand";
import { getUsers } from "../services/userService";

export const useUserStore = create((set, get) => ({
  // Estado
  users: [],
  loading: true,
  error: null,
  page: 1,
  limit: 8,
  totalPages: 1,
  search: "",
  roleFilter: "",

  // Acciones
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getUsers();
      const sortedUsers = data.sort((a, b) => a.id - b.id);
      set({ 
        users: sortedUsers,
        totalPages: Math.ceil(sortedUsers.length / get().limit)
      });
    } catch (err) {
      set({ error: err.message || err });
    } finally {
      set({ loading: false });
    }
  },

  setPage: (page) => set({ page }),
  setSearch: (term) => set({ search: term, page: 1 }),
  setRoleFilter: (role) => set({ roleFilter: role, page: 1 }),

  // Getter: usuarios filtrados y paginados
  get currentUsers() {
    const { users, search, roleFilter, page, limit } = get();
    return users
      .filter(u => {
        const term = search.toLowerCase();
        const matchesSearch =
          String(u.nombres ?? "").toLowerCase().includes(term) ||
          String(u.apellidos ?? "").toLowerCase().includes(term) ||
          String(u.cedula ?? "").toLowerCase().includes(term) ||
          String(u.celular ?? "").toLowerCase().includes(term);
        const matchesRole = roleFilter ? u.tipo === roleFilter : true;
        return matchesSearch && matchesRole;
      })
      
      .slice((page - 1) * limit, page * limit);
      
  }
  
}));
