import { useState, useEffect } from "react";
import SearchBar from "../search/SerachBar";
import TableDest from "./TableDestn";
import Pagination from "./Paginations";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";
import { FaPrint ,FaPlus } from "react-icons/fa";
import { useDebounce } from "../../../hooks/useDebounce";
import DestinationForm from "../form/AddDestinationForm";
import ProtectedView from "../../Protected/ProtectedView";

export default function DestTable() {
  const {
    destinos,
    totalPages,
    fetchDestinos,
    addDestino,
    loading,
    error,
  } = useDestinoStore();

  const [searchInput, setSearchInput] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);

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

  const handleSaveDestino = async (data) => {
  const res = await addDestino(data);

  if (res.ok) {
    fetchDestinos(page, limit, departmentFilter, debouncedSearch);
  }

  return res;
};

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

        <div className="flex gap-2">
          <ProtectedView 
           rolesAllowed={["supervisor","administrador"]}>
          <button
            onClick={() => setOpenForm(true)}
            className="
              h-10 flex items-center justify-center gap-2
              whitespace-nowrap min-w-max
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-700 hover:to-blue-600
              text-white px-8 rounded-lg shadow-lg
              font-medium transition-all duration-300
              hover:scale-105 active:scale-95
            ">
            <FaPlus />
            Agregar
          </button>
          </ProtectedView>

          <button
            className="
              h-10 flex items-center justify-center gap-2
              whitespace-nowrap min-w-max
              bg-gradient-to-r from-orange-600 to-orange-500
              hover:from-orange-700 hover:to-orange-600
              text-white px-8 rounded-lg shadow-lg
              font-medium transition-all duration-300
              hover:scale-105 active:scale-95
            "
          >
            <FaPrint />
            Imprimir
          </button>

        </div>
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

      <DestinationForm
      isOpen={openForm}
      onClose={() => setOpenForm(false)}
      onSave={handleSaveDestino}
    />
    </div>
  );
}