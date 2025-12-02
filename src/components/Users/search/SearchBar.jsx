import React, { useRef, useEffect, useState } from "react";
import { useRoleStore } from "../../../zustand/rolesStore";
import { SlArrowDown } from "react-icons/sl";

export default function SearchBar({ search, setSearch, roleFilter, setRoleFilter }) {
  const { roles } = useRoleStore(); // Trae los roles desde el store
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-start mb-4 gap-2 items-center">
      
   
      <div className="relative w-full md:w-1/6" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        >
          {roleFilter
            ? roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)
            : "Buscar por roles"}
        </button>

        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {/* Opción Todos */}
            <li
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${roleFilter === "" ? "bg-blue-100" : ""}`}
              onClick={() => {
                setRoleFilter("");
                setDropdownOpen(false);
              }}
            >
              Todos
            </li>

            {/* Lista de roles */}
            {roles.map((role) => (
              <li
                key={role}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${roleFilter === role ? "bg-blue-100" : ""}`}
                onClick={() => {
                  setRoleFilter(role);
                  setDropdownOpen(false);
                }}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input de busqueda*/}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido, cédula o celular..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />
    </div>
  );
}
