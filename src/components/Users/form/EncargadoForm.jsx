import React, { useState, useEffect, useRef } from "react";
import { useEntidadStore } from "../../../zustand/useEntidadStore";

export default function EncargadoForm({ onSubmit, onClose }) {
  const { entidades, fetchEntidades, loading } = useEntidadStore();

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    cedula: "",
    celular: "",
    password: "",
    cargo: "",
    tipo: "Encargado", // fijo para este formulario
  });

  const [userEntities, setUserEntities] = useState({
    facultades: [],
    carreras: [],
    materias: [],
    siglas: [],
  });

  // Cargar entidades cuando monte el formulario
  useEffect(() => {
    if (entidades.length === 0) fetchEntidades();
  }, [entidades.length, fetchEntidades]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getUniqueOptions = (field) =>
    entidades.length > 0
      ? [...new Set(entidades.map(e => e[field]).filter(Boolean))]
      : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, entidades: userEntities });
  };

  if (loading && entidades.length === 0) {
    return (
      <div className="fixed inset-0 top-11 bg-black bg-opacity-30 flex justify-center items-center p-12 z-50 max-h-[100vh]">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p>Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-11 bg-black bg-opacity-30 flex justify-center items-start overflow-auto p-12 z-50 max-h-[100vh]">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-lg shadow-md p-12 max-w-xl w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
        >
          X
        </button>

        <h1 className="text-lg font-bold mb-4 text-center">Registrar Encargado</h1>

        {/* Campos principalesssss */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Nombre</label>
            <input
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ingrese nombre"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Apellido</label>
            <input
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ingrese apellido"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ingrese email"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Cédula</label>
            <input
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ingrese cédula"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Celular</label>
            <input
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ingrese celular"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ingrese password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-semibold text-gray-700">Cargo</label>
            <input
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ingrese cargo"
            />
          </div>
        </div>

        {/* MultiSelects para entidadesss */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <MultiSelect
            label="Facultad"
            options={getUniqueOptions("facultad")}
            value={userEntities.facultades}
            onChange={(v) => setUserEntities(prev => ({ ...prev, facultades: v }))}
            chipColor="bg-indigo-100 text-indigo-600"
          />

          <MultiSelect
            label="Carrera"
            options={getUniqueOptions("carrera")}
            value={userEntities.carreras}
            onChange={(v) => setUserEntities(prev => ({ ...prev, carreras: v }))}
            chipColor="bg-emerald-100 text-emerald-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <MultiSelect
            label="Materia"
            options={getUniqueOptions("materia")}
            value={userEntities.materias}
            onChange={(v) => setUserEntities(prev => ({ ...prev, materias: v }))}
            chipColor="bg-amber-100 text-amber-700"
          />

          <MultiSelect
            label="Sigla"
            options={getUniqueOptions("sigla")}
            value={userEntities.siglas}
            onChange={(v) => setUserEntities(prev => ({ ...prev, siglas: v }))}
            chipColor="bg-sky-100 text-sky-700"
          />
        </div>

        <div className="flex justify-end mt-4 pt-2 border-t">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

// MultiSelect con chips y dropdown que se cierra al click outside
const MultiSelect = ({ label, options, value, onChange, chipColor }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="flex flex-col relative" ref={ref}>
      <label className="text-xs font-semibold text-gray-900">{label}</label>
      <div
        className="border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        {value.length > 0 ? value.join(", ") : `Seleccione ${label.toLowerCase()}`}
      </div>

      {open && (
        <ul className="absolute z-20 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option, i) => (
              <li
                key={i}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                {option} {value.includes(option) && "✓"}
              </li>
            ))
          ) : (
            <li className="px-2 py-1 text-gray-400">No hay opciones disponibles</li>
          )}
        </ul>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {value.map((item, i) => (
            <span key={i} className={`${chipColor} px-2 py-0.5 rounded-full text-xs`}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};




