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
  const {
    reservas,
    fetchReservas,
    loading,
    error,
    addReserva,
    page,
    setPage,
    totalPages,
  } = useReservaStore();

  const { users, fetchUsers } = useUserStore();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    fetchUsers();
  }, []);


  useEffect(() => {
    fetchReservas();
  }, [page]);

 
  const filtered = reservas.filter((r) =>
    (r.entidad || "").toLowerCase().includes(search.toLowerCase())
  );

  const encargados =
    users?.filter((u) => u.tipo === "encargado") || [];

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

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600 dark:text-gray-300">
        Cargando reservas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">

      <ToastContainer position="top-right" autoClose={3000} />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">

        <div className="w-full md:w-1/3">
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <div className="flex gap-2">

          <button className="bg-orange-600 text-white px-4 h-10 rounded-lg">
            Imprimir
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 h-10 rounded-lg"
          >
            + Agregar Reserva
          </button>

        </div>
      </div>

      {/* TABLE */}
      <ReservaTable reservas={filtered} />

      {/* PAGINATION */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {/* MODAL */}
      <AddReservaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReserva}
        encargados={encargados}
      />

    </div>
  );
}