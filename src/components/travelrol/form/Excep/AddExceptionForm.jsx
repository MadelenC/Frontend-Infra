import React, { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

export default function AddExceptionForm({ travel, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    chofer: travel.chofer || "",
    tipoViaje: "",
    lugar: "",
    fecha: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!formData.tipoViaje || !formData.lugar) {
      toast.error("❌ Complete todos los campos");
      return;
    }

    
    const payload = {
      chofer_id: travel.chofer_id,       
      rol_id: travel.id,                
      tipo: formData.tipoViaje,         
      lugar: formData.lugar,
      fecha: formData.fecha.split("T")[0], 
    };

    try {
      const res = await onAdd?.(payload);

      if (res?.ok || res === true) {
        toast.success("✅ Excepción registrada correctamente");
        onClose();
      } else {
        toast.error("❌ No se pudo registrar la excepción");
      }
    } catch (error) {
      toast.error("⚠️ Error inesperado");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative dark:bg-gray-800 dark:text-gray-200">
         
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Insertar Excepción</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Chofer:</label>
            <input
              type="text"
              value={formData.chofer}
              readOnly
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200 dark:text-gray-800"
            />
          </div>
             <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Tipo de Viaje:</label>
          <input
            name="tipoViaje"
            value={formData.tipoViaje}
            onChange={handleChange}
            placeholder="Tipo de viaje"
            className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-800"
          />
           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Lugar:</label>
          <input
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            placeholder="Lugar"
            className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-800"
          />
           <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Fecha:</label>
          <input
            type="datetime-local"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-800"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded dark:bg-gray-700 dark:hover:bg-gray-900">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded dark:bg-gray-500 dark:hover:bg-gray-900">
              Insertar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}