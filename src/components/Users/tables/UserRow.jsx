import React from "react";
import { TableRow, TableCell } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FaEdit } from "react-icons/fa";
import { useUserStore } from "../../../zustand/userStore";
import { toast } from "react-toastify";


export default function UserRow({ user, onEdit, index, page = 1, limit = 8}) {

  const { toggleUserStatus } = useUserStore();

  const handleToggleActive = async () => {
  toast.info(
    ({ closeToast }) => (
      <div>
        <p className="text-sm mb-3">
          ¿Estás seguro de cambiar el estado del usuario?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => closeToast()}
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            Cancelar
          </button>

          <button
            onClick={async () => {
              closeToast();

              const result = await toggleUserStatus(user.id);

              if (!result.ok) {
                console.error(result.error);
                toast.error("Error al cambiar estado");
              } else {
                toast.success("Estado actualizado");
              }
            }}
            className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          >
            Sí, continuar
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
    }
  );
};

  const badgeColor =
    user.tipo === "Administrador"
      ? "success"
      : user.tipo === "Empleado"
      ? "warning"
      : "info";
  const globalIndex = (page - 1) * limit + index + 1;
  return (
    <TableRow className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 font-medium text-gray-700 dark:text-gray-400">
        {globalIndex}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {user.nombres}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {user.apellidos}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {user.cedula}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-400">
        {user.celular}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 dark:text-gray-400 px-3 py-2">
        <Badge size="sm" color={badgeColor} className="px-2 py-1 text-xs">
          {user.tipo}
        </Badge>
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2 capitalize text-gray-700 dark:text-gray-300">
        {user.cargo}
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">
        <button
          className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30
          text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200
            dark:hover:bg-indigo-800 transition"
          title="Editar usuario"
          onClick={() => onEdit(user)}
        >
          <FaEdit size={14} />
        </button>
      </TableCell>

      <TableCell className="border border-gray-200 dark:border-gray-700 px-3 py-2">

      <button
        type="button"
        onClick={handleToggleActive}
        className={`
          w-5 h-5 rounded-full transition-all duration-300
          border-2 shadow-md hover:scale-110
          ${
            user.active
              ? "bg-emerald-500 border-emerald-300 shadow-emerald-400/70"
              : "bg-red-500 border-red-300 shadow-red-400/70"
          }
        `}
      />

   </TableCell>


    </TableRow>
  );
}


