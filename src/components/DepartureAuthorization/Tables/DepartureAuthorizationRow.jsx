import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit, FaPrint,FaTrash } from "react-icons/fa";
import BoletaDeparturesButton from "../../pdf-buttons/BoletaDeparturesButton";
import ProtectedView from "../../Protected/ProtectedView";

export default function DepartureAuthorizationRow({
  departure,
  index,
  onEdit,
  onDelete,
}) {

  const badgeColor =
    departure.estado === "Aprobado"
      ? "success"
      : departure.estado === "Pendiente"
      ? "warning"
      : departure.estado === "Rechazado"
      ? "danger"
      : "info";

  const handlePrint = () => {
    console.log("Imprimiendo:", departure);
    window.print();
  };

  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-400">
        {index}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {departure.chofer?.nombre || ""}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {departure.vehiculo?.placa || ""}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {departure.responsable}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        <div className="flex items-center gap-2">
          <ProtectedView
            rolesAllowed={["supervisor","administrador"]}
          >
          <button
            className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            title="Editar"
            onClick={() => onEdit(departure)}
          >
            <FaEdit size={14} />
          </button>
          </ProtectedView>

          <ProtectedView
            rolesAllowed={["supervisor","administrador"]}
          >
            <button
              className="p-2 rounded-full bg-red-600 dark:bg-red-900 text-gray-300 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-700 transition"
              title="Eliminar"
              onClick={() => onDelete(departure.id)}
            >
              <FaTrash size={14} />
            </button>
          </ProtectedView>

          <ProtectedView
            rolesAllowed={["supervisor","administrador"]}
          >
          <BoletaDeparturesButton boletaId={departure?.id} />
          </ProtectedView>

        </div>
      </TableCell>

    </TableRow>
  );
}