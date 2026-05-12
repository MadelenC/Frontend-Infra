import React from "react";

export default function InformeViaje({
  formData,
  handleChange,
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl">

      <h3 className="text-xl font-bold text-gray-700 mb-5">
        Describa el Informe del Viaje
      </h3>

      <textarea
        name="informeViaje"
        rows={6}
        placeholder="Realice un informe sobre el viaje y la delegación del mismo"
        value={formData.informeViaje}
        onChange={handleChange}
        className="w-full border rounded-2xl p-4"
      />

    </div>
  );
}