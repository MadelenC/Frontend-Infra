import React, { useState } from "react";

export default function EncargadoForm({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const inputBase = "p-2 border rounded text-sm focus:outline-none w-full transition-colors";
  const inputError = "border-red-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const requiredFields = ["nombre", "apellido", "celular", "password"];
    if (requiredFields.includes(name) && !value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["nombre", "apellido", "celular", "password"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = "Este campo es obligatorio";
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Completa los campos obligatorios.");
      return;
    }
    onSubmit({
      nombres: formData.nombre || "",
      apellidos: formData.apellido || "",
      cedula: formData.cedula || "",
      celular: formData.celular || "",
      tipo: "Encargado",
      cargo: formData.cargo || "",
      email: formData.email || "",
    });
  };

  return (
    <form className="flex flex-col gap-4 text-sm w-full" onSubmit={handleSubmit}>
      <h3 className="font-bold text-gray-700 text-center">Registro de Encargado</h3>
      <div className="grid grid-cols-3 gap-3">
        {["nombre", "apellido", "celular", "password"].map((field, idx) => (
          <div className="flex flex-col" key={idx}>
            <label className="text-gray-600 text-xs capitalize">{field}:</label>
            <input
              name={field}
              type={field === "password" ? "password" : "text"}
              value={formData[field] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors[field] ? inputError : ""}`}
              placeholder={`Ingrese ${field}`}
            />
            {errors[field] && (
              <span className="text-red-500 text-xs mt-1">{errors[field]}</span>
            )}
          </div>
        ))}

        {/* Campos opcionales */}
        {["facultad", "carrera", "materia", "sigla", "cedula", "email"].map((field, idx) => (
          <div className="flex flex-col" key={idx}>
            <label className="text-gray-600 text-xs capitalize">{field}:</label>
            <input
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className={`${inputBase}`}
              placeholder={`Ingrese ${field}`}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          type="submit"
          className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}
