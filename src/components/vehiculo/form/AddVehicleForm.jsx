import React, { useState } from "react";

export default function AddVehicleForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    asignadoA: "",
    placa: "",
    color: "",
    motor: "",
    chasis: "",
    cilindrada: "",
    pasajeros: "",
    kilometraje: "",
    estado: "",
    tipoGeneral: "",
    marca: "",
    modelo: "",
    tipoEspecifico: "",
    combustible: "",
  });

  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = [ "cilindrada", "pasajeros", "kilometraje"];
    const textOnlyFields = ["color", "asignadoA"];

    if (numericFields.includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }

    if (textOnlyFields.includes(name)) {
      if (!/^[a-zA-ZÁÉÍÓÚñÑ\s]*$/.test(value)) return;
    }

    // PLACA (mayúsculas + control de caracteres)
    if (name === "placa") {
      const valueUpper = value.toUpperCase();
      if (!/^[A-Z0-9-]*$/.test(valueUpper)) return;

      setFormData((prev) => ({ ...prev, [name]: valueUpper }));
      return;
    }

    if (name === "chasis") {
      const valueUpper = value.toUpperCase();

      if (!/^[A-Z0-9]*$/.test(valueUpper)) return;

      setFormData((prev) => ({ ...prev, [name]: valueUpper }));
      return;
    }

    // ASIGNADO A (forzar mayúscula inicial)
    if (name === "asignadoA") {
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1);

      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };


  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) setErrors((prev) => ({ ...prev, [name]: "Campo obligatorio" }));
    else setErrors((prev) => ({ ...prev, [name]: false }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) newErrors[key] = "Campo obligatorio";
    });

    // Placa Bolivia (Ej: 1234-ABC)
    if (formData.placa && !/^\d{4}-[A-Z]{3}$/.test(formData.placa)) {
      newErrors.placa = "Formato inválido (Ej: 1234-ABC)";
    }
    

    // AsignadoA empieza con mayúscula
    if (formData.asignadoA && !/^[A-ZÁÉÍÓÚÑ]/.test(formData.asignadoA)) {
      newErrors.asignadoA = "Debe empezar con mayúscula";
    }

    // Validación numérica extra
    const numericFields = [ "cilindrada", "pasajeros", "kilometraje"];
    numericFields.forEach((field) => {
      if (formData[field] && !/^\d+$/.test(formData[field])) {
        newErrors[field] = "Solo se permiten números";
      }
    });
    // Validación de chasis (solo letras y números)
    if (formData.chasis && !/^[A-Z0-9]+$/i.test(formData.chasis)) {
      newErrors.chasis = "Solo se permiten letras y números";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pt-9">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-4 overflow-y-auto max-h-[75vh] relative dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 pt-2 pl-10 dark:text-gray-200 text-center">
          Nuevo Vehículo
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-2 p-5 dark:text-gray-900"
        >
          {[
            { label: "Asignado a", name: "asignadoA" },
            { label: "Placa", name: "placa" },
            { label: "Color", name: "color" },
            { label: "Motor", name: "motor" },
            { label: "Chasis", name: "chasis" },
            { label: "Cilindrada", name: "cilindrada" },
            { label: "Pasajeros", name: "pasajeros" },
            { label: "Kilometraje", name: "kilometraje" },
            { label: "Tipo general", name: "tipoGeneral" },
            { label: "Marca", name: "marca" },
            { label: "Modelo", name: "modelo" },
            { label: "Tipo específico", name: "tipoEspecifico" },
          ].map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[field.name]}
            />
          ))}

          <Select
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            onBlur={handleBlur}
            options={["", "optimo", "mantenimiento", "desuso"]}
            error={errors.estado}
            className="text-gray-200"
          />

          <Select
            label="Combustible"
            name="combustible"
            value={formData.combustible}
            onChange={handleChange}
            onBlur={handleBlur}
            options={["", "Gasolina", "Diésel"]}
            error={errors.combustible}
          />

          <div className="md:col-span-3 flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Input con error + dark mode
function Input({ label, name, value, onChange, onBlur, error }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`p-2 border rounded text-sm w-full transition 
        dark:bg-gray-200/40 dark:border-gray-200
        focus:outline-none focus:ring-1 focus:ring-blue-500
        ${error ? "border-red-500 bg-red-50" : "border-gray-300"}`}
        placeholder={`Ingrese ${label}`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}

// Select con error + dark mode
function Select({ label, name, value, onChange, onBlur, options, error }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`p-2 border rounded text-sm w-full transition 
        dark:bg-gray-200/40 dark:border-gray-200
        focus:outline-none focus:ring-1 focus:ring-blue-500
        ${error ? "border-red-500 bg-red-50" : "border-gray-300"}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? "Seleccione estado" : opt}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}