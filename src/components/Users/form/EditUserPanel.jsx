import React, { useEffect } from "react";
import { useUserStore } from "../../../zustand/userStore";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import EditUserForm from "./EditUserForm";

export default function EditUserPanel({ open, onClose, user }) {
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const entidades = useEntidadStore((state) => state.entidades);
  const fetchEntidades = useEntidadStore((state) => state.fetchEntidades);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  useEffect(() => {
    if (open) {
      fetchEntidades(); 
    }
  }, [open, fetchEntidades]);

  if (!open) return null;

  const handleUpdate = async () => {
  await fetchUsers();
  onClose();
};

  const handleDelete = async () => {
    if (window.confirm("¿Desea eliminar este usuario?")) {
      await deleteUser(user.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-5 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-lg max-h-[90vh] overflow-y-auto relative dark:bg-gray-800">
       
       
          <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300"
          aria-label="Cerrar formulario"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 dark:text-gray-200 text-center">Editar Usuario</h2>

        <EditUserForm
          user={user}
          entidades={entidades}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onClose={onClose}
        />
      </div>
    </div>
  );
}








