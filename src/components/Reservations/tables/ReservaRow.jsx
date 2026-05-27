import React from "react";

const formatDate = (isoDate) => {
  if (!isoDate) return "-";
  return isoDate.split("T")[0];
};

export default function ReservaRow({ reserva, onEdit }) {
  return (
    <tr className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <td className="border px-3 py-2 text-center dark:border-gray-700 dark:text-gray-300">
        {reserva.id}
      </td>

      <td className="border px-3 py-2 dark:border-gray-700 dark:text-gray-300">
        {reserva.entidad}
      </td>

      <td className="border px-3 py-2 dark:border-gray-700 dark:text-gray-300">
        {reserva.user
          ? `${reserva.user.nombres} ${reserva.user.apellidos}`
          : "Sin encargado"}
      </td>

      <td className="border px-3 py-2 dark:border-gray-700 dark:text-gray-300">
        {reserva.objetivo}
      </td>

      <td className="border px-3 py-2 text-center dark:border-gray-700 dark:text-gray-300">
        {reserva.pasajeros}
      </td>

      <td className="border px-3 py-2 text-center dark:border-gray-700 dark:text-gray-300">
        {formatDate(reserva.fecha_inicial)}
      </td>

      <td className="border px-3 py-2 text-center dark:border-gray-700 dark:text-gray-300">
        {formatDate(reserva.fecha_final)}
      </td>

      <td className="border px-3 py-2 text-center dark:border-gray-700 dark:text-gray-300">
        {reserva.dias}
      </td>

      <td className="border px-3 py-2 text-center space-y-1">

        <button
           className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs px-2 py-1 rounded-md transition"
          onClick={() => onEdit(reserva)}
        >
          Concretar
        </button>

      </td>

    </tr>
  );
}