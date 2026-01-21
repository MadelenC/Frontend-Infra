import React from "react";
import FuelRow from "./FuelRow";

export default function TableFuel({ data }) {
  const headers = [
    "#",
    "Nro. Solicitud",
    "Nro. Pedido",
    "Fecha",
    "Factura",
    "Vehículo",
    "Gasolina",
    "Diésel",
    "GNV",
    "Total Bs.",
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[1000px] w-full text-sm border-collapse border border-gray-300">
        <thead className="bg-blue-100">
          <tr>
            {headers.map((head) => (
              <th
                key={head}
                className="px-6 py-3 text-left font-semibold text-gray-700 border-b border-gray-300 whitespace-nowrap"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <FuelRow
                key={item.id}
                item={item}
                index={index + 1}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-10 text-gray-500"
              >
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
