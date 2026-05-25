import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit, FaPrint } from "react-icons/fa";
import PresupuestosReportButton from "../../pdf-buttons/PresupuestoReportButton";

export default function CheckBudgetRow({ budget, index, onEdit }) {

  const badgeColor =
    budget.entidad === "Interno"
      ? "success"
      : budget.entidad === "Externo"
      ? "warning"
      : "info";

  const handlePrint = () => {
    console.log("Imprimiendo:", budget);
    window.print();
  };

  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ">

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-400">
        {index}
      </TableCell>

 
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {budget.id}
      </TableCell>

  
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {budget.choferNombre}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {budget.vehiculoNombre}
      </TableCell>

   
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 dark:text-gray-400">
        <Badge
          size="sm"
          color={badgeColor}
          className="px-2 py-1 text-xs"
        >
          {budget.entidad}
        </Badge>
      </TableCell>

     
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        <div className="flex items-center gap-2">

          <button
            className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            title="Editar presupuesto"
            onClick={() => onEdit(budget)}
          >
            <FaEdit size={14} />
          </button>

         <PresupuestosReportButton budgetId={budget.id} />

        </div>
      </TableCell>

    </TableRow>
  );
}