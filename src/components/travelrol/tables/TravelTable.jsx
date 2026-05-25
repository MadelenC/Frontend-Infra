import React, { useState, useEffect } from "react";
import { useRolTravelStore } from "../../../zustand/useRolTravelStore";
import TravelRow from "./TravelRow";
import Pagination from "./Pagination";
import SearchBar from "../search/SearchBar";
import AddDriverForm from "../form/AddDriverForm";
import PrintTravel from "../tables/TableTravelPrint";
import ListException from "../form/Excep/ListException";
import { FaPlus, FaPrint } from "react-icons/fa";
import { useExceptionsStore } from "../../../zustand/useExceptionsStore";
import {  PDFDownloadLink,} from "@react-pdf/renderer";

import RoleTravelPDF
from "../../../Pdf/TravelRol/TravelRolPDF";


export default function TravelTable() {
  const {
    rolTravels,
    fetchRolTravels,
    fetchAllRolTravels,
    removeRolTravel,
    loading,
    error,
    page,
    totalPages,
    setPage,
  } = useRolTravelStore();

  
  const { addException } = useExceptionsStore();
  const {addRolTravel} = useRolTravelStore();
  const [allTravels, setAllTravels] = useState([]);
  

  const [search, setSearch] = useState("");
  const [openPanel, setOpenPanel] = useState(false);
 
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [openExceptionsModal, setOpenExceptionsModal] = useState(false);



 useEffect(() => {

  fetchRolTravels();

  const loadAllTravels = async () => {

    const data = await fetchAllRolTravels();

    setAllTravels(data);

  };

  loadAllTravels();

}, []);
 

  
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
  const res = await addRolTravel(data);

  if (res.ok) {
    await fetchRolTravels();
    setOpenPanel(false);
  }

  return res;
};

  const handleAddException = async (data) => {
  const res = await addException(data);

  if (res.ok) {
    await fetchRolTravels();
  }

  return res;
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
      <PDFDownloadLink
          document={
            <RoleTravelPDF
              travels={allTravels}
            />
          }
          fileName="rol-viajes.pdf"
        >
          {({ loading }) => (

            <button
              className="
              flex items-center justify-center gap-2
              bg-red-600 hover:bg-red-700
              text-white
              px-5 py-3
              rounded-lg
              shadow
              "
            >
              <FaPrint size={18} />


            </button>

          )}
        </PDFDownloadLink>

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
                  
                  onViewExceptions={handleViewExceptions}
                  onDelete={handleDelete}
                  onAddException={handleAddException}
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
          choferesRegistrados={rolTravels}
          onSubmit={handleAddDriver}
          setOpenPanel={setOpenPanel}
        />
      )}

     

    </div>
  );
}