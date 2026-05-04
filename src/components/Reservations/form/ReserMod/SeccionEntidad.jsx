import React from "react";
function SeccionEntidad({ formData, handleChange, errors }) {
  return (
    <div className="bg-white p-4 rounded-lg border space-y-3 dark:bg-gray-800 dark:border-gray-700">

      {/* ENTIDAD */}
      <div>
        <label className="block text-sm font-semibold mb-1 dark:text-gray-200">
          Entidad
        </label>

        <input
          type="text"
          name="entidad"
          value={formData.entidad || ""}
          onChange={handleChange}
          placeholder="Entidad"
          className="w-full border px-3 py-1.5 rounded-md text-sm dark:bg-gray-200/40 dark:border-gray-200"
        />

        {errors?.entidad && (
          <p className="text-red-500 text-xs mt-1">
            {errors.entidad}
          </p>
        )}
      </div>

      {/* OBJETIVO */}
      <div>
        <label className="block text-sm font-semibold mb-1 dark:text-gray-200">
          Objetivo
        </label>

        <textarea
          name="objetivo"
          value={formData.objetivo || ""}
          onChange={handleChange}
          placeholder="Objetivo"
          rows={3}
          className="w-full border px-3 py-1.5 rounded-md text-sm dark:bg-gray-200/40 dark:border-gray-200"
        />

        {errors?.objetivo && (
          <p className="text-red-500 text-xs mt-1">
            {errors.objetivo}
          </p>
        )}
      </div>

    </div>
  );
}

// 🔥 AQUÍ ESTÁ EL MEMO
export default React.memo(SeccionEntidad);