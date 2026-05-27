import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "../search/SearchBar";
import ReservaTable from "./ReservaTable";
import Pagination from "./Paginations";
import AddReservaModal from "../form/AddRerservaForm";
import ReservaModal from "../form/ReservaModal";

import { useReservaStore } from "../../../zustand/useReservationsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

import { useTripsStore } from "../../../zustand/useTripsStore";

export default function TableReserva() {
  const {
    reservas,
    fetchReservas,
    addReserva,
    editReserva,
    page,
    totalPages,
    setPage,
  } = useReservaStore();
  

  const { fetchAllEncargados, fetchAllChoferes } = useUserStore();
  const { fetchAllDestinos } = useDestinoStore();
  const { fetchAllVehicles } = useVehicleStore(); 
  const addTrip = useTripsStore((state) => state.addTrip);

  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);

  const [encargados, setEncargados] = useState([]);
  const [choferes, setChoferes] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [vehiculos, setVehiculos] = useState([]); 

  useEffect(() => {
    fetchReservas();
  }, [page]);

  
 useEffect(() => {
  if (!isAddOpen) return;

  const loadAddData = async () => {
    try {

      const enc = await fetchAllEncargados();

      setEncargados(enc);

    } catch (err) {
      console.error("Error cargando encargados:", err);
    }
  };

  loadAddData();

}, [isAddOpen]);

useEffect(() => {
  if (!isEditOpen) return;

  const loadEditData = async () => {
    try {

      const [enc, cho, dest, veh] = await Promise.all([
        fetchAllEncargados(),
        fetchAllChoferes(),
        fetchAllDestinos(),
        fetchAllVehicles(),
      ]);

      setEncargados(enc);
      setChoferes(cho);
      setDestinos(dest);
      setVehiculos(veh);

    } catch (err) {
      console.error("Error cargando data:", err);
    }
  };

  loadEditData();

}, [isEditOpen]);

  const filtered = reservas.filter((r) =>
    (r.entidad || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveReserva = async (data) => {
    try {
      await addReserva(data);
      toast.success("Reserva creada");
      setIsAddOpen(false);
      fetchReservas();
    } catch {
      toast.error("Error al crear reserva");
    }
  };

  const handleEditSave = async (formData) => {

  const payload = {
    ...formData,

    estado: "activo",

    reserva_id: selectedReserva.id,
  };

  console.log("DATA A ENVIAR:", payload);

  const res = await addTrip(payload);

  if (!res.ok) {
    toast.error(res.error);
    return;
  }

  toast.success("Viaje creado desde reserva");

  setIsEditOpen(false);

  setSelectedReserva(null);
};

  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 border shadow p-4">

      <ToastContainer />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">

  
  <div className="w-full md:w-auto">
    <SearchBar search={search} setSearch={setSearch} />
  </div>

 
  <button
    onClick={() => setIsAddOpen(true)}
    className="
      w-full md:w-auto
      bg-blue-600 hover:bg-blue-700
      text-white px-4 py-2 rounded-lg
      transition
    "
  >
    + Agregar Reserva
  </button>

</div>

      
      <ReservaTable
        reservas={filtered}
        onEdit={(reserva) => {
          setSelectedReserva(reserva);
          setIsEditOpen(true);
        }}
      />

     
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

     
      {isAddOpen && (
        <AddReservaModal
          isOpen={true}
          onClose={() => setIsAddOpen(false)}
          onSave={handleSaveReserva}
          encargados={encargados}
          choferes={choferes}
          vehiculos={vehiculos}   
          destinos={destinos}
        />
      )}

      
      {isEditOpen && selectedReserva && (
        <ReservaModal
          isOpen={true}
          initialData={selectedReserva}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedReserva(null);
          }}
          onSave={handleEditSave}
          encargados={encargados}
          choferes={choferes}
          vehiculos={vehiculos}   
          destinos={destinos}
        />
      )}
    </div>
  );
}