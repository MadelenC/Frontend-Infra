import React, { useState } from "react";

export default function GeneralForm({ onSubmit }) {
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
    const requiredFields = ["nombre", "apellido", "password", "cedula", "celular", "tipo"];
    if (requiredFields.includes(name) && !value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["nombre", "apellido", "password", "cedula", "celular", "tipo"];
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
      tipo: formData.tipo || "Empleado",
      cargo: formData.cargo || "",
      email: formData.email || "",
    });
  };

  return (
    <form className="flex flex-col gap-4 text-sm w-full" onSubmit={handleSubmit}>
      <h3 className="font-bold text-gray-600 text-center">Registro General</h3>
      <div className="grid grid-cols-3 gap-3">
        {["nombre", "apellido", "password", "cedula", "celular"].map((field, idx) => (
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

        <div className="flex flex-col">
          <label className="text-gray-600 text-xs">Tipo de Usuario:</label>
          <select
            name="tipo"
            value={formData.tipo || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${errors.tipo ? inputError : ""}`}
          >
            <option value="">Seleccione un tipo</option>
            <option value="Administrador">Administrador</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Chofer">Chofer</option>
            <option value="Mecánico">Mecánico</option>
            <option value="Mensajero">Mensajero</option>
          </select>
          {errors.tipo && (
            <span className="text-red-500 text-xs mt-1">{errors.tipo}</span>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <div className="flex flex-col w-64">
          <label className="text-gray-600 text-xs text-center">
            E-mail: (Opcional)
          </label>
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className={`${inputBase}`}
            placeholder="Ingrese un email válido"
          />
        </div>
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
