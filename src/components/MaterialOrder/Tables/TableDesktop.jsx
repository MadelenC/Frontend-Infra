import React from "react";
import DesktopRow from "./DesktopRow";

export default function TableDesktop({ data, onAction }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">

      <table className="w-full text-sm bg-white dark:bg-gray-900 border-collapse">

        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <tr>
            {["#", "Nombre", "Motivo", "Fecha", "Operación"].map((header) => (
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
          {data?.length > 0 ? (
            data.map((item, index) => (
              <DesktopRow
                key={item.id}
                item={item}
                index={index + 1}
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
  );
}