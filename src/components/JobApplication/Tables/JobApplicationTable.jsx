import { useState, useEffect } from "react";
import JobApplicationRow from "./JobApplicationRow";
import SearchBar from "../Search/SearchBar";
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";

import { useJobApplicationStore } from "../../../zustand/useJobApplicationStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useAccessoriesStore } from "../../../zustand/useAccessoriesStore";
import { useUserStore } from "../../../zustand/userStore";
import CreateJobApplicationForm from "../Form/CreateJobApplicationForm";
import EditJobApplicationForm from "../Form/EditJobAplicationForm";
import { useDebounce } from "../../../hooks/useDebounce";

export default function JobApplicationTable() {
  const {
    applications,
    fetchApplications,
    addApplication,
    editApplication,
    page,
    setPage,
    totalPages,
    search,
    chofer,
    vehiculoId,
    setSearch,
  setChofer,
  setVehiculoId,
  
  } = useJobApplicationStore();

  const { choferes = [], fetchAllChoferes } = useUserStore();
  const { vehicles = [], fetchAllVehicles } = useVehicleStore();
  const { accessories, fetchAccessories } = useAccessoriesStore();

 


  const [modalType, setModalType] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

const limit = 8;
  const currentData = applications;

 
 useEffect(() => {
  fetchAllChoferes();
  fetchAllVehicles();
}, []);


useEffect(() => {
  fetchApplications();
}, [page, search, chofer, vehiculoId]);

  
  const handleOpenCreate = async () => {
    setModalType("add");
    await Promise.all([
      fetchAllVehicles(),
      fetchAllChoferes(),
      fetchAccessories(),
    ]);
  };

  const handleEdit = async (app) => {
    setSelectedApplication(app);
    setModalType("edit");
    await Promise.all([
      fetchAllVehicles(),
      fetchAllChoferes(),
      fetchAccessories(),
    ]);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedApplication(null);
  };

  const handleSaveCreate = async (data) => {
    const res = await addApplication(data);
    if (res?.ok) fetchApplications({ page });
    return res;
  };

  const handleSaveEdit = async (data) => {
    const res = await editApplication(selectedApplication.id, data);
    if (res?.ok) {
      fetchApplications({ page });
      alert("Actualización exitosa");
    }
    return res;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">


      <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:justify-between mb-4">

       
        <div className="w-full md:flex-1">
         <SearchBar
            search={search}
            setSearch={setSearch}
            chofer={chofer}
            setChofer={setChofer}
            vehiculo={vehiculoId}
            setVehiculo={setVehiculoId}
            listaChoferes={choferes.map(c => ({
              value: `${c.nombres} ${c.apellidos}`,
              label: `${c.nombres} ${c.apellidos}`
            }))}
            listaVehiculos={vehicles}
          />
        </div>

        
        <div className="w-full md:w-auto flex md:items-stretch">
          <button
            onClick={handleOpenCreate}
            className="h-10 flex items-center gap-2 px-5 rounded-lg
            bg-blue-600 text-white font-medium shadow-sm
            hover:bg-blue-700 transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
            w-full md:w-auto justify-center"
          >
            <FiPlus size={18} />
            Agregar Solicitud
          </button>
        </div>
      </div>

   
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-sm bg-white dark:bg-gray-900">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              {["#", "Chofer", "Vehículo", "Accesorios", "Descripción", "Fecha", "Operación"].map((h) => (
                <th
                  key={h}
                  className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((a, i) => (
                <JobApplicationRow
                  key={a.id}
                  application={a}
                  index={(page - 1) * limit + i + 1}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {modalType === "add" && (
        <CreateJobApplicationForm
          isOpen
          onClose={handleCloseModal}
          onSave={handleSaveCreate}
          vehiculos={vehicles}
          accesorios={accessories}
        />
      )}

   
      {modalType === "edit" && selectedApplication && (
        <EditJobApplicationForm
          isOpen
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
          vehiculos={vehicles}
          accesorios={accessories}
          initialData={selectedApplication}
        />
      )}

    </div>
  );
}