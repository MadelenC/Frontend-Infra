import React, { useEffect, useState } from "react";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import Pagination from "./Pagination";
import SearchBar from "../search/SearchBar";
import VehicleRow from "./VehicleRow";
import AddVehicleForm from "../form/AddVehicleForm";
import EditVehicleForm from "../form/oper/EditVehicleForm";
import UpdateKmForm from "../form/oper/UpdateKmForm";
import VehicleDetail from "../form/oper/VehicleDetail";
import ProtectedView from "../../Protected/ProtectedView";

export default function TableVehicle() {
  const {
  vehicles,
  page,
  totalPages,
  setPage,
  fetchVehicles,
  loading,
  error,
  addVehicle,
  editVehicle,
  removeVehicle,
  updateVehicleKm,
} = useVehicleStore();
  

  const [search, setSearch] = useState("");
  const { setEstadoFilter, estadoFilter } = useVehicleStore();

  const [openAddPanel, setOpenAddPanel] = useState(false);
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [openUpdateKmPanel, setOpenUpdateKmPanel] = useState(false);
  const [openDetailPanel, setOpenDetailPanel] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDetailVehicle, setSelectedDetailVehicle] = useState(null);


  useEffect(() => {
    fetchVehicles();
  }, [page]);

  const filteredVehicles = vehicles.filter(
    (v) =>
      ((v.asignacion || "").toLowerCase().includes(search.toLowerCase()) ||
        (v.placa || "").toLowerCase().includes(search.toLowerCase())) &&
      (estadoFilter === "" || v.estado === estadoFilter)
  );

 
  
  

  const handleAddVehicle = async (vehicleData) => {
    const result = await addVehicle(vehicleData);
    if (result.ok) {
      alert("Vehículo registrado correctamente");
      setOpenAddPanel(false);
    } else {
      alert("Error al registrar vehículo: " + result.error);
    }
  };


  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-full rounded-xl bg-white dark:bg-gray-900 shadow-md p-4 pt-14">


<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">


  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-end">

    <div className="w-full sm:w-64">
      <SearchBar search={search} setSearch={setSearch} />
    </div>

    <select
      value={estadoFilter}
      onChange={(e) => setEstadoFilter(e.target.value)}
      className="h-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md px-3"
    >
      <option value="">Estado</option>
      <option value="optimo">optimo</option>
      <option value="mantenimiento">mantenimiento</option>
      <option value="desuso">desuso</option>
    </select>

  </div>

    <ProtectedView 
         rolesAllowed={["administrador","supervisor"]}>
        <button
          onClick={() => setOpenAddPanel(true)}
          className="h-10 flex items-center justify-center gap-2
            bg-gradient-to-r from-blue-600 to-blue-500
            hover:from-blue-700 hover:to-blue-600
            text-white px-5 rounded-lg shadow-lg font-medium
            transition-all duration-300
            hover:scale-105 active:scale-95"
        >
          + Agregar Vehículo
        </button>
      </ProtectedView>

    </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {loading && (
            <div className="text-center py-2 text-sm text-gray-500 dark:text-gray-400">
              Cargando vehículos...
            </div>
          )}

        <table className="w-full text-sm bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              {["#", "Asignación", "Placa", "Asientos", "Tipo", "Kilometraje", "Estado", "Operaciones"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((v) => (
                <VehicleRow
                  key={v.id}
                  vehicle={v}
                  onEdit={() => {
                    setSelectedVehicle(v);
                    setOpenEditPanel(true);
                  }}
                  onUpdateKm={() => {
                    setSelectedVehicle(v);
                    setOpenUpdateKmPanel(true);
                  }}
                  onView={() => {
                    setSelectedDetailVehicle(v);
                    setOpenDetailPanel(true);
                  }}
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

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      {/* MODALES */}
      {openAddPanel && (
        <AddVehicleForm
          onSubmit={handleAddVehicle}
          onClose={() => setOpenAddPanel(false)}
        />
      )}

      {openEditPanel && selectedVehicle && (
        <EditVehicleForm
          vehicleData={selectedVehicle}
          onClose={() => setOpenEditPanel(false)}
          onUpdate={async (vehicleUI) => {
            await editVehicle(vehicleUI.id, vehicleUI);
            setOpenEditPanel(false);
          }}
          onDelete={async (id) => {
            const confirmDelete = window.confirm("¿Seguro que deseas eliminar este vehículo?");
            if (!confirmDelete) return;

            const result = await removeVehicle(id);

            if (result.ok) {
              alert("Vehículo eliminado correctamente");
              setOpenEditPanel(false);
            } else {
              alert("Error al eliminar: " + result.error);
            }
          }}
        />
      )}

      {openUpdateKmPanel && selectedVehicle && (
        <UpdateKmForm
          vehicle={selectedVehicle}
          onClose={() => setOpenUpdateKmPanel(false)}
          onUpdateKm={async (updatedVehicle) => {
            return await updateVehicleKm(
              updatedVehicle.id,
              updatedVehicle.kilometraje
            );
          }}
        />
      )}

      {openDetailPanel && selectedDetailVehicle && (
        <VehicleDetail
          vehicle={selectedDetailVehicle}
          onClose={() => setOpenDetailPanel(false)}
        />
      )}

    </div>
  );
}













