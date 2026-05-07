import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

export default function EditTripsForm({ initialData, isOpen, onClose, onSave, choferes, encargados, vehiculos, destinos }) {
  const [formData, setFormData] = useState({
    destinos: [{ nombre: "", km: "" }],
    kmAdicional: "",
    tipoViaje: "",
    pasajeros: "",
    inicio: "",
    final: "",
    chofer: [],
    vehiculo: [],
    encargado: [],
    entidad: "",
    dias: "",
    objetivo: "",
  });
  

  const [errors, setErrors] = useState({});
  const [showAllDestinos, setShowAllDestinos] = useState([]);

 useEffect(() => {
  if (initialData && destinos?.length) {

    const formatLocalDateTime = (d) => {
      if (!d) return "";
      const date = new Date(d);
      const pad = (n) => n.toString().padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    // ✅ 1. PRIMERO DECLARA ruta
    const ruta = initialData.rutas?.[0] || {};

    // ✅ 2. DESPUÉS usa ruta en el map
    const destinosFormateados = initialData.destinos?.length
      ? initialData.destinos.map((d, index) => {

          const destinoCompleto = destinos.find(x => x.id === d.id);

          let km = "";

          if (index === 0) km = ruta?.kilome || "";
          if (index === 1) km = ruta?.k1 || "";
          if (index === 2) km = ruta?.k2 || "";
          if (index === 3) km = ruta?.k3 || "";
          if (index === 4) km = ruta?.k4 || "";
          if (index === 5) km = ruta?.k5 || "";

          return {
            id: d.id,
            nombre: destinoCompleto
              ? `(${destinoCompleto.departamentoInicio}) ${destinoCompleto.origen} → (${destinoCompleto.departamentoFinal}) ${destinoCompleto.destino}`
              : "Destino no encontrado",
            km
          };
        })
      : [{ nombre: "", km: "" }];

    setFormData({
      destinos: destinosFormateados,
      kmAdicional: ruta.adicional ?? "",
      tipoViaje: initialData.tipoViaje || "",
      pasajeros: initialData.pasajeros || "",
      inicio: formatLocalDateTime(initialData.fecha_inicial),
      final: formatLocalDateTime(initialData.fecha_final),
      chofer: initialData.chofer?.map(c => ({
        value: c.id,
        label: `${c.nombres} ${c.apellidos}`
      })) || [],
      vehiculo: initialData.vehiculo?.map(v => ({
        value: v.id,
        label: `${v.tipog} ${v.placa}`
      })) || [],
      encargado: initialData.encargado?.map(u => ({
        value: u.id,
        label: `${u.nombres} ${u.apellidos}`
      })) || [],
      entidad: initialData.entidad || "",
      dias: initialData.dias || "",
      objetivo: initialData.objetivo || "",
    });
  }
}, [initialData, destinos]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));

    
    if (errors[name]) {
      setErrors((errs) => ({ ...errs, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let message = "";

    if ((name === "entidad" || name === "objetivo") && !value.trim()) {
      message = name === "entidad" ? "Seleccione una Entidad" : "Inserte el objetivo del viaje";
    }
    if (name === "dias" && (!value || value.trim() === "")) {
      message = "Inserte los días";
    }
    if (name === "tipoViaje" && !value.trim()) {
      message = "Seleccione el tipo de viaje";
    }
    if (name === "pasajeros" && (!value || Number(value) <= 0)) {
      message = "Ingrese número válido de pasajeros";
    }
    if ((name === "inicio" || name === "final") && !value) {
      message = name === "inicio" ? "Seleccione la fecha de inicio" : "Seleccione la fecha de fin";
    }

    setErrors((errs) => ({ ...errs, [name]: message }));
  };

  const handleMultiSelectChange = (field, selectedOptions) => {
    setFormData((f) => ({
      ...f,
      [field]: selectedOptions || [],
    }));

    if (errors[field]) {
      setErrors((errs) => ({ ...errs, [field]: "" }));
    }
  };

  const handleDestinoChange = (index, value) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index].nombre = value;
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));

    if (errors.destinos) {
      setErrors((errs) => ({ ...errs, destinos: "" }));
    }
  };

  const seleccionarDestino = (index, dest) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index] = {
       id: dest.id,
      nombre: `(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`,
      km: dest.distancia || "",
    };
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));
    setShowAllDestinos((prev) => {
      const newShowAll = [...prev];
      newShowAll[index] = false;
      return newShowAll;
    });

    if (errors.destinos) {
      setErrors((errs) => ({ ...errs, destinos: "" }));
    }
  };

  const agregarDestino = () => setFormData((f) => ({ ...f, destinos: [...f.destinos, { nombre: "", km: "" }] }));
  const eliminarDestino = (index) => {
    const nuevosDestinos = formData.destinos.filter((_, i) => i !== index);
    setFormData((f) => ({ ...f, destinos: nuevosDestinos.length ? nuevosDestinos : [{ nombre: "", km: "" }] }));

    if (errors.destinos) {
      setErrors((errs) => ({ ...errs, destinos: "" }));
    }
  };

  const calcularTotalKm = () => {
    let total = Number(formData.kmAdicional || 0);
    formData.destinos.forEach((d) => { total += Number(d.km || 0); });
    return total;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.entidad.trim()) newErrors.entidad = "Seleccione una Entidad";
    if (!formData.dias || formData.dias.trim() === "") newErrors.dias = "Inserte los días";
    if (!formData.objetivo.trim()) newErrors.objetivo = "Inserte el objetivo del viaje";
    if (!formData.tipoViaje.trim()) newErrors.tipoViaje = "Seleccione el tipo de viaje";
    if (!formData.pasajeros || Number(formData.pasajeros) <= 0) newErrors.pasajeros = "Ingrese número válido de pasajeros";
    if (!formData.inicio) newErrors.inicio = "Seleccione la fecha de inicio";
    if (!formData.final) newErrors.final = "Seleccione la fecha de fin";

    if (!formData.chofer.length) newErrors.chofer = "Seleccione al menos un chofer";
    if (!formData.vehiculo.length) newErrors.vehiculo = "Seleccione al menos un vehículo";
    if (!formData.encargado.length) newErrors.encargado = "Seleccione al menos un encargado";

    if (!formData.destinos.some(d => d.nombre.trim() !== "")) {
      newErrors.destinos = "Agregue al menos un destino válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) {
    toast.error("Por favor complete los campos obligatorios en rojo.");
    return;
  }

  const dataToSend = {
    tipo: formData.tipoViaje,
    entidad: formData.entidad,
    objetivo: formData.objetivo,
    dias: formData.dias,
    pasajeros: Number(formData.pasajeros),
    fecha_inicial: formData.inicio,
    fecha_final: formData.final,

    kmAdicional: formData.kmAdicional,
    kmTotal: calcularTotalKm(),

    destinos: formData.destinos.map(d => ({
      id: d.id,
      km: d.km
    })),
   

    vehiculos: formData.vehiculo.map(v => ({
      id: v.value
    })),

    usuarios: [
      ...formData.chofer.map(c => ({ id: c.value })),
      ...formData.encargado.map(u => ({ id: u.value }))
    ]
  };

  try {
    await onSave(dataToSend);
    toast.success("Viaje actualizado correctamente!");
    onClose();
  } catch (error) {
    toast.error("Error al actualizar el viaje");
    console.error(error);
  }
};

  const choferOptions = choferes?.map(c => ({ value: c.id, label: `${c.nombres} ${c.apellidos}` })) || [];
  const vehiculoOptions = vehiculos?.map(v => ({ value: v.id, label: `${v.tipog} ${v.placa}` })) || [];
  const encargadoOptions = encargados?.map(u => ({ value: u.id, label: `${u.nombres} ${u.apellidos}` })) || [];

  return (
    <>
      
      <div className="fixed inset-0  flex justify-center items-center z-50 p-5 bg-black/40 backdrop-blur-sm">
        <div className="bg-gray-50 w-full max-w-4xl max-h-[80vh] p-6 rounded-xl shadow-2xl text-gray-800 overflow-hidden flex flex-col relative dark:bg-gray-800">
          <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-gray-900 flex-shrink-0 dark:text-gray-200 text-center">
            Editar Viaje
          </h2>

          <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow pr-3 space-y-6">

            <div className="bg-white p-4 rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-md font-semibold mb-3 text-gray-900 border-b pb-1 dark:text-gray-300">Destinos</h3>
              {formData.destinos.map((d, i) => {
                const filteredDestinos = destinos?.filter(dest =>
                  d.nombre
                    ? dest.origen.toLowerCase().includes(d.nombre.toLowerCase()) || dest.destino.toLowerCase().includes(d.nombre.toLowerCase())
                    : true
                );

                return (
                  <div key={i} className="flex gap-2 items-start mb-2 relative">
                   <Select
                      options={destinos?.map(dest => ({
                        value: dest,
                        label: `(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`
                      }))}
                      value={d.id? {value: destinos.find(x => x.id === d.id),label: d.nombre}: null }
                      onChange={(selected) => {const dest = selected.value;const nuevos = [...formData.destinos];
                        nuevos[i] = {
                          id: dest.id,
                          nombre: selected.label,
                          km: dest.distancia || "",
                        };

                        setFormData(f => ({ ...f, destinos: nuevos }));
                      }}
                      placeholder="Buscar destino..."
                      styles={{
                              control: (base) => ({
                                ...base,
                                backgroundColor: document.documentElement.classList.contains("dark")
                                  ? "rgba(229, 231, 235, 0.4)" 
                                  : "white",

                                borderColor: document.documentElement.classList.contains("dark")
                                  ? "#e5e7eb" 
                                  : "#d1d5db",

                                fontSize: "0.875rem",
                                boxShadow: "none",
                              }),

                              menu: (base) => ({
                                ...base,
                                zIndex: 50,
                              }),

                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                  ? document.documentElement.classList.contains("dark")
                                    ? "#374151"
                                    : "#dbeafe"
                                  : document.documentElement.classList.contains("dark")
                                  ? "#1f2937"
                                  : "white",

                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),

                              singleValue: (base) => ({
                                ...base,
                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),
                            }}
                      
                    />

                    {(showAllDestinos[i] || d.nombre) && filteredDestinos?.length > 0 && (
                      <ul className="absolute top-10 left-0 right-0 max-h-60 overflow-y-auto bg-white border rounded-md z-50 text-sm">
                        {filteredDestinos.map((dest) => (
                          <li
                            key={dest.id}
                            className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                            onClick={() => seleccionarDestino(i, dest)}
                          >
                            {`(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`}
                          </li>
                        ))}
                      </ul>
                    )}

                    <input
                      type="number"
                      placeholder="Km."
                      value={d.km}
                      onChange={(e) => {
                        const nuevos = [...formData.destinos];
                        nuevos[i].km = e.target.value;
                        setFormData(f => ({ ...f, destinos: nuevos }));
                      }}
                      className="w-20 border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
                    />

                    {formData.destinos.length > 1 && (
                      <button type="button" onClick={() => eliminarDestino(i)} className="text-red-500 font-bold text-lg">×</button>
                    )}
                  </div>
                );
              })}
              <button type="button" onClick={agregarDestino} className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 
                    bg-blue-600 hover:bg-blue-700 text-white 
                    dark:bg-blue-500 dark:hover:bg-blue-600
                    text-sm font-semibold rounded-md shadow-sm 
                    transition cursor-pointer">+ Agregar destino</button>
              <div className="flex gap-2 mt-4 items-center">
                <input
                  type="number"
                  name="kmAdicional"
                  placeholder="Km adicional"
                  value={formData.kmAdicional}
                  onChange={handleChange}
                  className="w-36 border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
                />
                <input
                  type="text"
                  value={calcularTotalKm()}
                  readOnly
                  className="w-28 border px-3 py-1.5 rounded bg-gray-100 font-semibold text-sm dark:bg-gray-200/40 dark:border-gray-200"
                />
              </div>
            </div>

            {/* Información general */}
            <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-4 dark:bg-gray-800 dark:border-gray-700">
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Tipo de viaje</label>
                <select
                  name="tipoViaje"
                  value={formData.tipoViaje}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${errors.tipoViaje ? "border-red-600" : ""}`}
                  >
                  <option value="">Seleccione</option>
                  <option>Viaje de Práctica</option>
                  <option>Viaje de Inspección</option>
                  <option>Viaje Académico</option>
                  <option>Viaje de Cultura</option>
                </select>
                {errors.tipoViaje && <p className="text-red-600 text-xs mt-1">{errors.tipoViaje}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Número de pasajeros</label>
                <input
                  type="number"
                  name="pasajeros"
                  value={formData.pasajeros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${errors.pasajeros ? "border-red-600" : ""}`}
                  min={1}
                />
                {errors.pasajeros && <p className="text-red-600 text-xs mt-1">{errors.pasajeros}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Fecha de inicio</label>
                <input
                  type="datetime-local"
                  name="inicio"
                  value={formData.inicio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${errors.inicio ? "border-red-600" : ""}`}
                />
                {errors.inicio && <p className="text-red-600 text-xs mt-1">{errors.inicio}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold">Fecha de fin</label>
                <input
                  type="datetime-local"
                  name="final"
                  value={formData.final}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${errors.final ? "border-red-600" : ""}`}
                />
                {errors.final && <p className="text-red-600 text-xs mt-1">{errors.final}</p>}
              </div>
            </div>

            {/* Choferes, Vehículos y Encargados */}
            <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-3 gap-4 dark:bg-gray-800 dark:border-gray-700 ">
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Choferes</label>
                <Select
                  isMulti
                  name="chofer"
                  options={choferOptions}
                  value={formData.chofer}
                  onChange={(selected) => handleMultiSelectChange("chofer", selected)}
                  classNamePrefix="react-select"
                  placeholder="Seleccione choferes"
                  className={errors.chofer ? "react-select-container border-red-600 rounded dark:bg-gray-200/40 dark:border-gray-200" : "react-select-container"}
                  styles={{
                              control: (base) => ({
                                ...base,
                                backgroundColor: document.documentElement.classList.contains("dark")
                                  ? "rgba(229, 231, 235, 0.4)" 
                                  : "white",

                                borderColor: document.documentElement.classList.contains("dark")
                                  ? "#e5e7eb" 
                                  : "#d1d5db",

                                fontSize: "0.875rem",
                                boxShadow: "none",
                              }),

                              menu: (base) => ({
                                ...base,
                                zIndex: 50,
                              }),

                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                  ? document.documentElement.classList.contains("dark")
                                    ? "#374151"
                                    : "#dbeafe"
                                  : document.documentElement.classList.contains("dark")
                                  ? "#1f2937"
                                  : "white",

                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),

                              singleValue: (base) => ({
                                ...base,
                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),
                               placeholder: (base) => ({
                                ...base,
                                color: document.documentElement.classList.contains("dark")
                                  ? "#9ca3af" 
                                  : "#6b7280", 
                                fontSize: "0.875rem",
                              }),
                            }}
                />
                {errors.chofer && <p className="text-red-600 text-xs mt-1">{errors.chofer}</p>}
              </div>

              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Vehículos</label>
                <Select
                  isMulti
                  name="vehiculo"
                  options={vehiculoOptions}
                  value={formData.vehiculo}
                  onChange={(selected) => handleMultiSelectChange("vehiculo", selected)}
                  classNamePrefix="react-select"
                  placeholder="Seleccione vehículos"
                  className={errors.vehiculo ? "react-select-container border-red-600 rounded-md" : "react-select-container"}
                  styles={{
                              control: (base) => ({
                                ...base,
                                backgroundColor: document.documentElement.classList.contains("dark")
                                  ? "rgba(229, 231, 235, 0.4)" 
                                  : "white",

                                borderColor: document.documentElement.classList.contains("dark")
                                  ? "#e5e7eb" 
                                  : "#d1d5db",

                                fontSize: "0.875rem",
                                boxShadow: "none",
                              }),

                              menu: (base) => ({
                                ...base,
                                zIndex: 50,
                              }),

                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                  ? document.documentElement.classList.contains("dark")
                                    ? "#374151"
                                    : "#dbeafe"
                                  : document.documentElement.classList.contains("dark")
                                  ? "#1f2937"
                                  : "white",

                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),

                              singleValue: (base) => ({
                                ...base,
                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),
                               placeholder: (base) => ({
                                  ...base,
                                  color: document.documentElement.classList.contains("dark")
                                    ? "#9ca3af" 
                                    : "#6b7280", 
                                  fontSize: "0.875rem",
                                }),
                            }}
                />
                {errors.vehiculo && <p className="text-red-600 text-xs mt-1">{errors.vehiculo}</p>}
              </div>

              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Encargados</label>
                <Select
                  isMulti
                  name="encargado"
                  options={encargadoOptions}
                  value={formData.encargado}
                  onChange={(selected) => handleMultiSelectChange("encargado", selected)}
                  classNamePrefix="react-select"
                  placeholder="Seleccione encargados"
                  className={errors.encargado ? "react-select-container border-red-600 rounded-md" : "react-select-container"}
                  styles={{
                              control: (base) => ({
                                ...base,
                                backgroundColor: document.documentElement.classList.contains("dark")
                                  ? "rgba(229, 231, 235, 0.4)" 
                                  : "white",

                                borderColor: document.documentElement.classList.contains("dark")
                                  ? "#e5e7eb" 
                                  : "#d1d5db",

                                fontSize: "0.875rem",
                                boxShadow: "none",
                              }),

                              menu: (base) => ({
                                ...base,
                                zIndex: 50,
                              }),

                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused
                                  ? document.documentElement.classList.contains("dark")
                                    ? "#374151"
                                    : "#dbeafe"
                                  : document.documentElement.classList.contains("dark")
                                  ? "#1f2937"
                                  : "white",

                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),

                              singleValue: (base) => ({
                                ...base,
                                color: document.documentElement.classList.contains("dark")
                                  ? "white"
                                  : "black",
                              }),
                               placeholder: (base) => ({
                                    ...base,
                                    color: document.documentElement.classList.contains("dark")
                                      ? "#9ca3af" 
                                      : "#6b7280", 
                                    fontSize: "0.875rem",
                                  }),
                            }}
                />
                {errors.encargado && <p className="text-red-600 text-xs mt-1">{errors.encargado}</p>}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3 dark:bg-gray-800 dark:border-gray-700">
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Entidad</label>
                <input
                  type="text"
                  name="entidad"
                  value={formData.entidad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${errors.entidad ? "border-red-600" : ""}`}
                />
                {errors.entidad && <p className="text-red-600 text-xs mt-1">{errors.entidad}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Días</label>
                <input
                  type="text"
                  name="dias"
                  value={formData.dias || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border px-3 py-1.5 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200${errors.dias ? "border-red-600" : ""}`}
                />
                {errors.dias && <p className="text-red-600 text-xs mt-1">{errors.dias}</p>}
              </div>
              <div>
                <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Objetivo</label>
                <textarea
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                  className={`w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${errors.objetivo ? "border-red-600" : ""}`}
                />
                {errors.objetivo && <p className="text-red-600 text-xs mt-1">{errors.objetivo}</p>}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-3 border-t">
              <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-1.5 rounded-md text-sm">
                Cancelar
              </button>
              <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-1.5 rounded-md text-sm">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
} 