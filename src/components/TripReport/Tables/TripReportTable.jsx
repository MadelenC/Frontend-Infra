import { useEffect, useState, useMemo } from "react";
import SearchBar from "../Search/SearchBar";
import TableTripReport from "./TableTripReport";
import Pagination from "./Pagination";

import { useTripReportStore } from "../../../zustand/useTripReportStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

import UpdateKmForm from "../Form/UpdateKmForm";

export default function TripReportTable() {

  const {
    tripReports,
    fetchTripReports,
    page,
    setPage,
    totalPages,
    loading,
    error,
    editTripReport,
  } = useTripReportStore();

  const {
    fetchAllChoferes,
    fetchAllEncargados,
    choferes = [],
    encargados = []
  } = useUserStore();

  const {
    vehicles = [],
    fetchAllVehicles,
    editVehicle
  } = useVehicleStore();
  console.log("VEHICLES:", vehicles);

  const { search, setSearch } = useTripReportStore();

  const [openUpdateKmPanel, setOpenUpdateKmPanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  
  useEffect(() => {
    fetchAllChoferes();
    fetchAllEncargados();
    fetchAllVehicles();
  }, []);

useEffect(() => {
  fetchTripReports();
}, [page, search]);
 

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
const handleUpdateKm = (trip) => {
  const vehicleWithKm = vehicles.find(
    (v) => v.id === trip.vehiculo.id
  );

  setSelectedVehicle(vehicleWithKm);
  setSelectedTrip(trip);
  setOpenUpdateKmPanel(true);
};

  return (
    <div className="bg-white p-4 rounded-xl shadow dark:bg-gray-900">

      <div className="mb-4 w-64">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {loading && <div>Cargando...</div>}
      {error && <div className="text-red-500">{error}</div>}

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
            const result = await editVehicle(updatedVehicle.id, updatedVehicle);

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