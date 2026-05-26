import { useState, useEffect } from "react";
import JobApplicationRow from "./ApplicationRow";
import SearchBarApplication from "../Search/SearchBar"; 
import Pagination from "./Pagination";
import { FiPlus } from "react-icons/fi";
import CreateJobForm from "../Form/CreateJobForm"; 
import MaterialRequestForm from "../Form/MaterialRequestForm";
import { useJobApplicationStore } from "../../../zustand/useJobApplicationStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useAccessoriesStore } from "../../../zustand/useAccessoriesStore";
import { useUserStore } from "../../../zustand/userStore"; 
import { useMechanicsStore } from "../../../zustand/useMechanicsStore";
import { useMaterialOrderStore } from "../../../zustand/useMaterialOrderStore";
 

export default function ApplicationTable() {
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

  const { addMechanic } = useMechanicsStore();
  const { addRequest, fetchRequests } = useMaterialOrderStore();

  const { vehicles, fetchVehicles } = useVehicleStore();
  const { accessories, fetchAccessories } = useAccessoriesStore();
  const { users, fetchUsers } = useUserStore(); 

  const [modalType, setModalType] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [selectedJobApplication, setSelectedJobApplication] = useState(null);
  const [materialRequestOpen, setMaterialRequestOpen] = useState(false);
  const [selectedMaterialApplication, setSelectedMaterialApplication] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchApplications();
    fetchVehicles();
    fetchAccessories();
    fetchUsers();
  }, []);

useEffect(() => {
  fetchApplications();
}, [page, search, chofer, vehiculoId]);


  const handleOpenCreate = () => {
    setModalType("add");
  };

  const handleEdit = (app) => {
    setSelectedApplication(app);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedApplication(null);
  };

  const handleSaveCreate = async (data) => {
    const res = await addApplication(data);
    if (res?.ok) fetchApplications();
    return res;
  };

  const handleSaveEdit = async (data) => {
    const res = await editApplication(selectedApplication.id, data);
    if (res?.ok) {
      fetchApplications();
      alert("✅ Actualización exitosa");
    }
    return res;
  };

  const handleOpenJobForm = (application) => {
    setSelectedJobApplication(application);
    setJobFormOpen(true);
  };

  const handleCloseJobForm = () => {
    setJobFormOpen(false);
    setSelectedJobApplication(null);
  };

  const handleOpenMaterialRequestForm = (application) => {
    setSelectedMaterialApplication(application);
    setMaterialRequestOpen(true);
  };

  const handleCloseMaterialRequestForm = () => {
    setMaterialRequestOpen(false);
    setSelectedMaterialApplication(null);
  };

  const choferes = users?.filter(u => u.tipo && u.tipo.toLowerCase() === "chofer");

 
  const currentData = applications;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4 transition-all">

      
      <div className="flex justify-between items-center mb-4">

       <SearchBarApplication
          chofer={chofer}
          setChofer={setChofer}
          vehiculo={vehiculoId}
          setVehiculo={setVehiculoId}
          listaChoferes={(choferes || []).map(c => ({
            value: `${c.nombres} ${c.apellidos}`,
            label: `${c.nombres} ${c.apellidos}`
          }))}
          listaVehiculos={vehicles}
        />

    

      </div>

     
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full text-sm bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800">
            <tr>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">#</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">Chofer</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">Vehículo</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">Accesorios</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">Descripción</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">Fecha</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">Operación</th>
              <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">Trabajos</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length > 0 ? (
              currentData.map((a, i) => (
                <JobApplicationRow
                  key={a.id}
                  application={a}
                  index={i + 1}
                  onEdit={handleEdit}
                  onConcretar={handleOpenJobForm} 
                  onPedido={handleOpenMaterialRequestForm}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

 
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      
      {jobFormOpen && selectedJobApplication && (
        <CreateJobForm
          isOpen={jobFormOpen}
          onClose={handleCloseJobForm}
          application={selectedJobApplication}
          onSave={async (data) => {
            const res = await addMechanic(data);

            if (res.ok) {
              fetchApplications(); 
              setJobFormOpen(false);
            }

            return res;
          }}

          
        />
        
      )}

      {materialRequestOpen && selectedMaterialApplication && (
        <MaterialRequestForm
          isOpen={materialRequestOpen}
          onClose={handleCloseMaterialRequestForm}
           application={selectedMaterialApplication} 
          onSave={async (data) => {
            const res = await addRequest(data);

            if (res.ok) {
              fetchRequests();
              setMaterialRequestOpen(false);
            }

            return res;
          }}
        />
      )}

    </div>
  );
}