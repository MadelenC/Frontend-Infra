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

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [openUpdateKmPanel, setOpenUpdateKmPanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Debounce para evitar request por cada letra
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Cargar datos solo una vez
  useEffect(() => {
    fetchAllChoferes();
    fetchAllEncargados();
    fetchAllVehicles();
  }, []);

  // Buscar viajes
  useEffect(() => {
    fetchTripReports({ page, search: debouncedSearch });
  }, [page, debouncedSearch]);

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
  const vehicleWithKm = {
    ...trip.vehiculo,

    kilometraje: trip.kilollegada || 0,
  };

  console.log(vehicleWithKm);

  setSelectedVehicle(vehicleWithKm);
  setSelectedTrip(trip);
  setOpenUpdateKmPanel(true);
};

  return (
    <div className="bg-white p-4 rounded-xl shadow">

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