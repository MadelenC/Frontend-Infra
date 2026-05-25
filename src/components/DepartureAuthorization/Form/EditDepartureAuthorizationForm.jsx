import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditDepartureAuthorizationForm({
  isOpen,
  onClose,
  onSave,
  choferes = [],
  vehiculos = [],
  initialData,
}) {
  const [formData, setFormData] = useState({
    chofer: "",
    movilidad: "",
    lugar: "",
    motivo: "",
    responsable: "",
    horaSalida: "",
    horaLlegada: "",
  });

  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (!isOpen || !initialData) return;

    setFormData({
      chofer: initialData.chofer?.id || initialData.chofer || "",
      movilidad: initialData.vehiculo?.id || initialData.vehiculo || "",
      lugar: initialData.lugar || "",
      motivo: initialData.motivo || "",
      responsable: initialData.responsable || "",
      horaSalida: initialData.hsalida || "",
      horaLlegada: initialData.hllegada || "",
    });
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      chofer: formData.chofer,
      vehiculo: formData.movilidad,
      lugar: formData.lugar,
      motivo: formData.motivo,
      responsable: formData.responsable,
      hsalida: formData.horaSalida,
      hllegada: formData.horaLlegada,
    };

    setSaving(true);
    const response = await onSave(payload);
    setSaving(false);

    if (!response?.ok) {
      toast.error(response?.error || "Error al actualizar");
    } else {
      toast.success("Autorización actualizada correctamente");

      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-5 bg-black/40 backdrop-blur-sm">
      
      
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl relative h-[90vh] flex flex-col dark:bg-gray-800">

    
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6 dark:text-gray-300">
          Editar Autorización de Salida
        </h2>

        
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

         
            <div>
              <label className="block mb-1 font-semibold dark:text-gray-300">Chofer</label>
              <select
                name="chofer"
                value={formData.chofer}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md dark:bg-gray-300"
              >
                <option value="">Seleccione chofer</option>
                {choferes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombres} {c.apellidos}
                  </option>
                ))}
              </select>
            </div>

      
            <div>
              <label className="block mb-1 font-semibold dark:text-gray-300">Movilidad</label>
              <select
                name="movilidad"
                value={formData.movilidad}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md dark:bg-gray-300"
              >
                <option value="">Seleccione vehículo</option>
                {vehiculos.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.tipog} - {v.placa}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold dark:text-gray-300">Lugar</label>
              <input
                type="text"
                name="lugar"
                value={formData.lugar}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md dark:bg-gray-300"
              />
            </div>

      
            <div>
              <label className="block mb-1 font-semibold dark:text-gray-300">Motivo</label>
              <input
                type="text"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

          
            <div>
              <label className="block mb-1 font-semibold dark:text-gray-300">Responsable</label>
              <input
                type="text"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md dark:bg-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold dark:text-gray-300">Hora de Salida</label>
                <input
                  type="time"
                  name="horaSalida"
                  value={formData.horaSalida}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md dark:bg-gray-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold dark:text-gray-300">Hora de Llegada</label>
                <input
                  type="time"
                  name="horaLlegada"
                  value={formData.horaLlegada}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md dark:bg-gray-300"
                />
              </div>
            </div>

               
        <div className="flex justify-end gap-3 p-4 border-t ">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-2 rounded-md"
          >
            Eliminar
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-blue-700 text-white px-5 py-2 rounded-md"
          >
            Actualizar
          </button>
        </div>
          </form>
        </div>
      </div>
    </div>
  );
}