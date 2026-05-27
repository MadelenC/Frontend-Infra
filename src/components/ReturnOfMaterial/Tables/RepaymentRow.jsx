import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEye, FaEdit, FaTrash,FaPrint } from "react-icons/fa";

export default function RepaymentRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">

      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-200">
        {index}
      </TableCell>

      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-300">
        {item.serial || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-300">
        {item.fecha || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-300">
        {item.nombre || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-300">
        {item.cantidad || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-300">
        {item.detalle || "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 text-gray-800 dark:text-gray-300">
      {item.mecanico?.solicitud?.vehiculo
  ? `${item.mecanico.solicitud.vehiculo.placa} - ${item.mecanico.solicitud.vehiculo.tipog}`
  : "-"}
      </TableCell>

      <TableCell className="border px-3 py-2 flex gap-2 justify-center">

        <button
          onClick={() => onAction?.("edit", item)}
          className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30
     text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200
      dark:hover:bg-indigo-800 transition"
        >
          <FaEdit size={14} />
        </button>


      </TableCell>
    </TableRow>
  );
}