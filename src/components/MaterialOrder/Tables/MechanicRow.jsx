import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaPrint, FaFileAlt, FaEye } from "react-icons/fa";

export default function MechanicRow({ mechanic, index, onRealizar }) {
  console.log(mechanic);

  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-300">
        {index}
      </TableCell>

      {/* Petición por */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.solicitud?.chofer || "-"}
      </TableCell>

      {/* Vehículo */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.solicitud?.vehiculo
          ? `${mechanic.solicitud.vehiculo.tipog} - ${mechanic.solicitud.vehiculo.placa}`
          : "-"}
      </TableCell>

      {/* Kilometraje */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.km || "-"}
      </TableCell>

      {/* Justificación */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.justificacion || "-"}
      </TableCell>

      {/* Observación */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.observacion || "-"}
      </TableCell>

      {/* Operación: 3 botones */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center flex gap-2 justify-center">

        <button
          onClick={() => onRealizar?.("imprimir", mechanic)}
          className="p-2 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
          title="Imprimir"
        >
          <FaPrint size={14} />
        </button>

        <button
          onClick={() => onRealizar?.("imprimir_blanco", mechanic)}
          className="p-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Imprimir en blanco"
        >
          <FaFileAlt size={14} />
        </button>

        <button
          onClick={() => onRealizar?.("ver_solicitud", mechanic)}
          className="p-2 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
          title="Ver solicitud"
        >
          <FaEye size={14} />
        </button>

      </TableCell>

      {/* Respuestas */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 text-center">
        {mechanic.respuestas || "-"}
      </TableCell>

    </TableRow>
  );
}