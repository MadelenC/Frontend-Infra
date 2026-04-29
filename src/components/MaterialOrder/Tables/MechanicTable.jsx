import React, { useState, useEffect } from "react";
import MechanicRow from "./MechanicRow";
import Pagination from "./Pagination";
import { useMaterialOrderStore } from "../../../zustand/useMaterialOrderStore";

export default function MechanicTable() {
  const { requests, fetchRequests, editRequest } = useMaterialOrderStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 8;

  const [processOpen, setProcessOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenProcess = (request) => {
    setSelectedRequest(request);
    setProcessOpen(true);
  };

  const handleCloseProcess = () => {
    setSelectedRequest(null);
    setProcessOpen(false);
  };

  const handleSaveProcess = async (data) => {
    await editRequest(data.id, { respuestas: data.respuestas });
    fetchRequests();
    handleCloseProcess();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => setPage(1), [search]);

  const filtered =
    requests?.filter((r) =>
      r.justificacion?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por justificación..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-80 px-4 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full text-sm">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <tr>
              {[
                "#",
                "Petición por:",
                "Vehículo",
                "Kilometraje",
                "Justificación",
                "Observación",
                "Operación",
                "Respuestas",
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-bold text-black-700 dark:text-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length ? (
              currentData.map((r, i) => (
                <MechanicRow
                  key={r.id}
                  mechanic={r}
                  index={(page - 1) * limit + i + 1}
                  onRealizar={handleOpenProcess}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

    </div>
  );
}