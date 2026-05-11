import React, { useState } from "react";

export default function UpdateKmForm({
  vehicle,
  onUpdateKm,
  onClose,
}) {
  const [increment, setIncrement] = useState(0);

 const currentKm = Number(vehicle.kilometraje || 0);

  const totalKm =
    currentKm + Number(increment || 0);

  const handleChange = (e) =>
    setIncrement(e.target.value);

  const handleUpdate = (e) => {
    e.preventDefault();

    onUpdateKm?.({
      ...vehicle,

      modelos: [
        {
          ...vehicle.modelos?.[0],
          kilometraje: totalKm,
        },
      ],
    });

    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 relative dark:bg-gray-800">

        <h2 className="pt-5 text-2xl text-center font-semibold text-gray-800 mb-4 dark:text-gray-200">
          Actualizar Kilometraje
        </h2>

        <p className="mb-2 dark:text-gray-300">
          Actualmente el Vehículo:
          <span className="font-semibold dark:text-gray-400">
            {" "}
            {vehicle.tipo} {vehicle.placa}
          </span>
        </p>

        <p className="mb-4 dark:text-gray-300">
          Tiene un kilometraje de:
          <span className="font-semibold dark:text-gray-400">
            {" "}
            {currentKm} Km
          </span>
        </p>

        <form className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
              Aumentar (Km)
            </label>

            <input
              type="number"
              value={increment}
              onChange={handleChange}
              className="p-2 border rounded text-sm w-full transition dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
              Km Total
            </label>

            <input
              type="number"
              value={totalKm}
              readOnly
              className="p-2 border rounded text-sm w-full transition dark:bg-gray-200/40 dark:border-gray-200"
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
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 text-sm"
            >
              Cancelar
            </button>

          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          X
        </button>

      </div>
    </div>
  );
}