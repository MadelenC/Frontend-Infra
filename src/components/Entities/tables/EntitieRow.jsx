import React from "react";
import { FaEdit } from "react-icons/fa";
import { TableRow, TableCell } from "../../ui/table";

export default function EntitieRow({ entitie, onEdit }) {
  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell>{entitie.id}</TableCell>
      <TableCell>{entitie.facultad}</TableCell>
      <TableCell>{entitie.carrera}</TableCell>
      <TableCell>{entitie.materia}</TableCell>
      <TableCell>{entitie.sigla}</TableCell>

      <TableCell>
        <button
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition"
          title="Editar entidad"
          onClick={() => onEdit(entitie)}
        >
          <FaEdit size={14} />
        </button>
      </TableCell>
    </TableRow>
  );
}




