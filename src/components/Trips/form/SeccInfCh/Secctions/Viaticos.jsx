import React from "react";

const safeNumber = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

export default function Viaticos({
  formData,
  handleChange,
}) {
  return (
    <div className="bg-green-50 p-6 rounded-2xl">
      <h3 className="text-xl font-bold text-green-700 mb-5">
        Viáticos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* PASAJEROS */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Pasajeros
          </label>

          <input
            type="number"
            name="pasajeros"
            placeholder="0"
            value={safeNumber(formData.pasajeros)}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />

          <span className="text-xs text-gray-500">
            Personas
          </span>
        </div>

        {/* KMS */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Kms. Designados
          </label>

          <input
            type="number"
            name="kmsDesignados"
            placeholder="0"
            value={safeNumber(formData.kmsDesignados)}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />

          <span className="text-xs text-gray-500">
            Kms.
          </span>
        </div>

        {/* DIAS */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Días de Viaje
          </label>

          <input
            type="number"
            name="diasViaje"
            placeholder="0"
            value={safeNumber(formData.diasViaje)}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full"
          />

          <span className="text-xs text-gray-500">
            Días
          </span>
        </div>

        {/* VIATICOS CIUDAD */}
        <input
          type="number"
          name="viaticosCiudad"
          placeholder="Viáticos Ciudad"
          value={safeNumber(formData.viaticosCiudad)}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        {/* VIATICOS PROVINCIA */}
        <input
          type="number"
          name="viaticosProvincia"
          placeholder="Viáticos Provincia"
          value={safeNumber(formData.viaticosProvincia)}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        {/* VIATICOS FRONTERA */}
        <input
          type="number"
          name="viaticosFrontera"
          placeholder="Viáticos Frontera"
          value={safeNumber(formData.viaticosFrontera)}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

      </div>
    </div>
  );
}