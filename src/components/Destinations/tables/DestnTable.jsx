import { useState, useEffect } from "react";
import SearchBar from "../search/SerachBar";
import TableDest from "./TableDestn";
import Pagination from "./Paginations";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";
import { FaPrint } from "react-icons/fa";
import { useDebounce } from "../../../hooks/useDebounce";

export default function DestTable() {
  const {
    destinos,
    totalPages,
    fetchDestinos,
    loading,
    error,
  } = useDestinoStore();

  const [searchInput, setSearchInput] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput, 500);
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


  useEffect(() => {
    fetchDestinos(page, limit, departmentFilter, debouncedSearch);
  }, [page, departmentFilter, debouncedSearch]);


  useEffect(() => {
    setPage(1);
  }, [departmentFilter]);

    {loading && (
  <div className="absolute inset-0 bg-white/40 dark:bg-black/30 backdrop-blur-sm flex items-center justify-center z-10">
    <div className="text-sm text-gray-500 animate-pulse">
      Buscando destinos...
    </div>
  </div>
)}

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 relative">

      <div className="flex justify-between gap-3 mb-4">

        <div className="flex gap-2">
          <SearchBar search={searchInput} setSearch={setSearchInput} />

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 px-3 border rounded dark:bg-gray-500/40 dark:border-gray-200"
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

      
      <TableDest data={destinos} />

      {!loading && destinos.length === 0 && (
        <div className="text-center text-gray-500 mt-3">
          No hay resultados
        </div>
      )}

   
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