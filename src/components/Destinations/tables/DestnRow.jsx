import React from "react";
import { FaEdit, FaMapMarkedAlt } from "react-icons/fa";

export default function DestRow({ item, index }) {
  const handleEdit = () => console.log("Editar destino:", item);
  const handleMap = () => console.log("Ver mapa:", item);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-3 py-2 border-b text-center">{index + 1}</td>
      <td className="px-3 py-2 border-b">{item.departamentoInicio}</td>
      <td className="px-2 py-2 border-b">{item.origen}</td>
      <td className="px-5 py-2 border-b max-w-[280px] truncate" title={item.ruta}>
        {item.ruta}
      </td>
      <td className="px-2 py-2 border-b">{item.destino}</td>
      <td className="px-3 py-2 border-b">{item.departamentoFinal}</td>
      <td className="px-4 py-3 border-b text-center">{item.distancia}</td>
      <td className="px-3 py-2 border-b text-center">{item.tiempo}</td>

      {/* Columna Operaciones: Editar + Ver Mapa */}
      <td className="px-3 py-2 border-b text-center">
        <div className="flex items-center justify-center gap-2">
          {/* Editar */}
          <button
            onClick={handleEdit}
            title="Editar"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          >
            <FaEdit size={14} />
          </button>

          {/* Ver Mapa */}
          <button
            onClick={handleMap}
            title="Ver Mapa"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
          >
            <FaMapMarkedAlt size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

