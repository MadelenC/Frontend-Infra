// src/components/travel/TableTravel.js
import React, { useState, useEffect, useRef } from "react";
import { useRolTravelStore } from "../../../zustand/useRolTravelStore";
import { useUserStore } from "../../../zustand/userStore";
import { useReactToPrint } from "react-to-print";
import TravelRow from "./TravelRow";
import Pagination from "./Pagination";
import SearchBar from "../search/SearchBar";
import AddDriverForm from "../form/AddDriverForm";
import PrintTravel from "../tables/TableTravelPrint";
import { FaPlus, FaPrint } from "react-icons/fa";

export default function TableTravel() {
  const { rolTravels = [], loading, error, fetchRolTravels } = useRolTravelStore();
  const { fetchUsers, getDrivers, loading: loadingUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [openPanel, setOpenPanel] = useState(false);

  const drivers = getDrivers();

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
  const currentTravels = filteredTravels.slice((page - 1) * limit, page * limit);

  // Ref para react-to-print
  const printRef = useRef();

  // Función imprimir
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Rol_de_Viajes",
    onAfterPrint: () => console.log("Impresión finalizada"),
  });

  useEffect(() => {
    fetchRolTravels();
    fetchUsers();
  }, [fetchRolTravels, fetchUsers]);

  if (loading) return <div className="p-6 text-center">Cargando viajes...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md p-4">
      {/* Botones */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setOpenPanel(true)}
          className="border border-blue-500 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 flex items-center gap-2"
        >
          <FaPlus size={14} /> Agregar Chofer
        </button>

        <button
          onClick={handlePrint}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center gap-2"
        >
          <FaPrint size={14} /> Imprimir
        </button>
      </div>

      {/* Buscador */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Tabla normal */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              {["ID", "Chofer", "TipoA", "TipoB", "TipoC", "Cantidad", "Excepciones", "Fecha", "Operaciones"].map(
                (head) => (
                  <th key={head} className="px-4 py-3 text-left font-medium text-gray-700">{head}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentTravels.length > 0 ? (
              currentTravels.map((travel) => <TravelRow key={travel.id} entitie={travel} />)
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">No hay registros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* Modal */}
      {openPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpenPanel(false)} />
          <div className="relative z-10 w-[420px] animate-fadeIn">
            {loadingUsers ? (
              <div className="p-4 text-center">Cargando choferes...</div>
            ) : (
              <AddDriverForm
                choferes={drivers}
                onSubmit={(data) => { console.log("Registrar chofer:", data); setOpenPanel(false); }}
                onClose={() => setOpenPanel(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* Componente para imprimir, siempre en el DOM */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <PrintTravel ref={printRef} travels={filteredTravels} />
      </div>
    </div>
  );
}














