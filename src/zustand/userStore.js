import { create } from "zustand";
import {
  getUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser
} from "../services/userService";

export const useUserStore = create((set, get) => ({
  
  users: [],
  drivers: [],
reportUsers: [],
  loading: false,
  loadingDrivers: false,
  loadingReport: false,
  error: null,

  page: 1,
  limit: 8,
  totalPages: 1,

  search: "",
  roleFilter: "",


  



   fetchAllChoferes: async () => {
    try {
      const res = await getUsers({
        page: 1,
        limit: 1000,
        search: "",
        role: "chofer",
      });

      set({
        choferes: res.data,
      });

      return res.data;

    } catch (err) {
      console.error(err);

      set({
        choferes: [],
      });

      return [];
    }
  },
  fetchAllEncargados: async () => {
    try {
      const res = await getUsers({
        page: 1,
        limit: 1000,
        search: "",
        role: "encargado",
      });

      set({
        encargados: res.data,
      });

      return res.data;

    } catch (err) {
      console.error(err);

      set({
        encargados: [],
      });

      return [];
    }
  },

    fetchUsers: async (page, search, role) => {
    set({ loading: true, error: null });

    try {
      const res = await getUsers({
        page,
        limit: get().limit,
        search,
        role,
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

  fetchUsersReport: async (tipo = "todos") => {

  set({
    loadingReport: true,
  });

  try {

    const res = await getUsers({

      page: 1,
      limit: 10000,
      search: "",

      role:
        tipo === "todos"
          ? ""
          : tipo,

    });

    set({

      reportUsers:
        res.data || [],

      loadingReport: false,

    });

    return res.data || [];

  } catch (error) {

    console.error(error);

    set({

      reportUsers: [],
      loadingReport: false,

    });

    return [];

  }

},

  
  setPage: (page) => set({ page }),

  setSearch: (term) => set({ search: term, page: 1 }),

  setRoleFilter: (role) => set({ roleFilter: role, page: 1 }),


  
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


  fetchDrivers: async () => {
    set({ loadingDrivers: true });

    try {
      let allDrivers = [];
      let page = 1;
      let totalPages = 1;

      do {
        const { limit } = get();

        const res = await getUsers({
          page,
          limit,
          search: "",
          role: "chofer", 
        });

        allDrivers = [...allDrivers, ...res.data];

        totalPages = res.totalPages;
        page++;

      } while (page <= totalPages);

      set({
        drivers: allDrivers,
        loadingDrivers: false
      });

    } catch (err) {
      set({
        loadingDrivers: false,
        error: err.message || "Error cargando choferes",
      });
    }
  },

  
  getDrivers: () => {
    return get().drivers || [];
  },

}));





