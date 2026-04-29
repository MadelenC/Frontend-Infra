import React from "react";
import KardexRow from "./KardexRow";

export default function TableKardex({
  maintenances,
  onActualizarKm,
  onRealizar,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full text-sm bg-white dark:bg-gray-900 border-collapse">

        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800">

          <tr>
            {[
              "#",
              "Vehículo",
              "Kilometraje",
              "Fecha",
              "Cantidad",
              "Unidad",
              "Trabajo",
              "Marca",
              "Código",
              "Repuesto",
              "Actualizar km",
              "Operación",
              "Devolución",
            ].map((header) => (
              <th
                key={header}
                className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>

        </thead>

        <tbody>
          {maintenances?.length > 0 ? (
            maintenances.map((m, index) => (
              <KardexRow
                key={m.id}
                maintenance={m}
                index={index + 1}
                onActualizarKm={onActualizarKm}
                onRealizar={onRealizar}
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
  );
}