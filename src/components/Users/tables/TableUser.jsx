import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../zustand/userStore";
import SearchBar from "../search/SearchBar";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import UserFormPanel from "../form/UserFormPanel";

export default function TableUser() {
  const {
    users = [],
    loading,
    error,
    page,
    totalPages,
    fetchUsers,
    setPage,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
  } = useUserStore();

  const [openPanel, setOpenPanel] = useState(false);
  const [formType, setFormType] = useState(null);

 
  useEffect(() => {
    fetchUsers();
  }, []);


  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400 animate-pulse">
        Cargando usuarios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md transition-all p-4">

     
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

        
        <div className="w-full md:flex-1 min-w-0">
          <SearchBar
            search={search}
            setSearch={setSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
        </div>

       
        <div className="w-full md:w-auto flex justify-end">
          <button
            onClick={() => {
              setOpenPanel(true);
              setFormType(null);
            }}
            className="w-full md:w-auto flex items-center justify-center gap-3
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-3 rounded-lg shadow-lg font-medium
              transition-all duration-300"
          >
            <span className="text-lg font-bold">＋</span>
            Agregar Usuario
          </button>
        </div>

      </div>

      
      <UserTable users={users} />

      
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






















