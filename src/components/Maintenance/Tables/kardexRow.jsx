import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaTachometerAlt, FaCheck } from "react-icons/fa";

export default function KardexRow({
  maintenance,
  index,
  onActualizarKm,
  onRealizar,
}) {
  console.log("KardexRow maintenance:", maintenance);

  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-400">
        {index}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.vehiculo}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.kilometraje}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.fecha ? new Date(maintenance.fecha).toLocaleDateString() : "-"}
      </TableCell>

     
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.cantidad}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.unidad}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.trabajo}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.marca}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.codigo}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {maintenance.repuesto}
      </TableCell>
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center">
        <button
          onClick={() => onActualizarKm?.(maintenance)}
          className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/40 transition"
          title="Actualizar KM"
        >
          <FaTachometerAlt size={14} />
        </button>
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
       {maintenance.operacion}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center">

        
        <div className="text-red-600 dark:text-red-400 font-bold text-sm mb-1">
          {maintenance.devolucion ?? 0}
        </div>

       
        <button
          onClick={() => onRealizar(maintenance)}
          className="w-full text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-800/40 flex items-center justify-center gap-1 transition"
        >
          <FaCheck />
          Realizar
        </button>

      </TableCell>

    </TableRow>
  );
}