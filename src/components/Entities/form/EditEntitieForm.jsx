import React, { useState, useEffect } from "react";

export default function EditEntitieForm({ entitie, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    facultad: "",
    carrera: "",
    materia: "",
    sigla: "",
  });

  // Cargar datos cuando se selecciona una entidad
  useEffect(() => {
    if (!entitie) {
      setFormData({
        facultad: "",
        carrera: "",
        materia: "",
        sigla: "",
      });
      return;
    }

    // Edición de entidad existente
    setFormData({
      facultad: entitie.facultad || "",
      carrera: entitie.carrera || "",
      materia: entitie.materia || "",
      sigla: entitie.sigla || "",
    });
  }, [entitie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {["facultad", "carrera", "materia", "sigla"].map((field) => (
        <div key={field} className="flex flex-col">
          <label className="text-xs font-semibold text-gray-700 capitalize">
            {field}
          </label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
        >
          Actualizar
        </button>

        {entitie && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}






