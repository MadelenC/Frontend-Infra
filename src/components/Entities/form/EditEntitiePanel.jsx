import React, { useEffect, useState } from "react";
import EditEntitieForm from "./EditEntitieForm";
import { useEntidadStore } from "../../../zustand/useEntidadStore";

export default function EditEntitiePanel({ open, onClose, entitieId }) {
  const { entidades, editEntidad, removeEntidad } = useEntidadStore();
  const [entitie, setEntitie] = useState(null);

  // Cuando cambie open o entitieId, buscar la entidad completa en el store
  useEffect(() => {
    if (!open || !entitieId) {
      setEntitie(null);
      return;
    }
    const found = entidades.find((e) => e.id === entitieId);
    setEntitie(found || null);
  }, [open, entitieId, entidades]);

  if (!open || !entitie) return null;

  const handleUpdate = async (updatedData) => {
    const res = await editEntidad(entitie.id, updatedData);
    if (res.ok) onClose();
  };

  const handleDelete = async () => {
    if (window.confirm("¿Desea eliminar esta entidad?")) {
      const res = await removeEntidad(entitie.id);
      if (res.ok) onClose();
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

        <h2 className="text-xl font-bold mb-4">Editar Entidad</h2>

        <EditEntitieForm
          entitie={entitie}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}




