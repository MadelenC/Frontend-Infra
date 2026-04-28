import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
export default function ReservaModal({ initialData, isOpen, onClose, onSave, choferes, encargados, vehiculos, destinos }) {
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
    objetivo: "",
  });

  

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      const formatLocalDateTime = (d) => {
        if (!d) return "";
        const date = new Date(d);
        const pad = (n) => n.toString().padStart(2, "0");
        const yyyy = date.getFullYear();
        const mm = pad(date.getMonth() + 1);
        const dd = pad(date.getDate());
        const hh = pad(date.getHours());
        const min = pad(date.getMinutes());
        return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
      };

      setFormData({
        destinos:
          initialData.destinos?.length
            ? initialData.destinos.map((d) => ({ nombre: d.nombre || "", km: d.km || "" }))
            : [{ nombre: "", km: "" }],
        kmAdicional: initialData.kmAdicional || "",
        tipoViaje: initialData.tipoViaje || "",
        pasajeros: initialData.pasajeros || "",
        inicio: formatLocalDateTime(initialData.fecha_inicial),
        final: formatLocalDateTime(initialData.fecha_final),
        chofer: initialData.chofer || [],
        vehiculo: initialData.vehiculo || [],
        encargado: initialData.encargado || [],
        entidad: initialData.entidad || "",
        objetivo: initialData.objetivo || "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (name, selected) => {
  setFormData((f) => ({
    ...f,
    [name]: selected ? selected.map((s) => s.value) : []
  }));
};


  const seleccionarDestino = (index, dest) => {
    const nuevosDestinos = [...formData.destinos];
    nuevosDestinos[index] = {
      nombre: `(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`,
      km: dest.distancia || "",
    };
    setFormData((f) => ({ ...f, destinos: nuevosDestinos }));
    setShowAllDestinos((prev) => {
      const newShowAll = [...prev];
      newShowAll[index] = false;
      return newShowAll;
    });
  };

  const agregarDestino = () => setFormData((f) => ({ ...f, destinos: [...f.destinos, { nombre: "", km: "" }] }));
  const eliminarDestino = (index) => {
    const nuevosDestinos = formData.destinos.filter((_, i) => i !== index);
    setFormData((f) => ({ ...f, destinos: nuevosDestinos.length ? nuevosDestinos : [{ nombre: "", km: "" }] }));
  };

  const calcularTotalKm = () => {
    let total = Number(formData.kmAdicional || 0);
    formData.destinos.forEach((d) => { total += Number(d.km || 0); });
    return total;
  };
  const validateForm = () => {
  const err = {};

  if (!formData.tipoViaje) err.tipoViaje = "Obligatorio";
  if (!formData.pasajeros) err.pasajeros = "Obligatorio";
  if (!formData.inicio) err.inicio = "Obligatorio";
  if (!formData.final) err.final = "Obligatorio";
  if (!formData.entidad) err.entidad = "Obligatorio";
  if (!formData.objetivo) err.objetivo = "Obligatorio";
   if (!formData.chofer.length) err.chofer = "Seleccione chofer";
  if (!formData.vehiculo.length) err.vehiculo = "Seleccione vehículo";
  if (!formData.encargado.length) err.encargado = "Seleccione encargado";

  setErrors(err);

  return Object.keys(err).length === 0;
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("❌ Complete los campos obligatorios");
    return;
  }

  try {
    await onSave(formData);
    toast.success("✅ Reserva guardada correctamente");
    onClose();
  } catch (error) {
    toast.error("⚠️ Error al guardar la reserva");
  }
};

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-5  bg-black/40 backdrop-blur-sm">
      
      <div className="bg-gray-50 w-full max-w-4xl max-h-[80vh] p-6 rounded-xl shadow-2xl text-gray-800 overflow-hidden flex flex-col dark:bg-gray-800 dark:text-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>
        <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-gray-900 flex-shrink-0 dark:text-gray-200 text-center">
          Nuevo Viaje
        </h2>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow pr-3 space-y-6 ">
          

          
          <div className="bg-white p-4 rounded-lg shadow-sm border dark:bg-gray-800">
            
            <h3 className="text-md font-semibold mb-3 text-gray-900 border-b pb-1 dark:text-gray-300">Destinos</h3>
            {formData.destinos.map((d, i) => {
              

              return (
                <div key={i} className="flex gap-2 items-start mb-2 relative ">
                  
                  <Select
                      options={destinos?.map(dest => ({
                        value: dest,
                        label: `(${dest.departamentoInicio}) ${dest.origen} → (${dest.departamentoFinal}) ${dest.destino}`
                      }))}

                      value={
                        d.nombre
                          ? {
                              value: destinos?.find(x =>
                                `(${x.departamentoInicio}) ${x.origen} → (${x.departamentoFinal}) ${x.destino}` === d.nombre
                              ),
                              label: d.nombre
                            }
                          : null
                      }

                      onChange={(selected) => {
                        if (!selected) return;

                        const dest = selected.value;

                        const nuevos = [...formData.destinos];
                        nuevos[i] = {
                          nombre: selected.label,
                          km: dest.distancia || "",
                        };

                        setFormData(f => ({ ...f, destinos: nuevos }));
                      }}

                      placeholder="Buscar destino..."

                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "rgba(229, 231, 235, 0.4)", 
                          borderColor: "#e5e7eb", 
                          fontSize: "0.875rem",
                          minHeight: "36px",
                          boxShadow: "none",
                        }),

                        menu: (base) => ({
                          ...base,
                          zIndex: 50,
                        }),

                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused ? "#dbeafe" : "white",
                          cursor: "pointer",
                        }),
                      }}
                    />
                    

                 

                  <input
                    type="number"
                    placeholder="Km."
                    value={d.km}
                    onChange={(e) => {
                      const nuevos = [...formData.destinos];
                      nuevos[i].km = e.target.value;
                      setFormData(f => ({ ...f, destinos: nuevos }));
                    }}
                    className="w-20 border px-3 py-1.5 rounded-md text-sm dark:bg-gray-200/40 dark:border-gray-200"
                  />
                  

                  {formData.destinos.length > 1 && (
                    <button type="button" onClick={() => eliminarDestino(i)} className="text-red-500 font-bold text-lg">×</button>
                  )}
                </div>
              );
            })}
            <button
                type="button"
                onClick={agregarDestino}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 
                    bg-blue-600 hover:bg-blue-700 text-white 
                    dark:bg-blue-500 dark:hover:bg-blue-600
                    text-sm font-semibold rounded-md shadow-sm 
                    transition cursor-pointer"
              >
                + Agregar destino
              </button>
            <div className="flex gap-2 mt-4 items-center dark:bg-gray-800">
              <input type="number" name="kmAdicional" placeholder="Km adicional" value={formData.kmAdicional} onChange={handleChange} className="w-36 border px-3 py-1.5 rounded-md text-sm dark:bg-gray-200/40 dark:border-gray-200"/>
              <input type="text" value={calcularTotalKm()} readOnly className="w-28 border px-3 py-1.5 rounded-md bg-gray-100 font-semibold text-sm dark:bg-gray-200/40 dark:border-gray-200"/>
            </div>
          </div>

          {/* Información general */}
          <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-2 gap-4 dark:bg-gray-800">
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Tipo de viaje</label>
              <select name="tipoViaje" value={formData.tipoViaje} onChange={handleChange} className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200">
                <option value="">Seleccione</option>
                <option>Viaje de Práctica</option>
                <option>Viaje de Inspección</option>
                <option>Viaje Académico</option>
                <option>Viaje de Cultura</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Número de pasajeros</label>
              <input type="number" name="pasajeros" value={formData.pasajeros} onChange={handleChange} 
              className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
                onBlur={() => {
    if (!formData.pasajeros) {
      setErrors((e) => ({ ...e, pasajeros: "Obligatorio" }));
    }
  }}

              />
              {errors.pasajeros && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pasajeros}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Fecha de inicio</label>
              <input type="datetime-local" name="inicio" value={formData.inicio} onChange={handleChange} 
              className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
                onBlur={() => {
    if (!formData.inicio) {
      setErrors((e) => ({ ...e, inicio: "Obligatorio" }));
    }
  }}

              />
              {errors.inicio && (
  <p className="text-red-500 text-xs mt-1">{errors.inicio}</p>
)}
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Fecha de fin</label>
              <input type="datetime-local" name="final" value={formData.final} onChange={handleChange} 
              className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
                onBlur={() => {
    if (!formData.final) {
      setErrors((e) => ({ ...e, final: "Obligatorio" }));
    }
  }}

              />
{errors.final && (
  <p className="text-red-500 text-xs mt-1">{errors.final}</p>
)}
            </div>
          </div>

          {/* Choferes, Vehículos y Encargados */}
          <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-3 gap-4 dark:bg-gray-800">
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Choferes</label>
              <Select
                      isMulti
                      options={choferes?.map(c => ({
                        value: c.id,
                        label: `${c.nombres} ${c.apellidos}`
                      }))}
                      value={choferes
                        ?.filter(c => formData.chofer.includes(c.id))
                        .map(c => ({
                          value: c.id,
                          label: `${c.nombres} ${c.apellidos}`
                        }))
                      }
                      onChange={(selected) => handleSelectChange("chofer", selected)}
                      placeholder="Choferes"
                    
                      styles={{
                                control: (base, state) => ({
                                  ...base,
                                  backgroundColor: document.documentElement.classList.contains("dark")
                                    ? "rgba(229, 231, 235, 0.4)" // dark:bg-gray-200/40
                                    : "white",

                                  borderColor: document.documentElement.classList.contains("dark")
                                    ? "#e5e7eb" // dark:border-gray-200
                                    : "#d1d5db",

                                  boxShadow: "none",
                                  fontSize: "0.875rem",
                                })
                              }}
                      onBlur={() => {
    if (!formData.chofer.length) {
      setErrors((e) => ({ ...e, chofer: "Obligatorio" }));
    }
  }}

                  />
                  {errors.chofer && (
  <p className="text-red-500 text-xs mt-1">{errors.chofer}</p>
)}
            </div>

            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Vehículos</label>
             <Select
                    isMulti
                    options={vehiculos?.map(v => ({
                      value: v.id,
                      label: `${v.tipog} ${v.placa}`
                    }))}
                    value={vehiculos
                      ?.filter(v => formData.vehiculo.includes(v.id))
                      .map(v => ({
                        value: v.id,
                        label: `${v.tipog} ${v.placa}`
                      }))
                    }
                    onChange={(selected) => handleSelectChange("vehiculo", selected)}
                    styles={{
                            control: (base, state) => ({
                              ...base,
                              backgroundColor: document.documentElement.classList.contains("dark")
                                ? "rgba(229, 231, 235, 0.4)" // dark:bg-gray-200/40
                                : "white",

                              borderColor: document.documentElement.classList.contains("dark")
                                ? "#e5e7eb" // dark:border-gray-200
                                : "#d1d5db",

                              boxShadow: "none",
                              fontSize: "0.875rem",
                            })
                          }}
                                                    onBlur={() => {
            if (!formData.vehiculo.length) {
              setErrors((e) => ({ ...e, vehiculo: "Obligatorio" }));
            }
          }}
                  />
                  {errors.vehiculo && (
  <p className="text-red-500 text-xs mt-1">{errors.vehiculo}</p>
)}
            </div>

            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Encargados</label>
              <Select
                      isMulti
                      options={encargados?.map(u => ({
                        value: u.id,
                        label: `${u.nombres} ${u.apellidos}`
                      }))}
                      value={encargados
                        ?.filter(u => formData.encargado.includes(u.id))
                        .map(u => ({
                          value: u.id,
                          label: `${u.nombres} ${u.apellidos}`
                        }))
                      }
                      onChange={(selected) => handleSelectChange("encargado", selected)}
                      placeholder="Encargados"
                   styles={{
                            control: (base, state) => ({
                              ...base,
                              backgroundColor: document.documentElement.classList.contains("dark")
                                ? "rgba(229, 231, 235, 0.4)" // dark:bg-gray-200/40
                                : "white",

                              borderColor: document.documentElement.classList.contains("dark")
                                ? "#e5e7eb" // dark:border-gray-200
                                : "#d1d5db",

                              boxShadow: "none",
                              fontSize: "0.875rem",
                            })
                          }}
                  />
                  {errors.encargado && (
  <p className="text-red-500 text-xs mt-1">{errors.encargado}</p>
)}
            </div>
          </div>

          {/* Entidad y objetivo */}
          <div className="bg-white p-4 rounded-lg shadow-sm border space-y-3 dark:bg-gray-800">
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Entidad</label>
              <input type="text" name="entidad" value={formData.entidad} onChange={handleChange} className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"/>
            {errors.entidad && (
  <p className="text-red-500 text-xs mt-1">{errors.entidad}</p>
)}
              </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm font-semibold dark:text-gray-300">Objetivo</label>
              <textarea name="objetivo" value={formData.objetivo} onChange={handleChange} rows={3} className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"/>
              {errors.objetivo && (
  <p className="text-red-500 text-xs mt-1">{errors.objetivo}</p>
)}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-1.5 rounded-md text-sm">Cancelar</button>
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-1.5 rounded-md text-sm">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}