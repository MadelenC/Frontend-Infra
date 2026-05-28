import React, { useState } from "react";
import { toast } from "react-toastify";

const departments = [
  "Chuquisaca",
  "La_Paz",
  "Cochabamba",
  "Oruro",
  "Potosí",
  "Tarija",
  "Santa_Cruz",
  "Beni",
  "Pando",
];

export default function DestinationForm({
  isOpen,
  onClose,
  onSave,
}) {
  const [origen, setOrigen] = useState("");
  const [departamentoSalida, setDepartamentoSalida] = useState("");
  const [descripcionRuta, setDescripcionRuta] = useState("");
  const [distancia, setDistancia] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [destino, setDestino] = useState("");
  const [departamentoLlegada, setDepartamentoLlegada] = useState("");

  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    const payload = {
      dep_inicio: departamentoSalida,
      origen,
      destino,
      dep_final: departamentoLlegada,
      ruta: descripcionRuta,
      kilometraje: distancia,
      tiempo,
    };

    const res = await onSave(payload);

    setSaving(false);

    if (res?.ok) {
      toast.success("✅ Destino registrado correctamente");

      onClose();

      setOrigen("");
      setDepartamentoSalida("");
      setDescripcionRuta("");
      setDistancia("");
      setTiempo("");
      setDestino("");
      setDepartamentoLlegada("");

    } else {
      toast.error(res?.error || "❌ Error al registrar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">

      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl relative max-h-[90vh] flex flex-col">

    
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

      
        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6 mb-2">
          Nuevo Destino
        </h2>

        <p className="text-center text-sm text-green-600 mb-6">
          Todos los campos son obligatorios
        </p>

    
        <div className="flex-1 overflow-y-auto p-6">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Origen*
              </label>

              <input
                type="text"
                placeholder="Desde donde partirá el vehículo"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

   
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Departamento de salida*
              </label>

              <select
                value={departamentoSalida}
                onChange={(e) => setDepartamentoSalida(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Seleccione</option>

                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

       
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Descripción De La Ruta*
              </label>

              <textarea
                placeholder="Agregue una breve descripción de la ruta de viaje"
                value={descripcionRuta}
                onChange={(e) => setDescripcionRuta(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

      
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Distancia (km)*
              </label>

              <input
                type="text"
                placeholder="Ejm. 12,5"
                value={distancia}
                onChange={(e) => setDistancia(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>


            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Tiempo Aproximado*
              </label>

              <input
                type="text"
                placeholder="Ejm. 5:30 Horas"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>


            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Destino*
              </label>

              <input
                type="text"
                placeholder="Hasta el lugar exacto de llegada"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>


            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Departamento de llegada*
              </label>

              <select
                value={departamentoLlegada}
                onChange={(e) => setDepartamentoLlegada(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Seleccione</option>

                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

        
            <div className="flex justify-end gap-3 pt-4 border-t">

              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white px-5 py-2 rounded-md"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md disabled:opacity-70"
              >
                Guardar
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}