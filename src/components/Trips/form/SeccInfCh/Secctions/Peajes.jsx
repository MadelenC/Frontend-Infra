import React from "react";

export default function Peajes({ formData, handleChange }) {

  const total =
    Number(formData.montope || 0) +
    Number(formData.montoim || 0);

  return (
    <div className="bg-yellow-50 p-6 rounded-2xl">

      <h3 className="text-xl font-bold text-yellow-700 mb-5">
        Peajes e Imprevistos
      </h3>

      {/* DESCRIPCIÓN */}
      <textarea
        rows={4}
        name="descripe"
        value={formData.descripe || ""}
        onChange={handleChange}
        placeholder="Describa todos los peajes o los imprevistos"
        className="w-full border rounded-xl p-4 mb-5"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* PEAJES */}
        <input
          type="number"
          name="montope"
          value={formData.montope || ""}
          onChange={handleChange}
          placeholder="Peajes"
          className="border rounded-xl p-3"
        />

        {/* IMPREVISTOS */}
        <input
          type="number"
          name="montoim"
          value={formData.montoim || ""}
          onChange={handleChange}
          placeholder="Imprevistos"
          className="border rounded-xl p-3"
        />

      </div>

      {/* TOTAL */}
      <div className="bg-white p-4 rounded-xl shadow mt-5">

        <p className="font-bold">Total</p>

        <p className="text-2xl text-yellow-700">
          {total.toFixed(2)} Bs.
        </p>

      </div>

    </div>
  );
}