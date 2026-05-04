import React, { useRef, useEffect, useState } from "react";
import { useRoleStore } from "../../../zustand/rolesStore";
import { SlArrowDown } from "react-icons/sl";

export default function SearchBar({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
}) {
  const { roles } = useRoleStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(search || "");

  const dropdownRef = useRef(null);

  // =========================
  // CERRAR DROPDOWN
  // =========================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // =========================
  // SINCRONIZAR SEARCH GLOBAL
  // =========================
  useEffect(() => {
    setLocalSearch(search || "");
  }, [search]);

  // =========================
  // DEBOUNCE SEARCH
  // =========================
  useEffect(() => {
    const delayDebounce = setTimeout(() => {

      if (localSearch.trim() !== search.trim()) {
        setSearch(localSearch);
      }

    }, 800);

    return () => clearTimeout(delayDebounce);

  }, [localSearch]);

  return (
    <div className="flex gap-3 w-full">

      {/* =========================
          FILTRO ROLES
      ========================= */}
      <div
        className="relative w-full md:w-1/3 lg:w-1/5"
        ref={dropdownRef}
      >
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-10 w-full px-4 text-sm rounded-md border shadow-sm flex items-center justify-between bg-white border-gray-300 dark:bg-gray-200/40 dark:border-gray-200"
        >
          <span>
            {roleFilter
              ? roleFilter.charAt(0).toUpperCase() +
                roleFilter.slice(1)
              : "Buscar por roles"}
          </span>

          <SlArrowDown />
        </button>

        {dropdownOpen && (
          <ul className="absolute z-20 mt-1 w-full bg-white border rounded-md">

            <li
              onClick={() => {
                setRoleFilter("");
                setDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Todos
            </li>

            {roles.map((role) => (
              <li
                key={role}
                onClick={() => {
                  setRoleFilter(role);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {role}
              </li>
            ))}

          </ul>
        )}
      </div>

      {/* =========================
          INPUT SEARCH
      ========================= */}
      <input
        type="text"
        placeholder="Buscar..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="h-10 w-70 px-4 text-sm rounded-md border shadow-sm"
      />

    </div>
  );
}