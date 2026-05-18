import React from "react";
import { TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import HojaRutaButton from "../../pdf-buttons/HojaRutaButton";

import {
  FaMoneyBill,
  FaFileInvoice,
  FaCashRegister,
  FaCogs,
  FaEye,
  FaTrash,
} from "react-icons/fa";

export default function TripsRow({
  trip,
  onOpenModal,
  onDeleteTrip,
  openMenu,
  setOpenMenu,
}) {
  const estado = trip.estado?.toLowerCase();

  const badgeColor =
    estado === "activo"
      ? "success"
      : estado === "pendiente"
      ? "warning"
      : estado === "cancelado"
      ? "danger"
      : "gray";

 
  const toggleMenu = (tripId, menuType) => {
    setOpenMenu((prev) =>
      prev.tripId === tripId && prev.type === menuType
        ? { tripId: null, type: null }
        : { tripId, type: menuType }
    );
  };

  const isOpen = (menuType) =>
    openMenu.tripId === trip.id && openMenu.type === menuType;

  return (
    <tr
      className={`border border-gray-200 dark:border-gray-700 transition-colors
      ${
        estado === "cancelado"
          ? "bg-red-100 dark:bg-red-900/40 hover:bg-red-200 dark:hover:bg-red-900/60"
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <TableCell className="border px-3 py-2">{trip.id}</TableCell>
      <TableCell className="border px-3 py-2">{trip.entidad}</TableCell>
      <TableCell className="border px-3 py-2">{trip.tipo}</TableCell>
      <TableCell className="border px-3 py-2 truncate max-w-[200px]">
        {trip.objetivo}
      </TableCell>
      <TableCell className="border px-3 py-2 text-center">
        {trip.dias}
      </TableCell>
      <TableCell className="border px-3 py-2">{trip.pasajeros}</TableCell>
      <TableCell className="border px-3 py-2">{trip.fecha_inicial}</TableCell>
      <TableCell className="border px-3 py-2">{trip.fecha_final}</TableCell>

      <TableCell className="border px-3 py-2">
        <Badge size="sm" color={badgeColor}>
          {trip.estado}
        </Badge>
      </TableCell>

      {/* ACCIONES */}
      <TableCell className="border px-3 py-2 relative">
        <div className="flex flex-col gap-1">

          {/* PRESUPUESTO */}
          <div className="relative">
            <button
              onClick={() => toggleMenu(trip.id, "presupuesto")}
              className="w-full text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center gap-1"
            >
              <FaMoneyBill size={10} />
              Presupuesto
            </button>

            {isOpen("presupuesto") && (
              <div className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-md z-10 text-xs">

                <button
                  onClick={() => {
                    onOpenModal("cheque", trip);
                    setOpenMenu({ tripId: null, type: null });
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  <FaFileInvoice size={10} />
                  Cheque
                </button>

                <button
                  onClick={() => {
                    onOpenModal("caja", trip);
                    setOpenMenu({ tripId: null, type: null });
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  <FaCashRegister size={10} />
                  Caja
                </button>

              </div>
            )}
          </div>

          {/* REALIZAR */}
          <div className="relative">
            <button
              onClick={() => toggleMenu(trip.id, "realizar")}
              className="w-full text-xs px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 flex items-center gap-1"
            >
              <FaCogs size={10} />
              Realizar
            </button>

            {isOpen("realizar") && (
              <div className="absolute right-0 mt-1 w-36 bg-white border rounded shadow-md z-10 text-xs">

                <button
                  onClick={() => {
                    onOpenModal("detalle", trip);
                    setOpenMenu({ tripId: null, type: null });
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  <FaEye size={10} />
                  Ver
                </button>

                <button
                  onClick={() => {
                    onOpenModal("edit", trip);
                    setOpenMenu({ tripId: null, type: null });
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  <FaFileInvoice size={10} />
                  Editar viaje
                </button>

                <button
                  onClick={() => {
                    if (!confirm("¿Seguro que deseas eliminar TODO el viaje?")) return;
                    onDeleteTrip(trip.id);
                    setOpenMenu({ tripId: null, type: null });
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100"
                >
                  <FaTrash size={10} />
                  Eliminar viaje
                </button>

                <button
                  onClick={() => {
                    onOpenModal("InformCheck", trip);
                    setOpenMenu({ tripId: null, type: null });
                  }}
                  className="flex items-center gap-1 w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  <FaFileInvoice size={10} />
                  Informe/Cheque
                </button>

                <div className="px-2 py-1 hover:bg-gray-100">
                <HojaRutaButton viajeId={trip.id} />
              </div>

              </div>
            )}
          </div>

        </div>
      </TableCell>
    </tr>
  );
}