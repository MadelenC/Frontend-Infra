import React from "react";
import TripsRow from "./TripsRow";

export default function TableTrips({ trips, onOpenModal, onCancelTrip }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-sm bg-gray-900">

      <table className="w-full border-collapse text-sm text-gray-200 border border-gray-700">

        
        <thead className="bg-gray-800">
          <tr>
            {[
              "#",
              "Entidad",
              "Tipo",
              "Objetivo",
              "Días",
              "Pasajeros",
              "Fecha Inicial",
              "Fecha Final",
              "Estado",
              "Operaciones",
            ].map((head) => (
              <th
                key={head}
                className="border border-gray-700 px-3 py-2 text-left font-semibold text-gray-300 dark:text-gray-200"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

    
        <tbody>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <TripsRow
                key={trip.id}
                trip={trip}
                onOpenModal={onOpenModal}
                onCancelTrip={onCancelTrip}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={10}
                className="border border-gray-700 px-3 py-2"
              >
                No se encontraron viajes.
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}