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
  const {
    rolTravels,
    fetchRolTravels,
    removeRolTravel,
    loading,
    error,
    page,
    totalPages,
    setPage,
  } = useRolTravelStore();

  const { fetchUsers, getDrivers } = useUserStore();

  const [search, setSearch] = useState("");
  const [openPanel, setOpenPanel] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [openExceptionsModal, setOpenExceptionsModal] = useState(false);


  useEffect(() => {
    fetchRolTravels();
    fetchUsers();
  }, []);

  
  useEffect(() => {
    const loadDrivers = async () => {
      const data = await getDrivers();
      setDrivers(Array.isArray(data) ? data : []);
    };

    loadDrivers();
  }, [getDrivers]);

 
  const availableDrivers = drivers.filter(
    (driver) =>
      !rolTravels.some((travel) => travel.chofer_id === driver.id)
  );

  
  const filteredTravels = rolTravels.filter((v) => {
    const term = search.toLowerCase();
    return (
      v?.chofer?.toLowerCase().includes(term) ||
      v?.tipoA?.toLowerCase().includes(term) ||
      v?.tipoB?.toLowerCase().includes(term) ||
      v?.tipoC?.toLowerCase().includes(term)
    );
  });

  
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

      const result = await response.json();

      fetchRolTravels();
      setOpenPanel(false);

      return { ok: true, data: result };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

 
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md p-4">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">

        <div className="w-full md:w-auto">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:justify-end w-full md:w-auto">

          <button
            onClick={() => setOpenPanel(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow"
          >
            <FaPlus size={14} /> Agregar Chofer
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg shadow"
          >
            <FaPrint size={18} />
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white dark:bg-gray-900">

          <thead className="bg-blue-50 dark:bg-gray-800">
            <tr>
              {[
                "ID",
                "Chofer",
                "TipoA",
                "TipoB",
                "TipoC",
                "Cantidad",
                "Excepciones",
                "Fecha",
                "Operaciones",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTravels.length > 0 ? (
              filteredTravels.map((travel) => (
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
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {/* MODAL EXCEPCIONES */}
      {openExceptionsModal && selectedTravel && (
        <ListException
          entitie={selectedTravel}
          exceptions={selectedTravel.exceptions || []}
          onClose={() => setOpenExceptionsModal(false)}
        />
      )}

      {/* MODAL FORM */}
      {openPanel && (
        <AddDriverForm
          choferes={availableDrivers}
          choferesRegistrados={rolTravels.map(t => t.chofer_id)}
          onSubmit={handleAddDriver}
          setOpenPanel={setOpenPanel}
        />
      )}

      {/* PRINT */}
      <div className="hidden print:block">
        <PrintTravel travels={rolTravels} />
      </div>

    </div>
  );
}