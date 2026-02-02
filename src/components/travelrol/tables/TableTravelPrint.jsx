// src/components/travel/PrintTravel.js
import React, { forwardRef } from "react";

const PrintTravel = forwardRef(({ travels }, ref) => {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("es-ES", options);

  return (
    <div ref={ref} className="p-6 text-sm print:p-0">
      {/* Encabezado centrado */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-xl">UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS</h1>
        <h2 className="font-semibold text-lg">DEPARTAMENTO DE INFRAESTRUCTURA</h2>
        <h3 className="font-semibold mb-2 text-base">SECCIÓN AUTOMOTORES</h3>
        <h2 className="font-bold mb-1 text-lg">ROL DE VIAJES</h2>
        <p className="italic">{formattedDate}</p>
      </div>

      {/* Tabla centrada */}
      <div className="overflow-x-auto">
        <table className="mx-auto w-full max-w-4xl border border-black border-collapse text-center">
          <thead>
            <tr className="bg-gray-200">
              {["Nro.", "Chofer", 'Ciudad "A"', 'Provincia "B"', 'Frontera "C"', "Fecha"].map(h => (
                <th key={h} className="border px-3 py-2 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {travels && travels.length > 0 ? (
              travels.map((t, index) => (
                <tr key={t.id} className="hover:bg-gray-100 transition-colors">
                  <td className="border px-3 py-1">{index + 1}</td>
                  <td className="border px-3 py-1">{t.chofer}</td>
                  <td className="border px-3 py-1">{t.tipoA}</td>
                  <td className="border px-3 py-1">{t.tipoB}</td>
                  <td className="border px-3 py-1">{t.tipoC}</td>
                  <td className="border px-3 py-1">{t.fecha}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default PrintTravel;
