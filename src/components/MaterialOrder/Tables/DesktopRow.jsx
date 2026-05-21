import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function DesktopRow({ item, index, onAction }) {
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">

    
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {index}
      </TableCell>

    
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {item.nombre || "-"}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {item.motivo || "-"}
      </TableCell>

    
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {item.fecha || "-"}
      </TableCell>

     
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 flex gap-2 justify-center">

        <button
          onClick={() => onAction?.("view", item)}
          className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-800 transition"
        >
          <FaEye size={14} />
        </button>

        <button
          onClick={() => onAction?.("edit", item)}
          className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
        >
          <FaEdit size={14} />
        </button>

        <button
          onClick={() => onAction?.("delete", item)}
          className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
        >
          <FaTrash size={14} />
        </button>

      </TableCell>
    </TableRow>
  );
}