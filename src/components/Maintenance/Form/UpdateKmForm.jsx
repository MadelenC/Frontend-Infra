import React, { useState } from "react";
import { toast } from "react-toastify";

export default function UpdateKmForm({ vehicle, onUpdateKm, onClose }) {
  const [increment, setIncrement] = useState(0);

  const totalKm = Number(vehicle.kilometraje || 0) + Number(increment || 0);

  const handleChange = (e) => setIncrement(e.target.value);

const handleUpdate = (e) => {
  e.preventDefault();
  onUpdateKm?.({ ...vehicle, kilometraje: totalKm });

  toast.success("Kilometraje actualizado correctamente 🚗");

  onClose?.();
};

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 relative dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray font-bold bg-white-600 px-3 py-1 rounded-lg hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          X
        </button>
        <h2 className=" text-lg font-semibold text-gray-800 mb-4 dark:text-gray-200 text-center">
          Actualizar Kilometraje
        </h2>

        <p className="mb-2 dark:text-gray-300">
          Actualmente el Vehículo: <span className="font-semibold">{vehicle.tipo} {vehicle.placa}</span>
        </p>
        <p className="mb-4 dark:text-gray-300">
          Tiene un kilometraje de: <span className="font-semibold">{vehicle.kilometraje} Km</span>
        </p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Aumentar (Km)</label>
            <input
              type="number"
              value={increment}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Km Total</label>
            <input
              type="number"
              value={totalKm}
              readOnly
              className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-900 text-sm"
            >
              Actualizar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
}