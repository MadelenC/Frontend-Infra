import React, { useState } from "react";
import { useEntidadStore } from "../../../zustand/useEntidadStore";

export default function RegisterEntityForm({ onClose }) {
  const addEntidad = useEntidadStore((state) => state.addEntidad);

  const [formData, setFormData] = useState({
    facultad: "",
    carrera: "",
    materia: "",
    sigla: "",
   
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => !v)) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    const result = await addEntidad(formData);
    setLoading(false);

    if (result.ok) {
      alert("Entidad registrada correctamente");
      setFormData({
        facultad: "",
        carrera: "",
        materia: "",
        sigla: "",
      });
      onClose?.(); // opcional
    } else {
      alert("Error al registrar la entidad: " + result.error);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-2 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Registrar Entidad
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "facultad", label: "Facultad" },
          { name: "carrera", label: "Carrera" },
          { name: "materia", label: "Materia" },
          { name: "sigla", label: "Sigla" },
        ].map(({ name, label }) => (
          <div key={name} className="space-y-1">
            <label
              htmlFor={name}
              className="text-sm font-medium text-gray-700"
            >
              {label}
            </label>

            <input
              id={name}
              name={name}
              type="text"
              value={formData[name]}
              onChange={handleChange}
              placeholder={`Ingrese ${label.toLowerCase()}`}
              className="w-full rounded-lg border border-gray-300 bg-gray-50
                         px-3 py-2.5 text-sm placeholder:text-gray-400
                         focus:bg-white focus:outline-none focus:ring-2
                         focus:ring-indigo-500 transition"
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-9">
          {/* Cancelar */}
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-2 text-sm font-medium
                       rounded-lg border border-gray-300
                       text-gray-800 hover:bg-gray-300 transition "
          >
            Cancelar
          </button>

          {/* Guardar */}
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-2 text-sm font-semibold
                       bg-indigo-700 text-white rounded-lg
                       hover:bg-indigo-500 transition
                       disabled:opacity-60 disabled:cursor-not-allowed
                       flex items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}



