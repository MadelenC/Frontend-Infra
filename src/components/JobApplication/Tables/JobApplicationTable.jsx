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

export default function JobApplicationTable() {
  const {
    applications,
    fetchApplications,
    addApplication,
    editApplication,
  } = useJobApplicationStore();

  const { vehicles, fetchVehicles } = useVehicleStore();
  const { accessories, fetchAccessories } = useAccessoriesStore();
  console.log("accessories:", accessories);
  const { users, fetchUsers } = useUserStore();

  const [chofer, setChofer] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const limit = 8;

  useEffect(() => {
    fetchApplications();
    fetchVehicles();
    fetchAccessories();
    fetchUsers();
  }, []);

  useEffect(() => setPage(1), [search, chofer, vehiculo]);

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
      alert("Actualización exitosa");
    }
    return res;
  };

  const choferes =
    users?.filter(u => u.tipo && u.tipo.toLowerCase() === "chofer") || [];

  const filtered = applications.filter((a) => {
    const choferNombre = a.chofer
      ? `${a.chofer.nombres || ""} ${a.chofer.apellidos || ""}`.toLowerCase()
      : "";

    const matchChofer = chofer
      ? choferNombre.includes(chofer.toLowerCase())
      : true;

    const idVehiculo = a.vehiculo?.id ? String(a.vehiculo.id) : "";
    const tipoVehiculo = a.vehiculo?.tipog
      ? String(a.vehiculo.tipog).toLowerCase()
      : "";

    const matchVehiculo = vehiculo
      ? idVehiculo === vehiculo ||
        tipoVehiculo.includes(vehiculo.toLowerCase())
      : true;

    const searchLower = search.toLowerCase();

    const matchSearch = searchLower
      ? a.descripcion?.toLowerCase().includes(searchLower) ||
        choferNombre.includes(searchLower)
      : true;

    return matchChofer && matchVehiculo && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / limit);

  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
    <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:justify-between mb-4">

  {/* SearchBar */}
  <div className="w-full md:flex-1">
    <SearchBar
      chofer={chofer}
      setChofer={setChofer}
      vehiculo={vehiculo}
      setVehiculo={setVehiculo}
      listaChoferes={choferes.map((c) => ({
        value: `${c.nombres} ${c.apellidos}`,
        label: `${c.nombres} ${c.apellidos}`,
      }))}
      listaVehiculos={vehicles}
      search={search}
      setSearch={setSearch}
    />
  </div>

  {/* Button */}
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

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full text-sm bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              {[
                "#",
                "Chofer",
                "Vehículo",
                "Accesorios",
                "Descripción",
                "Fecha",
                "Operación",
              ].map((h) => (
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
                <td
                  colSpan={7}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {/* CREATE MODAL */}
      {modalType === "add" && (
        <CreateJobApplicationForm
          isOpen={modalType === "add"}
          onClose={() => setModalType(null)}
          onSave={handleSaveCreate}
          vehiculos={vehicles}
          accesorios={accessories}
        />
      )}

    </div>
  );
}