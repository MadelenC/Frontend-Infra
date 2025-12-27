import React, { useEffect } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import EditUserForm from "./EditUserForm";

export default function EditUserPanel({ open, onClose, user }) {
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const entidades = useEntidadStore((state) => state.entidades);
  const fetchEntidades = useEntidadStore((state) => state.fetchEntidades);

  useEffect(() => {
    if (open) {
      fetchEntidades(); // Solo traemos entidades cuando se abre el panel
    }
  }, [open, fetchEntidades]);

  if (!open) return null;

  const handleUpdate = async (updatedData) => {
    await updateUser(user.id, updatedData);
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm("¿Desea eliminar este usuario?")) {
      await deleteUser(user.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-600 px-3 py-1 rounded hover:bg-gray-700"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>

        <EditUserForm
          user={user}
          entidades={entidades}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}








