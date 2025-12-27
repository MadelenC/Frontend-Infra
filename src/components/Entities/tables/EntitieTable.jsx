import React from "react";
import EntitieRow from "./EntitieRow";

export default function EntitieTable({ entidades }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {["ID", "Facultad", "Carrera", "Materia", "Sigla", "Acciones"].map(
              (head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-200"
                >
                  {head}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {entidades.length > 0 ? (
            entidades.map((entitie) => (
              <EntitieRow key={entitie.id} entitie={entitie} />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No se encontraron entidades.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

