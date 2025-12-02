import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UserRow({ user }) {
  const badgeColor =
    user.tipo === "Administrador"
      ? "success"
      : user.tipo === "Empleado"
      ? "warning"
      : "info";

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell className="font-medium text-gray-700">{user.id}</TableCell>
      <TableCell className="text-gray-700">{user.nombres}</TableCell>
      <TableCell className="text-gray-700">{user.apellidos}</TableCell>
      <TableCell className="text-gray-700">{user.cedula}</TableCell>
      <TableCell className="text-gray-700">{user.celular}</TableCell>

      <TableCell>
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {user.tipo}
        </Badge>
      </TableCell>

      <TableCell className="capitalize text-gray-700">{user.cargo}</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            title="Editar usuario"
          >
            <FaEdit size={14} />
          </button>


        </div>
      </TableCell>
    </TableRow>
  );
}


