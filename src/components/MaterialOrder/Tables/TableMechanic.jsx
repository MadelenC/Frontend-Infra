import React from "react";
import MechanicRow from "./MechanicRow";

export default function TableMechanic({ requests, onRealizar }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full text-sm bg-white dark:bg-gray-900 border-collapse">

        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <tr>
            {[
              "#",
              "Petición por",
              "Vehículo",
              "Kilometraje",
              "Justificación",
              "Observación",
              "Operación",
              "Respuestas",
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
          {requests?.length > 0 ? (
            requests.map((r, index) => (
              <MechanicRow
                key={r.id}
                mechanic={r}
                index={index + 1}
                onRealizar={onRealizar}
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
  );
}