import React, { useState, useEffect } from "react";
import KardexRow from "./KardexRow";
import Pagination from "./Pagination";
import UpdateKmForm from "../Form/UpdateKmForm";
import ProcessReturnForm from "../Form/ProcessReturnForm";
import { useMechanicsStore } from "../../../zustand/useMechanicsStore";
import { useRepaymentStore } from "../../../zustand/useRepaymetnStore"; 


export default function KardexTable({ onRealizar }) {
  const { mechanics, fetchMechanics, editMechanic } = useMechanicsStore();


  const { addRepayment } = useRepaymentStore();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 8;

  const [updateKmOpen, setUpdateKmOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [processReturnOpen, setProcessReturnOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);

 

  const handleOpenUpdateKm = (vehicle) => {
    setSelectedVehicle(vehicle);
    setUpdateKmOpen(true);
  };

  const handleCloseUpdateKm = () => {
    setSelectedVehicle(null);
    setUpdateKmOpen(false);
  };

  const handleSaveUpdateKm = async (updatedVehicle) => {
    await editMechanic(updatedVehicle.id, { kilometraje: updatedVehicle.kilometraje });
    fetchMechanics();
    handleCloseUpdateKm();
  };

  const handleOpenProcessReturn = (maintenance) => {
    setSelectedReturn(maintenance);
    setProcessReturnOpen(true);
  };

  const handleCloseProcessReturn = () => {
    setSelectedReturn(null);
    setProcessReturnOpen(false);
  };

  const handleSaveProcessReturn = async (data) => {
  try {
    const res = await addRepayment(data);

    if (!res.ok) {
      console.error(res.error);
      return { ok: false, error: res.error };
    }

    fetchMechanics();
    handleCloseProcessReturn();

    return res;
  } catch (error) {
    console.error(error);
    return { ok: false, error: error.message };
  }
};

  useEffect(() => {
    fetchMechanics();
  }, []);

  useEffect(() => setPage(1), [search]);

  const filtered = mechanics?.filter((m) =>
    m.trabajo?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4 transition-all">

    
      <div className="flex justify-between items-center mb-4">

        <input
          type="text"
          placeholder="Buscar por descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-70 px-4 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />

        <button
          onClick={() => window.print()}
          className="flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-500
              hover:from-orange-700 hover:to-orange-600 text-white px-5 py-3 rounded-lg shadow-lg font-medium
              focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2
              dark:focus:ring-gray-600 dark:focus:ring-offset-gray-900
              transition-all duration-300 hover:scale-105 active:scale-95 mb-4"
        >
          Imprimir
        </button>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

        <table className="w-full text-sm bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800">
            <tr>
              {[
                "#", "Vehículo", "Kilometraje", "Fecha", "Cantidad",
                "Unidad", "Trabajo", "Marca", "Código", "Repuesto",
                "Actualizar KM", "Operación", "Devolución"
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-bold text-gray-700 dark:text-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length ? (
              currentData.map((m, i) => (
                <KardexRow
                  key={m.id}
                  maintenance={{
                    vehiculo: m.solicitud?.vehiculo
                      ? `${m.solicitud.vehiculo.tipog} - ${m.solicitud.vehiculo.placa}`
                      : "-",
                    kilometraje: m.kilometraje || "-",
                    fecha: m.fecha,
                    cantidad: m.cantidad || "-",
                    unidad: m.unidad || "-",
                    trabajo: m.trabajo || "-",
                    marca: m.marca || "-",
                    codigo: m.codigo || "-",
                    repuesto: m.observacion || "-",
                    id: m.id,
                    devolucion: m.devolucion || 0,
                  }}
                  index={(page - 1) * limit + i + 1}
                  onActualizarKm={handleOpenUpdateKm}
                  onRealizar={handleOpenProcessReturn}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={13}
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

      {/* MODALES */}
      {updateKmOpen && selectedVehicle && (
        <UpdateKmForm
          vehicle={selectedVehicle}
          onUpdateKm={handleSaveUpdateKm}
          onClose={handleCloseUpdateKm}
        />
      )}

      {processReturnOpen && selectedReturn && (
        <ProcessReturnForm
          isOpen={processReturnOpen}
          onClose={handleCloseProcessReturn}
          onSave={handleSaveProcessReturn}
          maintenance={selectedReturn}
          
        />
      )}

    </div>
  );
}