import React from "react";

export default function Devoluciones({
  formData,
  handleChange,
}) {

  const total =
    Number(formData.devolucionCombustible || 0) +
    Number(formData.devolucionPeajes || 0) +
    Number(formData.devolucionImprevistos || 0);

  return (
    <div className="bg-red-50 p-6 rounded-2xl">

      <h3 className="text-xl font-bold text-red-700 mb-5">
        Detalle de Devoluciones
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <input
          type="number"
          name="devolucionCombustible"
          placeholder="Combustible"
          value={formData.devolucionCombustible}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="devolucionPeajes"
          placeholder="Peajes"
          value={formData.devolucionPeajes}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="devolucionImprevistos"
          placeholder="Imprevistos"
          value={formData.devolucionImprevistos}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

      </div>

      <div className="bg-white p-4 rounded-xl shadow mt-5">
        <p className="font-bold">Total</p>

        <p className="text-2xl text-red-700">
          {total} Bs.
        </p>
      </div>

    </div>
  );
}