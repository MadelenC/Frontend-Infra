import React, { useState } from "react";
import { useAuthStore } from "../../../zustand/AuthUsers";
import { useUserStore } from "../../../zustand/userStore";

export default function GeneralForm({ onSubmit }) {
  const { user } = useAuthStore();
  const { users } = useUserStore();

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
  const [cedulaExists, setCedulaExists] = useState(false);
  const [touched, setTouched] = useState({});

  const inputBase = "p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200";
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

  // MAYÚSCULA
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  //VALIDAR CAMPO INDIVIDUAL
  const validateField = (name, value) => {
    if (requiredFields.includes(name) && !value.trim()) {
      return "Este campo es obligatorio";
    }

    if (name === "email") {
      if (value.trim() && !emailRegex.test(value)) {
        return "Email inválido";
      }
    }

    if (name === "cedula" && cedulaExists) {
      return "La cédula ya está registrada";
    }

    return null;
  };

  // ALIDACIÓN CÉDULA DUPLICADA
  const checkCedula = (cedula) => {
    if (!cedula) return;

    const exists = users?.some(
      (u) => String(u.cedula).trim() === String(cedula).trim()
    );

    setCedulaExists(exists);

    setErrors((prev) => ({
      ...prev,
      cedula: exists ? "La cédula ya está registrada" : null,
    }));
  };

  
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "celular") value = value.replace(/[^0-9]/g, "");

    if (name === "nombre" || name === "apellido") {
      value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      value = toTitleCase(value);
    }

    if (name === "cedula") {
      value = value.replace(/[^a-zA-Z0-9\-]/g, "");
      checkCedula(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (requiredFields.includes(name)) {
      setErrors((prev) => ({
        ...prev,
        [name]: value.trim() ? null : "Este campo es obligatorio",
      }));
    }

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email:
          value.trim() && !emailRegex.test(value)
            ? "Email inválido"
            : null,
      }));
    }
  };

  
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    requiredFields.forEach((f) => {
      if (!formData[f]?.trim()) {
        newErrors[f] = "Este campo es obligatorio";
      }
    });

    if (cedulaExists) {
      newErrors.cedula = "La cédula ya está registrada";
    }

    if (formData.email?.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      ...formData,
      nombres: formData.nombre.trim(),
      apellidos: formData.apellido.trim(),
      cedula: formData.cedula.trim(),
      celular: formData.celular.trim(),
      cargo: formData.cargo.trim() || undefined,
      email: formData.email.trim() || undefined,
      insertador:
        `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() ||
        "DESCONOCIDO",
    });
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
              <label className="text-gray-600 text-xs capitalize dark:text-gray-200 ">
                {field}
              </label>

              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Ingrese su ${field}`}
                onBlur={handleBlur}
                className={`${inputBase} ${
                  errors[field] && touched[field] ? inputError : ""
                }`}
              />

              {errors[field] && touched[field] && (
                <span className="text-red-500 text-xs ">
                  {errors[field]}
                </span>
              )}
            </div>
          )
        )}

        <div className="flex flex-col">
          <label className="text-gray-600 text-xs dark:text-gray-200">Tipo</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${
              errors.tipo && touched.tipo ? inputError : ""
            }`}
          >
            <option value=""className="dark:text-gray-950">Seleccione</option>
            <option value="administrador" className="dark:text-gray-950">Administrador</option>
            <option value="supervisor"className="dark:text-gray-950">Supervisor</option>
            <option value="chofer"className="dark:text-gray-950">Chofer</option>
            <option value="mecánico"className="dark:text-gray-950">Mecánico</option>
            <option value="mensajero"className="dark:text-gray-950">Mensajero</option>
          </select>

          {errors.tipo && touched.tipo && (
            <span className="text-red-500 text-xs ">
              {errors.tipo}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-gray-600 text-xs dark:text-gray-200">Email</label>
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
          <span className="text-red-500 text-xs">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex justify-center mt-4">
      <button
            type="submit"
            disabled={cedulaExists}
            className={`px-6 py-2 rounded-lg font-semibold text-white transition transform duration-200
              shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              ${
                cedulaExists
                  ? "bg-blue-300 cursor-not-allowed opacity-60"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
              }
            `}
          >
            Registrar
          </button>

      </div>
    </form>
  );
}