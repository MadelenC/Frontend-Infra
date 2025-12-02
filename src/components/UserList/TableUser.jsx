import React, { useEffect, useState } from "react";
import { useUserStore } from "../../zustand/userStore";
import SearchBar from "./SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import UserFormPanel from "./UserFormPanel";

export default function TableUser() {
  const {
    users,
    loading,
    error,
    page,
    limit,
    totalPages,
    fetchUsers,
    setPage,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
  } = useUserStore();

  const [openPanel, setOpenPanel] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Cargando usuarios...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Error: {error}
      </div>
    );

  // Filtrado por búsqueda y rol
  const currentUsers = users
    .filter((u) => {
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

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all p-4">
      {/* Botón Agregar Usuario */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpenPanel(true)}
          className="flex items-center gap-2 border border-blue-500 text-blue-600 px-4 py-2 rounded-md 
                     hover:bg-blue-50 transition-all duration-200 font-medium"
        >
          <span className="text-lg font-bold">＋</span>
          <span>Agregar Usuario</span>
        </button>
      </div>

      {/* Buscador y filtro de roles */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      {/* Tabla de usuarios */}
      <UserTable users={currentUsers} />

      {/* Paginación */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Panel lateral de formulario */}
      <UserFormPanel open={openPanel} onClose={() => setOpenPanel(false)} />
    </div>
  );
}












