import React, { useRef, useEffect, useState } from "react";
import { useRoleStore } from "../../../zustand/rolesStore";
import { SlArrowDown } from "react-icons/sl";

export default function SearchBar({ search, setSearch, roleFilter, setRoleFilter }) {
  const { roles } = useRoleStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <div className="flex flex-col md:flex-row gap-3 mb-4">

      {/* FILTRO POR ROL */}
      <div className="relative w-full md:w-1/3 lg:w-1/5" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-10 w-full px-4 text-sm rounded-md border shadow-sm flex items-center justify-between transition
          bg-white border-gray-300 text-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

          dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
          dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <span>
            {roleFilter
              ? roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)
              : "Buscar por roles"}
          </span>
          <SlArrowDown className="text-xs opacity-70" />
        </button>

        {dropdownOpen && (
          <ul
            className="absolute z-20 mt-1 w-full rounded-md shadow-lg max-h-60 overflow-auto text-sm
            bg-white border border-gray-300
            dark:bg-gray-800 dark:border-gray-600"
          >
            <li
              className={`px-4 py-2 cursor-pointer transition
              hover:bg-blue-100 dark:hover:bg-gray-700
              ${roleFilter === "" ? "bg-blue-100 dark:bg-gray-700" : ""}`}
              onClick={() => {
                setRoleFilter("");
                setDropdownOpen(false);
              }}
            >
              Todos
            </li>

            {roles.map((role) => (
              <li
                key={role}
                className={`px-4 py-2 cursor-pointer transition
                hover:bg-blue-100 dark:hover:bg-gray-700
                ${roleFilter === role ? "bg-blue-100 dark:bg-gray-700" : ""}`}
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

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Buscar por nombre, apellido, cédula o celular..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-10 w-70 px-4 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}
