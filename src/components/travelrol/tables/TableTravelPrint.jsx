// src/components/travel/PrintTravel.js
import e from "express";
import React from "react";

export default function PrintTravel({ travels }) {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("es-ES", options);

  return (
    <div className="p-6 text-sm">
      {/* Encabezado */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-lg">UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS</h1>
        <h2 className="font-semibold">DEPARTAMENTO DE INFRAESTRUCTURA</h2>
        <h3 className="font-semibold mb-2">SECCIÓN AUTOMOTORES</h3>
        <h2 className="font-bold mb-1">ROL DE VIAJES</h2>
        <p className="italic">{formattedDate}</p>
      </div>

      {/* Tabla de viajes */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {["Nro.", "Chofer", "Ciudad A", "Provincia B", "Frontera C", "Fecha"].map((head) => (
              <th key={head} className="px-3 py-2 font-semibold">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {travels && travels.length > 0 ? (
            travels.map((t, index) => (
              <tr key={t.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-3 py-1">{index + 1}</td>
                <td className="px-3 py-1">{entitie.chofer}</td>
                <td className="px-3 py-1">{entitie.tipoA}</td>
                <td className="px-3 py-1">{entitie.tipoB}</td>
                <td className="px-3 py-1">{entitie.tipoC}</td>
                <td className="px-3 py-1">{entitie.fecha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
