import React, { useState } from "react";
import { useAuthStore } from "../../../zustand/AuthUsers";

export default function GeneralForm({ onSubmit }) {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    celular: "",
    tipo: "",
    password: "",
    cargo: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const inputBase =
    "p-2 border rounded text-sm w-full transition dark:bg-gray-200/40 dark:border-gray-200";
  const inputError = "border-red-500 bg-red-50";

  const requiredFields = [
    "nombre",
    "apellido",
    "cedula",
    "celular",
    "tipo",
    "password",
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // MAYÚSCULA AUTOMÁTICA
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // VALIDACIÓN
  const validateField = (name, value) => {
    if (requiredFields.includes(name) && !value.trim()) {
      return "Este campo es obligatorio";
    }

    if (name === "email") {
      if (value.trim() && !emailRegex.test(value)) {
        return "Email inválido";
      }
    }

    return null;
  };

  // CHANGE
  const handleChange = (e) => {
    let { name, value } = e.target;

    // SOLO NÚMEROS CELULAR
    if (name === "celular") {
      value = value.replace(/[^0-9]/g, "");
    }

    // SOLO LETRAS
    if (name === "nombre" || name === "apellido") {
      value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      value = toTitleCase(value);
    }

    // CÉDULA
    if (name === "cedula") {
      value = value.replace(/[^a-zA-Z0-9\-]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // BLUR
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (
      formData.email &&
      !emailRegex.test(formData.email)
    ) {
      newErrors.email = "Email inválido";
    }

    const touchedFields = {};
    [...requiredFields, "email"].forEach((f) => {
      touchedFields[f] = true;
    });

    setTouched(touchedFields);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await onSubmit({
        nombres: formData.nombre.trim(),
        apellidos: formData.apellido.trim(),
        cedula: formData.cedula.trim(),
        celular: formData.celular.trim(),
        tipo: formData.tipo,
        password: formData.password,
        cargo: formData.cargo.trim() || undefined,
        email: formData.email.trim() || undefined,
        insertador: `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() || "DESCONOCIDO",
      });
    } catch (error) {
      console.log("ERROR FRONT:", error);

      setErrors((prev) => ({
        ...prev,
        cedula: error.message || "La cédula ya está registrada",
      }));

      setTouched((prev) => ({
        ...prev,
        cedula: true,
      }));
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <h3 className="text-center font-semibold text-gray-600 dark:text-gray-200">
        Registro General
      </h3>

      <div className="grid grid-cols-3 gap-3 dark:text-gray-200">
        {["nombre", "apellido", "password", "cedula", "celular"].map(
          (field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-600 text-xs capitalize dark:text-gray-200">
                {field}
              </label>

              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`Ingrese su ${field}`}
                className={`${inputBase} ${
                  errors[field] && touched[field] ? inputError : ""
                }`}
              />

              {errors[field] && touched[field] && (
                <span className="text-red-500 text-xs">
                  {errors[field]}
                </span>
              )}
            </div>
          )
        )}

        {/* TIPO */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-xs dark:text-gray-200">
            Tipo
          </label>

          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${
              errors.tipo && touched.tipo ? inputError : ""
            }`}
          >
            <option value="">Seleccione</option>
            <option value="administrador">Administrador</option>
            <option value="supervisor">Supervisor</option>
            <option value="chofer">Chofer</option>
            <option value="mecánico">Mecánico</option>
            <option value="mensajero">Mensajero</option>
          </select>

          {errors.tipo && touched.tipo && (
            <span className="text-red-500 text-xs">{errors.tipo}</span>
          )}
        </div>
      </div>

      {/* EMAIL */}
      <div className="flex flex-col mt-2">
        <label className="text-gray-600 text-xs dark:text-gray-200">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ejemplo@gmail.com"
          className={`${inputBase} ${
            errors.email && touched.email ? inputError : ""
          }`}
        />

        {errors.email && touched.email && (
          <span className="text-red-500 text-xs">{errors.email}</span>
        )}
      </div>

      {/* BOTÓN */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}