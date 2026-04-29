import React, { useState, useEffect } from "react";
import DesktopRow from "./DesktopRow";
import Pagination from "./Pagination";
import { FaPlus } from "react-icons/fa";
import MaterialRequestForm from "../Form/MaterialRequestOrderForm";

export default function DesktopTable({ data, onAction, onCreate }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const limit = 8;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered =
    data?.filter((d) =>
      d.nombre?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleCreate = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleSaveForm = async (formData) => {
    console.log("Datos guardados:", formData);
    return { ok: true };
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         className="h-10 w-80 px-4 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FaPlus size={14} />
          Crear nuevo
        </button>

      </div>

      {/* TABLA */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              {["#", "Nombre", "Motivo", "Fecha", "Operación"].map((h) => (
                <th
                  key={h}
                  className="border px-3 py-2 text-left font-bold
                  border-gray-200 dark:border-gray-700
                  text-gray-700 dark:text-gray-300"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length ? (
              currentData.map((item, i) => (
                <DesktopRow
                  key={item.id}
                  item={item}
                  index={(page - 1) * limit + i + 1}
                  onAction={onAction}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
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

      {/* FORM */}
      {formOpen && (
        <MaterialRequestForm
          isOpen={formOpen}
          onClose={handleCloseForm}
          onSave={handleSaveForm}
        />
      )}

    </div>
  );
}