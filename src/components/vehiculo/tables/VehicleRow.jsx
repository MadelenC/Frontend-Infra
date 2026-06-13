import React from "react";
import { FaEdit, FaTachometerAlt, FaEye } from "react-icons/fa";
import Badge from "../../ui/badge/Badge";
import ProtectedView from "../../Protected/ProtectedView";

export default function VehicleRow({ vehicle, onEdit, onUpdateKm, onView }) {
  const badgeColor =
    vehicle.estado === "Óptimo"
      ? "success"
      : vehicle.estado === "Mantenimiento"
      ? "warning"
      : vehicle.estado === "Desuso"
      ? "gray"
      : "danger";

  const cellClass =
    "border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 dark:text-gray-400";

  return (
    <tr className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <td className={cellClass}>{vehicle.id}</td>

      <td className={`${cellClass} truncate `}>
        {vehicle.asignacion}
      </td>

      <td className={`${cellClass} truncate`}>
        {vehicle.placa}
      </td>

      <td className={`${cellClass} text-center`}>
        {vehicle.asientos}
      </td>

      <td className={`${cellClass} truncate`}>
        {vehicle.tipog}
      </td>

      <td className={cellClass}>
        {vehicle.modelos?.[0]?.kilometraje || "-"}
      </td>
      

      <td className={cellClass}>
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {vehicle.estado}
        </Badge>
      </td>

      <td className={cellClass}>
        <div className="flex items-center justify-center gap-2">
          <ProtectedView 
           rolesAllowed={["administrador","supervisor"]}>
          <button
            onClick={onEdit}
            className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30
            text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200
              dark:hover:bg-indigo-800 transition"
              title="Editar"
          >
            <FaEdit size={14} />
          </button>
          </ProtectedView>

          <ProtectedView 
           rolesAllowed={["administrador","supervisor"]}>
          <button
            onClick={onUpdateKm}
            title="Actualizar kilometraje"
            className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
          >
            <FaTachometerAlt size={14} />
          </button>
          </ProtectedView>

          <ProtectedView 
           rolesAllowed={["administrador","supervisor","chofer","mecanico"]}>
          <button
            onClick={onView}
            title="ver"
            className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition"
          >
            <FaEye size={14} />
          </button>
          </ProtectedView>

        </div>
      </td>

    </tr>
  );
}

