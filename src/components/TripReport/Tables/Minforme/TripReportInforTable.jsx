import { useEffect, useState, useMemo } from "react";
import SearchBar from "../../Search/SearchBar";
import TableTripReport from "./InforTripReport";
import Pagination from "../Pagination";

import { useTripReportStore } from "../../../../zustand/useTripReportStore";
import { useAuthStore } from "../../../../zustand/AuthUsers";
import { useVehicleStore } from "../../../../zustand/useVehicleStore";

import UpdateKmForm from "../../Form/UpdateKmForm";

export default function TTripReportInforTable() {

  const {
    tripReports,
    fetchTripReports,
    fetchMyDriverReports,
    page,
    setPage,
    totalPages,
    loading,
    error,
  } = useTripReportStore();

  const { user } = useAuthStore();

  const {
    vehicles = [],
    fetchAllVehicles,
    editVehicle
  } = useVehicleStore();

  const { search, setSearch } = useTripReportStore();

  const [openUpdateKmPanel, setOpenUpdateKmPanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

useEffect(() => {

  if (!user) return;

  const tipoUsuario = user?.tipo?.trim().toLowerCase();

  console.log("USER:", user);
  console.log("TIPO:", tipoUsuario);

  if (tipoUsuario === "chofer") {

    console.log("ENTRA A CHOFER");

    fetchMyDriverReports();

  } else {

    console.log("ENTRA A TODOS");

    fetchTripReports();
  }

}, [page, search, user]);

  const enrichedTrips = useMemo(() => {
    return (tripReports || []).map((t) => ({
      ...t,

      vehiculoNombre: t.vehiculo
        ? `${t.vehiculo.placa} (${t.vehiculo.tipog || ""})`
        : "Sin vehículo",

      choferNombre: t.chofer
        ? `${t.chofer.nombres} ${t.chofer.apellidos}`
        : "Sin chofer",

      encargadoNombre: t.encargado
        ? `${t.encargado.nombres} ${t.encargado.apellidos}`
        : "Sin encargado",
    }));
  }, [tripReports]);

  const handleUpdateKm = async (trip) => {

    const vehiculosData = await fetchAllVehicles();

    const vehicleWithKm = vehiculosData.find(
      (v) => v.id === trip.vehiculo.id
    );

    setSelectedVehicle(vehicleWithKm);
    setSelectedTrip(trip);
    setOpenUpdateKmPanel(true);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow dark:bg-gray-900">

      {user?.tipo?.toLowerCase() !== "chofer" && (
        <div className="mb-4 w-64">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      )}

      {loading && <div>Cargando...</div>}

      {error && (
        <div className="text-red-500">
          {error}
        </div>
      )}

      <TableTripReport
        tripReports={enrichedTrips}
        onUpdateKm={handleUpdateKm}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {openUpdateKmPanel && selectedVehicle && selectedTrip && (
        <UpdateKmForm
          vehicle={selectedVehicle}
          onClose={() => setOpenUpdateKmPanel(false)}
          onUpdateKm={async (updatedVehicle) => {

            const result = await editVehicle(
              updatedVehicle.id,
              updatedVehicle
            );

            if (result.ok) {

              alert("Kilometraje actualizado correctamente");

              setOpenUpdateKmPanel(false);

            } else {

              alert("Error al actualizar: " + result.error);
            }
          }}
        />
      )}

    </div>
  );
}