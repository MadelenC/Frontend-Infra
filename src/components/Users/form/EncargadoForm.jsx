import React, { useState, useEffect, useRef } from "react";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import { useAuthStore } from "../../../zustand/AuthUsers";
import { useUserStore } from "../../../zustand/userStore";

export default function EncargadoForm({ onSubmit, onClose }) {
  const { entidades, fetchEntidades, loading } = useEntidadStore();
  const { user } = useAuthStore();
  const { users } = useUserStore();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    cedula: "",
    celular: "",
    password: "",
    tipo: "encargado",
  });

  const [userEntities, setUserEntities] = useState({
    facultades: [],
    carreras: [],
    materias: [],
    siglas: [],
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (entidades.length === 0) fetchEntidades();
  }, [entidades.length, fetchEntidades]);

  const validateField = (name, value) => {
    let error = "";

    if (name === "nombres") {
      if (!value.trim()) error = "Nombre obligatorio";
      else if (value.trim().length < 3) error = "Mínimo 3 caracteres";
    }

    if (name === "apellidos") {
      if (!value.trim()) error = "Apellido obligatorio";
      else if (value.trim().length < 3) error = "Mínimo 3 caracteres";
    }

    if (name === "cedula") {
      if (!value.trim()) error = "Cédula obligatoria";
      else if (value.length < 5) error = "Cédula inválida";
      
    }

    if (name === "celular") {
      if (!value.trim()) error = "Celular obligatorio";
      else if (value.length < 7) error = "Mínimo 7 dígitos";
    }

    if (name === "password") {
      if (!value.trim()) error = "Password obligatorio";
      else if (value.length < 6) error = "Mínimo 6 caracteres";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) error = "Email inválido";
    }

    return error;
  };

  // MAYUSCULA AUTOMATICA
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "celular") {
      value = value.replace(/[^0-9]/g, "");
    }

    if (name === "nombres" || name === "apellidos") {
      value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      value = toTitleCase(value);
    }

    if (name === "cedula") {
      value = value.replace(/[^a-zA-Z0-9\-]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = async (e) => {
  const { name, value } = e.target;

  setTouched((prev) => ({ ...prev, [name]: true }));

  const error = validateField(name, value);

  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));


  if (name === "cedula" && value.trim()) {
    const exists = users?.some(
      (u) => String(u?.cedula || "").trim() === value.trim()
    );

    setErrors((prev) => ({
      ...prev,
      cedula: exists ? "La cédula ya está registrada" : "",
    }));
  }
};

  
  // VALIDACION GENERAL
  const validate = () => {
    const err = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) err[field] = error;
    });

    if (userEntities.facultades.length === 0)
      err.facultades = "Seleccione facultad";

    if (userEntities.carreras.length === 0)
      err.carreras = "Seleccione carrera";

    if (userEntities.materias.length === 0)
      err.materias = "Seleccione materia";

    if (userEntities.siglas.length === 0)
      err.siglas = "Seleccione sigla";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) return;

    onSubmit({
      ...formData,
      nombres: formData.nombres.trim(),
      apellidos: formData.apellidos.trim(),
      cedula: formData.cedula.trim(),
      celular: formData.celular.trim(),
      email: formData.email.trim(),
      entidades: userEntities,
      insertador:
        `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() ||
        "DESCONOCIDO",
    });
  };

  const getUniqueOptions = (field) => {
    if (!Array.isArray(entidades)) return [];

    return [
      ...new Set(
        entidades.map((e) => e?.[field]).filter(Boolean)
      ),
    ];
  };

  if (loading && entidades.length === 0) {
    return <p className="p-4 text-center">Cargando datos...</p>;
  }

  const inputStyle =
    "p-2 border border-gray-300 rounded-md w-full text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 dark:bg-gray-200/40";

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <h3 className="text-center font-semibold text-gray-600 dark:text-gray-200">
        Registro Encargado
      </h3>

    
      <div className="grid grid-cols-2 gap-3 dark:text-gray-200">
        {["nombres", "apellidos", "cedula", "celular", "password", "email"].map(
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
                className={`${inputStyle} ${
                  (errors[field] && touched[field]) ||
                  (field === "cedula" && errors.cedula)
                    ? "border-red-500 "
                    : ""
                }`}
                placeholder={`Ingrese ${field}`}
              />

              {errors[field] && touched[field] && (
                <span className="text-red-500 text-xs">
                  {errors[field]}
                </span>
              )}

              {field === "cedula" && errors.cedula && (
                <span className="text-red-500 text-xs">
                  La cédula ya está registrada
                </span>
              )}
            </div>
          )
        )}
      </div>

  
   <div className="grid grid-cols-2 gap-4 mt-2">
  <AutocompleteMultiSelect
    label="Facultad"
    options={getUniqueOptions("facultad")}
    value={userEntities.facultades}
    onChange={(v) =>
      setUserEntities((p) => ({ ...p, facultades: v }))
    }
    error={errors.facultades}
    filterOptions={true}
  />

  <AutocompleteMultiSelect
    label="Carrera"
    options={getUniqueOptions("carrera")}
    value={userEntities.carreras}
    onChange={(v) =>
      setUserEntities((p) => ({ ...p, carreras: v }))
    }
    error={errors.carreras}
    filterOptions={true}
  />
</div>

<div className="grid grid-cols-2 gap-4 mt-2">
  <AutocompleteMultiSelect
    label="Materia"
    options={getUniqueOptions("materia")}
    value={userEntities.materias}
    onChange={(v) =>
      setUserEntities((p) => ({ ...p, materias: v }))
    }
    error={errors.materias}
    filterOptions={true}
  />

  <AutocompleteMultiSelect
    label="Sigla"
    options={[]}
    value={userEntities.siglas}
    onChange={(v) =>
      setUserEntities((p) => ({ ...p, siglas: v }))
    }
    error={errors.siglas}
    filterOptions={false}
  />
</div>

    
      <div className="flex justify-center mt-4 gap-3">
  <button
    type="submit"
    disabled={errors.cedula}
    className={`px-6 py-2 rounded-lg font-semibold text-white transition transform duration-200
      shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
      ${
        errors.cedula
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

const AutocompleteMultiSelect = ({
  label,
  options,
  value,
  onChange,
  error,
  filterOptions = true,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {

   
        if (inputValue.trim()) {
          addValue(inputValue);
        }

        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, [inputValue]);

  const addValue = (val) => {
    const trimmed = val.trim();

    if (!trimmed) return;

    if (!value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }

    setInputValue("");
    setOpen(false);
  };

  const removeValue = (val) => {
    onChange(value.filter((v) => v !== val));
  };

  const filteredOptions = filterOptions
    ? options.filter((opt) =>
        String(opt)
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
    : [];

  return (
    <div
      className="flex flex-col relative gap-1 space-y-0.5"
      ref={ref}
    >
      <label className="text-xs font-medium text-gray-600 dark:text-gray-300">
        {label}
      </label>

      <div
        onClick={() => setOpen(true)}
        className={`flex flex-wrap items-center gap-1 px-2 py-1.5 rounded-md border text-sm transition
        ${
          error
            ? "border-red-500 bg-red-50 dark:bg-red-900/30"
            : "border-gray-300 bg-white hover:border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
      >
        {value.map((v, i) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
            bg-indigo-100 text-indigo-700
            dark:bg-indigo-500/20 dark:text-indigo-300"
          >
            {v}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeValue(v);
              }}
              className="hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}

        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            if (inputValue.trim()) {
              addValue(inputValue);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue(inputValue);
            }
          }}
          className="flex-1 min-w-[80px] outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 text-sm"
          placeholder={
            value.length === 0
              ? label === "Sigla"
                ? "Ej: TUR-110"
                : "Escriba o seleccione..."
              : ""
          }
        />
      </div>

      {open && filteredOptions.length > 0 && (
        <ul
          className="absolute top-full mt-1 w-full rounded-md shadow-lg z-20 max-h-52 overflow-auto text-sm
          bg-white border border-gray-300
          dark:bg-gray-800 dark:border-gray-600"
        >
          {filteredOptions.map((opt, i) => (
            <li
              key={i}
              onClick={() => addValue(opt)}
              className="px-3 py-2 cursor-pointer transition
              hover:bg-blue-100 dark:hover:bg-gray-700"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <span className="text-red-500 text-xs mt-1">
          {error}
        </span>
      )}
    </div>
  );
};