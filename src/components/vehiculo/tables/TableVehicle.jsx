import React from "react";
import VehicleRow from "./VehicleRow";

export default function TableVehicle({ vehicles }) {
  const headers = [
    "#",
    "Asignación",
    "Placa",
    "Asientos",
    "Tipo",
    "Kilometraje",
    "Estado",
    "Operaciones",
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[900px] w-full text-sm border-collapse border border-gray-300">
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
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <VehicleRow key={vehicle.id} vehicle={vehicle} />
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
