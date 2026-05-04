import React from "react";

function SeccionViaje({ formData, handleChange, errors }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700">

      <h3 className="text-md font-semibold mb-3 border-b pb-1">
        Información del viaje
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {/* TIPO VIAJE */}
        <div>
          <label className="text-sm font-semibold">Tipo de viaje</label>
          <select
            name="tipoViaje"
            value={formData.tipoViaje}
            onChange={handleChange}
            className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
          >
            <option value="">Seleccione</option>
            <option>Viaje de Práctica</option>
            <option>Viaje de Inspección</option>
            <option>Viaje Académico</option>
            <option>Viaje de Cultura</option>
          </select>

          {errors?.tipoViaje && (
            <p className="text-red-500 text-xs">{errors.tipoViaje}</p>
          )}
        </div>

        {/* PASAJEROS */}
        <div>
          <label className="text-sm font-semibold">Pasajeros</label>
          <input
            type="number"
            name="pasajeros"
            value={formData.pasajeros}
            onChange={handleChange}
            className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
          />

          {errors?.pasajeros && (
            <p className="text-red-500 text-xs">{errors.pasajeros}</p>
          )}
        </div>

        {/* INICIO */}
        <div>
          <label className="text-sm font-semibold">Fecha inicio</label>
          <input
            type="datetime-local"
            name="inicio"
            value={formData.inicio}
            onChange={handleChange}
            className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
          />

          {errors?.inicio && (
            <p className="text-red-500 text-xs">{errors.inicio}</p>
          )}
        </div>

        {/* FIN */}
        <div>
          <label className="text-sm font-semibold">Fecha fin</label>
          <input
            type="datetime-local"
            name="final"
            value={formData.final}
            onChange={handleChange}
            className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
          />

          {errors?.final && (
            <p className="text-red-500 text-xs">{errors.final}</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default React.memo(SeccionViaje);