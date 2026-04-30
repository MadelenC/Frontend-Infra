import { useState, useEffect } from "react";
import SearchBar from "../search/SerachBar";
import TableDest from "./TableDestn";
import Pagination from "./Paginations";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";
import { FaPrint } from "react-icons/fa";

export default function DestTable() {
  const {
    destinos,
    totalPages,
    fetchDestinos,
    loading,
    error,
  } = useDestinoStore();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  const departments = [
    "Chuquisaca",
    "La_Paz",
    "Cochabamba",
    "Oruro",
    "Potosí",
    "Tarija",
    "Santa_Cruz",
    "Beni",
    "Pando",
  ];

  // 🔥 SOLO BACKEND
  useEffect(() => {
    fetchDestinos(page, limit, departmentFilter, search);
  }, [page, departmentFilter, search]);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400 animate-pulse">
        Cargando destinos...
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">

      {/* FILTROS */}
      <div className="flex justify-between gap-3 mb-4">

        <div className="flex gap-2">
          <SearchBar search={search} setSearch={setSearch} />

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 px-3 border rounded-md"
          >
            <option value="">Todos</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <button className="flex items-center gap-2 bg-orange-600 text-white px-4 rounded-md">
          <FaPrint />
          Imprimir
        </button>
      </div>

      {/* TABLA */}
      <TableDest data={destinos} />

      {/* SIN RESULTADOS */}
      {destinos.length === 0 && (
        <div className="text-center text-gray-500 mt-3">
          No hay resultados
        </div>
      )}

      {/* PAGINACIÓN */}
      {destinos.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}

    </div>
  );
}

