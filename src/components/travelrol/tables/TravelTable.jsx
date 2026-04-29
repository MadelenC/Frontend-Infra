import React, { useState, useEffect } from "react";
import { useRolTravelStore } from "../../../zustand/useRolTravelStore";
import { useUserStore } from "../../../zustand/userStore";
import TravelRow from "./TravelRow";
import Pagination from "./Pagination";
import SearchBar from "../search/SearchBar";
import AddDriverForm from "../form/AddDriverForm";
import PrintTravel from "../tables/TableTravelPrint";
import ListException from "../form/Excep/ListException";
import { FaPlus, FaPrint } from "react-icons/fa";

export default function TravelTable() {
  const { rolTravels = [], fetchRolTravels, removeRolTravel, loading, error } =
    useRolTravelStore();
  const { fetchUsers, getDrivers, loading: loadingUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [openPanel, setOpenPanel] = useState(false);
  const [drivers, setDrivers] = useState([]);  
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [openExceptionsModal, setOpenExceptionsModal] = useState(false);

  // Obtener los choferes cuando se monta el componente
  useEffect(() => {
    const fetchAndSetDrivers = async () => {
      try {
        const driversData = await getDrivers();  
        setDrivers(driversData);  
      } catch (error) {
        console.error("Error al obtener los choferes:", error);
      }
    };

    fetchAndSetDrivers();
    fetchRolTravels();  
    fetchUsers();  
  }, [getDrivers, fetchRolTravels, fetchUsers]);

  // Filtrar los choferes que no están ya registrados en los viajes
  const availableDrivers = drivers.filter((driver) => {
    return !rolTravels.some((travel) => travel.chofer_id === driver.id);
  });

  const filteredTravels = rolTravels.filter((v) => {
    const term = search.toLowerCase();
    return (
      v?.chofer?.toLowerCase().includes(term) ||
      v?.tipoA?.toLowerCase().includes(term) ||
      v?.tipoB?.toLowerCase().includes(term) ||
      v?.tipoC?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredTravels.length / limit);
  const currentTravels = filteredTravels.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleViewExceptions = (travel) => {
    setSelectedTravel(travel);
    setOpenExceptionsModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Desea eliminar este viaje?")) {
      await removeRolTravel(id);
    }
  };

  const handleAddDriver = async (data) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/rolTravel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { ok: false, error: errorData.error };
      }

      const result = await response.json();

      fetchRolTravels();
      setOpenPanel(false);

      return { ok: true, data: result };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  if (loading || loadingUsers)
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        Cargando datos...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md p-4">
      <div className="print:hidden">
        {/* Botones */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">

          {/* Buscador */}
          <div className="w-full md:w-auto">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:justify-end w-full md:w-auto">
            <button
              onClick={() => setOpenPanel(true)}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium"
            >
              <FaPlus size={14} /> Agregar Chofer
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium"
            >
              <FaPrint size={20} />
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white dark:bg-gray-900">
            <thead className="bg-blue-50 dark:bg-gray-800">
              <tr>
                {["ID", "Chofer", "TipoA", "TipoB", "TipoC", "Cantidad", "Excepciones", "Fecha", "Operaciones"].map((head) => (
                  <th key={head} className="px-4 py-3 border-white-200 text-left font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTravels.length > 0 ? (
                currentTravels.map((travel) => (
                  <TravelRow
                    key={travel.id}
                    entitie={travel}
                    drivers={drivers}
                    onViewExceptions={handleViewExceptions}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No hay registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />

        {/* Modal Excepciones */}
        {openExceptionsModal && selectedTravel && (
          <ListException
            entitie={selectedTravel}
            exceptions={selectedTravel.exceptions || []}
            onClose={() => setOpenExceptionsModal(false)}
          />
        )}

        {/* Modal Agregar Chofer */}
        {openPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenPanel(false)}
            />

            <div className="relative z-10 w-[420px] animate-fadeIn">
              <AddDriverForm
                choferes={availableDrivers}
                choferesRegistrados={rolTravels.map((travel) => travel.chofer_id)}
                onSubmit={handleAddDriver}
                setOpenPanel={setOpenPanel}
              />
            </div>
          </div>
        )}
      </div>

      {/* Print Modal */}
      <div className="print:block hidden">
        <PrintTravel />
      </div>
    </div>
  );
}