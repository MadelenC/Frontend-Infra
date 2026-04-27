import React, { useState, useEffect } from "react";
import { useDestinoStore } from "../../../zustand/useDestinationsStore";

export default function EditDestForm({ destino, onClose }) {
  const editDestino = useDestinoStore((state) => state.editDestino);

  const [formData, setFormData] = useState({
    departamentoInicio: "",
    origen: "",
    ruta: "",
    destino: "",
    departamentoFinal: "",
    distancia: "",
    tiempo: "",
  });

  useEffect(() => {
    if (!destino) return;
    setFormData({
      departamentoInicio: destino.departamentoInicio || "",
      origen: destino.origen || "",
      ruta: destino.ruta || "",
      destino: destino.destino || "",
      departamentoFinal: destino.departamentoFinal || "",
      distancia: destino.distancia || "",
      tiempo: destino.tiempo || "",
    });
  }, [destino]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await editDestino(destino.id, formData);
    if (result.ok) {
      onClose();
    } else {
      alert("Error al actualizar destino: " + result.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-auto bg-black/30 p-6 bg-black/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative mt-16 mb-16 bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[45vh] overflow-y-auto p-6 sm:p-8 dark:bg-gray-900 "
          >
            {/* Botón cerrar */}
            <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center dark:text-gray-200">Editar Destino</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1 dark:text-gray-300">Departamento Inicio</label>
            <input
              name="departamentoInicio"
              value={formData.departamentoInicio}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1 dark:text-gray-300">Origen</label>
            <input
              name="origen"
              value={formData.origen}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col sm:col-span-2">
            <label className="font-semibold text-sm mb-1 dark:text-gray-300">Ruta</label>
            <input
              name="ruta"
              value={formData.ruta}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1 dark:text-gray-300">Destino</label>
            <input
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1 dark:text-gray-300 ">Departamento Final</label>
            <input
              name="departamentoFinal"
              value={formData.departamentoFinal}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1 dark:text-gray-300">Distancia</label>
            <input
              name="distancia"
              value={formData.distancia}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-sm mb-1 dark:text-gray-300">Tiempo</label>
            <input
              name="tiempo"
              value={formData.tiempo}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-500"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}



