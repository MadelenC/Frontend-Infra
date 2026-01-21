import React from "react";
import MapsRow from "./MapsRow";

export default function TableMaps({ data }) {
  const headers = [
    "#",
    "Destino",
    "Título",
    "Latitud",
    "Longitud",
    "Operación",
  ];

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md">
      <table className="w-full table-fixed text-sm border-collapse">
        <thead className="bg-blue-100">
          <tr>
            {headers.map((h, idx) => (
              <th
                key={h}
                className={`px-3 py-2 font-semibold border-b border-gray-300
                  ${idx === 0 ? "w-10 text-center" : ""}
                  ${h === "Latitud" || h === "Longitud" ? "w-35 text-center" : ""}
                  ${h === "Operación" ? "w-28 text-center" : ""}
                `}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            data.map((item, index) => (
              <MapsRow key={item.id} item={item} index={index} />
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="py-6 text-center text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
