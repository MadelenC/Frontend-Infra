import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import { FaPrint, FaFileAlt, FaEye,FaEdit  } from "react-icons/fa";
import RequestButton from "../../pdf-buttons/RequestButton";
import MaterialRequestButton from "../../pdf-buttons/MaterialRequestButton";

export default function MechanicRow({ mechanic, index, onRealizar }) {
  console.log(mechanic);

  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

   
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-300">
        {index}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.solicitud?.chofer || "-"}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.solicitud?.vehiculo
          ? `${mechanic.solicitud.vehiculo.tipog} - ${mechanic.solicitud.vehiculo.placa}`
          : "-"}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.km || "-"}
      </TableCell>

      
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.justificacion || "-"}
      </TableCell>

  
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300">
        {mechanic.observacion || "-"}
      </TableCell>

    
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-center flex gap-2 justify-center">
       <RequestButton requestId={mechanic.id} />
        <RequestButton requestId={mechanic.id} blank={true} className="-gray-500" />
        <MaterialRequestButton requestId={mechanic.id} />
        <button onClick={() => onRealizar(mechanic)} className=" p-2  bg-blue-100  text-blue-600  rounded-lg  hover:bg-blue-200  transition-colors " title="Editar">
          <FaEdit size={14} />
        </button>
      </TableCell>

   
      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 text-center">
        {mechanic.respuestas || "-"}
      </TableCell>

    </TableRow>
  );
}