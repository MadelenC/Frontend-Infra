import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaEdit } from "react-icons/fa";

export default function EntitieRow({ entitie }) {
  const handleEdit = () => {
    console.log("Editar entidad (sin acción por ahora):", entitie);
  };

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell>{entitie.id}</TableCell>
      <TableCell>{entitie.facultad}</TableCell>
      <TableCell>{entitie.carrera}</TableCell>
      <TableCell>{entitie.materia}</TableCell>
      <TableCell>{entitie.sigla}</TableCell>

      <TableCell>
        <div className="flex gap-2">
          {/* Ícono Editar (NO abre el panel) */}
          <button
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            title="Editar entidad"
            onClick={handleEdit}
          >
            <FaEdit size={14} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}



