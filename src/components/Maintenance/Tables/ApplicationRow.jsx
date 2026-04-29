import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaCheck, FaBox } from "react-icons/fa";

export default function ApplicationRow({
  application,
  index,
  onConcretar,
  onPedido,
}) {
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      {/* # */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-400">
        {index}
      </TableCell>

      {/* CHOFER */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {application.chofer || ""}
      </TableCell>

      {/* VEHÍCULO */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {application.vehiculo
          ? [application.vehiculo.tipog, application.vehiculo.placa].filter(Boolean).join(" - ")
          : "-"}
      </TableCell>

      {/* ACCESORIOS */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {application.accesorios?.length
          ? application.accesorios.map(a => a.solicitud).join(", ")
          : "-"}
      </TableCell>

      {/* DESCRIPCIÓN */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {application.descripcion}
      </TableCell>

      {/* FECHA */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {application.fecha}
      </TableCell>

      {/* OPERACIONES */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        <div className="flex flex-col gap-2">

          {/* CONCRETAR */}
          <button
            onClick={() => onConcretar(application)}
            className="w-full text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-800/40 flex items-center gap-1 transition"
          >
            <FaCheck size={12} />
            Concretar
          </button>

          {/* PEDIDO.M */}
          <button
            onClick={() => onPedido(application)}
            className="w-full text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-800/40 flex items-center gap-1 transition"
          >
            <FaBox size={12} />
            Pedido.M
          </button>

        </div>
      </TableCell>

      {/* TRABAJOS */}
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {application.trabajos || "-"}
      </TableCell>

    </TableRow>
  );
}