import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/userStore";
import SearchBar from "../search/SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import UserFormPanel from "../form/UserFormPanel";

export default function TableUser() {
  const {
    users,
    loading,
    error,
    page,
    totalPages,
    search,
    roleFilter,
    fetchUsers,
    setSearch,
    setRoleFilter,
    setPage,
    limit,
  } = useUserStore();

  const [openPanel, setOpenPanel] = useState(false);
  const [formType, setFormType] = useState(null);

  useEffect(() => {
    fetchUsers(page, search, roleFilter);
  }, [page, search, roleFilter]);

  const handleSearchChange = (term) => {
    setSearch(term);
  };

  const handleRoleChange = (role) => {
    setRoleFilter(role);
  };

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">

     
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        <SearchBar
          search={search}
          setSearch={handleSearchChange}
          roleFilter={roleFilter}
          setRoleFilter={handleRoleChange}
        />

       
        <button
          onClick={() => {
            setOpenPanel(true);
            setFormType(null);
          }}
          className="h-10 flex items-center justify-center gap-2 whitespace-nowrap min-w-max bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:bg-gray-600 dark:bg-none dark:hover:bg-gray-800 text-white px-8 rounded-lg shadow-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
>

          +Agregar Usuario
        </button>

      </div>

      
      {loading && (
        <div className="text-sm text-gray-500 px-2">
          Cargando...
        </div>
      )}

      <UserTable
        users={users}
        page={page}
        limit={limit}
      />

   
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      
      <UserFormPanel
        open={openPanel}
        onClose={() => {
          setOpenPanel(false);
          setFormType(null);
        }}
        formType={formType}
        setFormType={setFormType}
      />

    </div>
  );
}








