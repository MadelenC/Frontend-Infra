import { useState, useEffect, useMemo } from "react";
import SearchBarTrips from "../search/SearchBar";
import TripsRow from "./TripsRow";
import Pagination from "./Paginations";
import AddTripsFrom from "../form/AddTripsFrom";
import CheckTripForm from "../form/TripsCheckForm";
import TripsCajaForm from "../form/TripsCajaForm";
import TripDetailForm from "../form/TripDetailForm";
import EditTripsForm from "../form/Cancel/EditTripForm";

import InformCheck from "../form/SeccInfCh/InformCheck";

import VehicleReportButton from "../../pdf-buttons/VehicleReportButton";

import { FiFileText, FiBarChart2, FiPlus } from "react-icons/fi";

import { useTripsStore } from "../../../zustand/useTripsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";

import { toast } from "react-toastify";

import { PDFDownloadLink } from "@react-pdf/renderer";




export default function TripsTable({ externalTripId = null }) {

  const {
    fetchTrips,
    trips,
    page,
    totalPages,
    setPage,
    addTrip, 
    editTrip,
    cancelTrip,
    removeTrip,
    
  } = useTripsStore();

  const {
    fetchAllEncargados,
    fetchAllChoferes
  } = useUserStore();

  const getTripById = useTripsStore(
  (state) => state.getTripById
);

const [openMenu, setOpenMenu] = useState({
  id: null,
  type: null,
});

  const { fetchAllVehicles } = useVehicleStore();
 const { fetchAllDestinos } = useDestinoStore();
 const [allDestinos, setAllDestinos] = useState([]);

  
  const [encargados, setEncargados] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("");

  const [modalType, setModalType] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

 
 useEffect(() => {
  const init = async () => {
    await fetchTrips();
  };

  init();
}, []);


  useEffect(() => {
    fetchTrips();
  }, [page]);

  useEffect(() => setPage(1), [search, tipo]);


  useEffect(() => {
  const loadData = async () => {
    const [
      enc,
      chof,
      veh,
      dest
    ] = await Promise.all([
      fetchAllEncargados(),
      fetchAllChoferes(),
      fetchAllVehicles(),
      fetchAllDestinos()
    ]);

    setEncargados(enc || []);
    setChoferes(chof || []);
    setVehiculos(veh || []);
    setAllDestinos(dest || []);
  };

  loadData();
}, []);

 
  const handleOpenModal = async (type, trip = null) => {

  if (
    (type === "detalle" ||
      type === "edit" ||
      type === "InformCheck") &&
    trip?.id
  ) {

    try {

      const tripData = await getTripById(trip.id);

      console.log("RESPUESTA STORE:", tripData);

      const formattedForForms = {
        ...tripData,

        tipoViaje: tripData.tipo || "",
        inicio: tripData.fecha_inicial || "",
        final: tripData.fecha_final || "",

        chofer: tripData.choferes || [],
        encargado: tripData.encargados || [],
        vehiculo: tripData.vehiculos || [],
        destinos: tripData.destinos || [],
      };

      setSelectedTrip(formattedForForms);

    } catch (err) {

      toast.error("Error al cargar detalle del viaje");

    }

  } else {

    setSelectedTrip(trip);

  }

  setModalType(type);

};

    const handleCloseModal = () => {
    setModalType(null);
    setSelectedTrip(null);
  };

 const handleCancelTrip = async (id) => {

  try {

    const res = await cancelTrip(id);

    if (res.ok) {

      await fetchTrips();

      toast.success("Viaje cancelado");

    }

  } catch (error) {

    toast.error("Error al cancelar viaje");

    console.error(error);

  }

};

const handleDeleteTrip = async (id) => {

  const confirmDelete = window.confirm(
    "¿Seguro que deseas eliminar este viaje?"
  );

  if (!confirmDelete) return;

  try {

    const res = await removeTrip(id);

    if (res.ok) {

      toast.success("Viaje eliminado");

      await fetchTrips();

    } else {

      toast.error(res.error);

    }

  } catch (error) {

    console.error(error);

    toast.error("Error al eliminar viaje");

  }

};

 const filteredTrips = useMemo(() => {
  if (!Array.isArray(trips)) return [];

  return trips.filter(t => {
    const matchesSearch =
      t.entidad?.toLowerCase().includes(search.toLowerCase()) ||
      t.objetivo?.toLowerCase().includes(search.toLowerCase());

    const matchesTipo = tipo ? t.tipo === tipo : true;

    const matchesId = externalTripId
      ? Number(t.id) === Number(externalTripId)
      : true;

    return matchesSearch && matchesTipo && matchesId;
  });
}, [trips, search, tipo, externalTripId]);

  const SimpleModal = ({ title, children }) => (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-[420px] p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {title}
        </h2>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          {children}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleCloseModal}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

 

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* FILTROS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 items-center">

        <div className="flex gap-2 w-full">
          <div className="flex-1">
            <SearchBarTrips search={search} setSearch={setSearch} />
          </div>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="h-10 px-3 rounded-md border border-gray-300 
            dark:border-gray-600 bg-white dark:bg-gray-800 
            text-gray-800 dark:text-gray-200 text-sm"
          >
            <option value="">Todos</option>
            <option value="Viaje de Práctica">Viaje de Práctica</option>
            <option value="Viaje de Inspección">Viaje de Inspección</option>
            <option value="Viaje Académico">Viaje Académico</option>
            <option value="Viaje de Cultura">Viaje de Cultura</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 justify-start md:justify-end">

         

      <VehicleReportButton />
      
          {!externalTripId && (
            <button
              onClick={() => handleOpenModal("add")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 h-10 rounded-md"
            >
              <FiPlus />
              Agregar Viaje
            </button>
          )}

        </div>
      </div>

      {/* TABLA */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {["#", "Entidad", "Tipo", "Objetivo", "Días", "Pasajeros", "Inicio", "Fin", "Estado", "Acciones"].map(h => (
                <th key={h} className="px-3 py-2 border dark:text-gray-200">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredTrips.length > 0 ? (
              filteredTrips.map(trip => (
                <TripsRow
                  key={trip.id}
                  trip={trip}
                  openMenu={openMenu}
                  setOpenMenu={setOpenMenu}
                  onOpenModal={handleOpenModal}
                  onCancelTrip={handleCancelTrip}
                  onDeleteTrip={handleDeleteTrip}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
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

      
      {modalType === "add" && (
        <AddTripsFrom
          isOpen={true}
          initialData={null}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehiculos}
          destinos={allDestinos}
          onClose={handleCloseModal}
          onSave={async (data) => {
            const res = await addTrip(data);

            if (res.ok) {
              toast.success("Viaje registrado");
              fetchTrips(); 
              handleCloseModal();
            } else {
              toast.error("Error al guardar");
              console.error(res.error);
            }
          }}
        />
      )}

      {modalType === "caja" && (
        <TripsCajaForm
          viajeData={selectedTrip}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehiculos}
          onClose={handleCloseModal}
        />
      )}

      {modalType === "cheque" && (
        <CheckTripForm
          data={selectedTrip}
          onClose={handleCloseModal}
          choferes={choferes}
          destinos={allDestinos}
          encargados={encargados}
          vehiculos={vehiculos}
        />
      )}

      

      {modalType === "informe" && (
        <SimpleModal title="Informe de Viajes">
          Aquí podrás generar reportes de viajes.
        </SimpleModal>
      )}

      {modalType === "detalle" && (
        <TripDetailForm
          data={selectedTrip}
          onClose={handleCloseModal}
        />
      )}

      {modalType === "InformCheck" && (
        <InformCheck
          data={selectedTrip}
          onClose={handleCloseModal}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehiculos}
        />
      )}

      {modalType === "edit" && (
        <EditTripsForm
          isOpen={true}
          initialData={selectedTrip} 
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehiculos}
          destinos={allDestinos}
          onClose={handleCloseModal}
           onSave={async (data) => {

          const res = await editTrip(selectedTrip.id, data);

          if (res.ok) {
            toast.success("Viaje actualizado correctamente");
            fetchTrips();  
            handleCloseModal();
          } else {
            toast.error("Error al actualizar viaje");
            console.error(res.error);
          }

        }}
            />
          )}

        </div>
      );
}