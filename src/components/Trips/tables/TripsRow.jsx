import React, { useState } from "react";
import { TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";

import {
  FaMoneyBill,
  FaFileInvoice,
  FaCashRegister,
  FaCogs,
  FaEye,
  FaPrint,
  FaTrash,
  FaTimes,
  FaDoorOpen,
} from "react-icons/fa";

export default function TripsRow({ trip, onOpenModal, onCancelTrip,onDeleteTrip }) {
  const [openMenu, setOpenMenu] = useState(null);
  const estado = trip.estado?.toLowerCase();
  const badgeColor =
    estado === "activo"
      ? "success"
      : estado === "pendiente"
      ? "warning"
      : estado === "cancelado"
      ? "danger"
      : "gray";

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <tr
      className={`border border-gray-200 dark:border-gray-700 transition-colors
        ${
          estado === "cancelado"
            ? "bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60"
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
    >


      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.id}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.entidad}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.tipo}
      </TableCell>

      <TableCell className="border px-3 py-2 truncate max-w-[200px] dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.objetivo}
      </TableCell>

      <TableCell className="border px-3 py-2 text-center dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.dias}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.pasajeros}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.fecha_inicial}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        {trip.fecha_final}
      </TableCell>

      <TableCell className="border px-3 py-2 dark:border-gray-700 dark:text-gray-300">
        <Badge size="sm" color={badgeColor}>
          {trip.estado}
        </Badge>
      </TableCell>

   
      <TableCell className="border px-3 py-2 relative dark:border-gray-700">
        <div className="flex flex-col gap-1">

          {estado === "cancelado" ? (
            
            <>
              <button
                onClick={() => onOpenModal("edit", trip)}
                className="w-full text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center gap-1"
              >
                <FaFileInvoice size={10} />
                Editar
              </button>

              <button
                onClick={() => onOpenModal("detalle", trip)}
                className="w-full text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1"
              >
                <FaEye size={10} />
                Detalle
              </button>

              <button
                onClick={() => onDeleteTrip(trip.id)}
                className="w-full text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 flex items-center gap-1"
              >
                <FaTrash size={10} />
                Eliminar
              </button>
            </>
          ) : (
            
            <>
            
              <div className="relative">
                <button
                  onClick={() => toggleMenu("presupuesto")}
                  className="w-full text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200
                             dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800
                             flex items-center gap-1 "
                >
                  <FaMoneyBill size={10} />
                  Presupuesto
                </button>

                {openMenu === "presupuesto" && (
                  <div className="absolute right-0 mt-1 w-32 bg-white 
                                  border dark:border-gray-700 rounded shadow-md z-10 text-xs dark:bg-gray-300">

                    <button
                      onClick={() => {
                        onOpenModal("cheque", trip);
                        setOpenMenu(null);
                      }}
                      className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100
                                 dark:hover:bg-gray-800 dark:texy-gray200"
                    >
                      <FaFileInvoice size={10} />
                      Cheque
                    </button>

                    <button
                      onClick={() => {
                        onOpenModal("caja", trip);
                        setOpenMenu(null);
                      }}
                      className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100
                                 dark:hover:bg-gray-800"
                    >
                      <FaCashRegister size={10} />
                      Caja
                    </button>

                  </div>
                )}
              </div>

          
              <div className="relative">
                <button
                  onClick={() => toggleMenu("realizar")}
                  className="w-full text-xs px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200
                             dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800
                             flex items-center gap-1"
                >
                  <FaCogs size={10} />
                  Realizar
                </button>

                {openMenu === "realizar" && (
                  <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-400
                                  border dark:border-gray-700 rounded shadow-md z-10 text-xs ">

                    <button
                      onClick={() => {
                        onOpenModal("detalle", trip);
                        setOpenMenu(null);
                      }}
                      className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-500"
                    >
                      <FaEye size={10} />
                      Ver
                    </button>

                    <button className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100
                                       dark:hover:bg-gray-400 d">
                      <FaPrint size={10} />
                      Imprimir
                    </button>

                    <button
                      onClick={() => onDeleteTrip(trip.id)}
                     className="flex items-center gap-1 w-full text-left px-2 py-1 text-red-600
                                       hover:bg-gray-100 dark:hover:bg-gray-800">
                      <FaTrash size={10} />
                      Eliminar
                    </button>
                    <button
                      onClick={() => {
                        onOpenModal("InformCheck", trip);
                        setOpenMenu(null);
                      }}
                      className="flex items-center gap-1 w-full text-left px-2 py-1 text-gray-900
                                hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FaFileInvoice size={10} />
                      Informe/Cheque
                    </button>

                  </div>
                )}
              </div>

           
              <button
                onClick={() => {
                  if (!confirm("¿Seguro que deseas cancelar este viaje?")) return;
                  onCancelTrip(trip.id);
                }}
                className="w-full text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200
                           dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800
                           flex items-center gap-1"
              >
                <FaTimes size={10} />
                Cancelar
              </button>
            </>
          )}

        </div>
      </TableCell>
    </tr>
  );
}