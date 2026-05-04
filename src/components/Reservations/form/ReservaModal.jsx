import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";


import SeccionDestinos from "./ReserMod/Secciondestino";
import SeccionUsuarios from "./ReserMod/SeccionUsers";
import SeccionViaje from "./ReserMod/SeccViaj";
import SeccionEntidad from "./ReserMod/SeccionEntidad";

export default function ReservaModal({
  initialData,
  isOpen,
  onClose,
  onSave,
  choferes,
  encargados,
  vehiculos,
  destinos
}) {

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
  const [openDestinoIndex, setOpenDestinoIndex] = useState(null);
  const [searchDestino, setSearchDestino] = useState("");

  useEffect(() => {
    if (!initialData) return;

    const formatLocalDateTime = (d) => {
      if (!d) return "";
      const date = new Date(d);
      const pad = (n) => n.toString().padStart(2, "0");

      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    setFormData({
      destinos: initialData.destinos?.length
        ? initialData.destinos.map(d => ({
            nombre: d.nombre || "",
            km: d.km || ""
          }))
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
  }, [initialData]);

  if (!isOpen) return null;

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSelectChange = (name, selected) => {
    setFormData((f) => ({
      ...f,
      [name]: selected ? selected.map(s => s.value) : []
    }));
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
    <div className="fixed inset-0 flex justify-center items-center z-50 p-5 bg-black/40 backdrop-blur-sm">

      <div className="bg-gray-50 w-full max-w-4xl max-h-[80vh] p-6 rounded-xl shadow-2xl flex flex-col dark:bg-gray-800 dark:text-gray-200 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Nuevo Viaje
        </h2>

      
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-grow space-y-6 pr-3">

          <SeccionDestinos
            formData={formData}
            setFormData={setFormData}
            destinos={destinos}
            openDestinoIndex={openDestinoIndex}
            setOpenDestinoIndex={setOpenDestinoIndex}
            searchDestino={searchDestino}
            setSearchDestino={setSearchDestino}
          />

       

          <SeccionViaje
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
             <SeccionUsuarios
            formData={formData}
            setFormData={setFormData}
            choferes={choferes}
            vehiculos={vehiculos}
            encargados={encargados}
            errors={errors}
            setErrors={setErrors}
            handleSelectChange={handleSelectChange}
          />

          <SeccionEntidad
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />

          
          <div className="flex justify-end gap-3 pt-3 border-t">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>

            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
              Registrar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}