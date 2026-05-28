import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaTachometerAlt, FaPrint } from "react-icons/fa";
import ReportTripButton from "../../pdf-buttons/ReportTripButton";
import ProtectedView from "../../Protected/ProtectedView";

export default function TripReportRow({
  trip,
  index,
  onUpdateKm,
}) {

 

  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center text-gray-700 dark:text-gray-300">
        {index}
      </TableCell>

     
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.vehiculoNombre}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.choferNombre}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.encargadoNombre}
      </TableCell>

    
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {trip.entidad}
      </TableCell>

    
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center text-gray-700 dark:text-gray-300">
        {trip.fechapartida}
      </TableCell>

    
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center">
        <ProtectedView
            rolesAllowed={["supervisor","administrador"]}
          >
        <button
          onClick={() => onUpdateKm?.(trip)}
          className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
          title="Actualizar KM"
        >
          <FaTachometerAlt size={14} />
        </button>
        </ProtectedView>

      </TableCell>

      <ProtectedView
            rolesAllowed={["supervisor","administrador","chofer"]}
          >
      <TableCell className="border px-3 py-2 text-center">
        <ReportTripButton tripId={trip.id} />
      </TableCell>
      </ProtectedView>

    </TableRow>
  );
}