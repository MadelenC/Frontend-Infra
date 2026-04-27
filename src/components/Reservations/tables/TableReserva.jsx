import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../search/SearchBar";
import ReservaTable from "./ReservaTable";
import Pagination from "./Paginations";
import AddReservaModal from "./../form/AddRerservaForm";
import { useReservaStore } from "../../../zustand/useReservationsStore";
import { useUserStore } from "../../../zustand/userStore"; 

export default function TableReserva() {
  const { reservas, fetchReservas, loading, error, addReserva } = useReservaStore();
  const { users, fetchUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const limit = 8;

  useEffect(() => {
    fetchReservas();
    fetchUsers();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = reservas.filter((r) =>
    r.entidad?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);
  const encargados = users?.filter(u => u.tipo === "encargado") || [];

 const handleSaveReserva = async (data) => {
  setSaving(true);

  try {
    const response = await addReserva(data);

  
    if (!response?.ok) {
      toast.error(response?.error || "Error al guardar");
      return;
    }

    await fetchReservas();

    toast.success("Reserva registrada correctamente"); 

    setIsModalOpen(false);

  } catch (error) {
    toast.error("Error inesperado al guardar");
  } finally {
    setSaving(false);
  }
};

  if (loading)
    return <div className="p-4 text-center text-gray-600 dark:text-gray-300">Cargando reservas...</div>;

  if (error)
    return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 transition-all">

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">

          {/* IZQUIERDA: SEARCH */}
          <div className="w-full md:w-1/3">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          {/* DERECHA: BOTONES */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:justify-end">

            <button className="flex items-center justify-center gap-2
              bg-gradient-to-r from-orange-600 to-orange-500
              hover:from-orange-700 hover:to-orange-600
              dark:from-orange-600 dark:to-orange-500 dark:hover:from-orange-700 dark:hover:to-orange-600
              text-white px-5 h-10 rounded-lg shadow-lg font-medium
              transition hover:scale-[1.02] active:scale-95 w-full sm:w-auto">

              Imprimir
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2
              bg-gradient-to-r from-blue-600 to-blue-500
              hover:from-blue-700 hover:to-blue-600
              dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-700 dark:hover:to-blue-600
              text-white px-5 h-10 rounded-lg shadow-lg font-medium
              transition hover:scale-[1.02] active:scale-95 w-full sm:w-auto"
            >
              + Agregar Reserva
            </button>

          </div>

        </div>

      <ReservaTable reservas={currentData} />

      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      <AddReservaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReserva}
        encargados={encargados} 
      />

    </div>
  );
}