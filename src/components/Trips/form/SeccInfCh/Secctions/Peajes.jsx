import React from "react";

export default function Peajes({
  formData,
  handleChange,
}) {

  const total =
    Number(formData.peajes || 0) +
    Number(formData.imprevistos || 0);

  return (
    <div className="bg-yellow-50 p-6 rounded-2xl">

      <h3 className="text-xl font-bold text-yellow-700 mb-5">
        Peajes e Imprevistos
      </h3>

      <textarea
        rows={4}
        placeholder="Describa todos los peajes o los imprevistos"
        className="w-full border rounded-xl p-4 mb-5"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <input
          type="number"
          name="peajes"
          placeholder="Peajes"
          value={formData.peajes}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="imprevistos"
          placeholder="Imprevistos"
          value={formData.imprevistos}
          onChange={handleChange}
          className="border rounded-xl p-3"
        />

      </div>

      <div className="bg-white p-4 rounded-xl shadow mt-5">
        <p className="font-bold">Total</p>

        <p className="text-2xl text-yellow-700">
          {total} Bs.
        </p>
      </div>

    </div>
  );
}