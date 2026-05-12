import React, { useState } from "react";
import { piezasBase } from "./../utils/piezas";

export default function InformeTecnico({
  formData,
  handleChange,
  selectedPiezas,
  setSelectedPiezas,
}) {

  const [otraPieza, setOtraPieza] = useState("");

  const [piezasExtras, setPiezasExtras] = useState([]);

  const togglePieza = (pieza) => {

    if (selectedPiezas.includes(pieza)) {

      setSelectedPiezas(
        selectedPiezas.filter((p) => p !== pieza)
      );

    } else {

      setSelectedPiezas([
        ...selectedPiezas,
        pieza,
      ]);
    }
  };

  const agregarPieza = () => {

    if (!otraPieza.trim()) return;

    const nueva = otraPieza.trim();

    setPiezasExtras([
      ...piezasExtras,
      nueva,
    ]);

    setSelectedPiezas([
      ...selectedPiezas,
      nueva,
    ]);

    setOtraPieza("");
  };

  return (
    <div className="space-y-6">

      {/* PIEZAS */}
      <div>

        <h3 className="text-lg font-bold text-gray-700 mb-4">
          Piezas del Vehículo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

          {[...piezasBase, ...piezasExtras].map((pieza) => (

            <label
              key={pieza}
              className="flex items-center gap-3 border rounded-xl p-3 hover:bg-gray-50 cursor-pointer"
            >

              <input
                type="checkbox"
                checked={selectedPiezas.includes(pieza)}
                onChange={() => togglePieza(pieza)}
                className="w-4 h-4"
              />

              <span className="text-sm">
                {pieza}
              </span>

            </label>

          ))}

        </div>

      </div>

      {/* AGREGAR OTRA */}
      <div className="bg-gray-50 border rounded-2xl p-4">

        <h4 className="font-semibold mb-3 text-gray-700">
          Agregar otra pieza
        </h4>

        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            value={otraPieza}
            onChange={(e) => setOtraPieza(e.target.value)}
            placeholder="Ej: Radiador"
            className="flex-1 border rounded-xl p-3"
          />

          <button
            type="button"
            onClick={agregarPieza}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            Agregar
          </button>

        </div>

      </div>

      {/* DESCRIPCION */}
      <div>

        <label className="block font-semibold text-gray-700 mb-2">
          Descripción
        </label>

        <textarea
          name="descripcionTecnica"
          value={formData.descripcionTecnica}
          onChange={handleChange}
          rows={4}
          placeholder="Describa el estado de las piezas seleccionadas..."
          className="w-full border rounded-2xl p-4"
        />

      </div>

      {/* RECOMENDACIONES */}
      <div>

        <label className="block font-semibold text-gray-700 mb-2">
          Recomendaciones
        </label>

        <textarea
          name="recomendaciones"
          value={formData.recomendaciones}
          onChange={handleChange}
          rows={4}
          placeholder="Inserte recomendaciones para mantenimiento..."
          className="w-full border rounded-2xl p-4"
        />

      </div>

    </div>
  );
}