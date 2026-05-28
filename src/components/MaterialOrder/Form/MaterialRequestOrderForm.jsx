import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../zustand/AuthUsers";
import { toast } from "react-toastify";

const unidadMedidaOptions = [
  "Nulo",
  "Pieza",
  "Litros",
  "Centimetros",
  "Metros",
  "Galones",
  "Valde",
  "Hoja",
  "Pliego",
];

export default function MaterialRequestForm({ isOpen,onClose,onDelete, onSave,application,request, }) {
  const [kmActual, setKmActual] = useState("");
  const [items, setItems] = useState([
    { cantidad: "", unidad: "Nulo", descripcion: "" },
  ]);
  const [justificacion, setJustificacion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [vehiculoIDH, setVehiculoIDH] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  if (request) {

    setKmActual(request.km || "");

    setJustificacion(request.justificacion || "");

    setObservaciones(request.observacion || "");

    setVehiculoIDH(request.idh || "");

    const loadedItems = [];

    for (let i = 1; i <= (request.conteo || 0); i++) {
      loadedItems.push({
        cantidad: request[`cantidad${i}`] || "",
        unidad: request[`medida${i}`] || "Nulo",
        descripcion: request[`descripcion${i}`] || "",
      });
    }

    if (loadedItems.length > 0) {
      setItems(loadedItems);
    }
  }
}, [request]);

  const user = useAuthStore((state) => state.user);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([...items, { cantidad: "", unidad: "Nulo", descripcion: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length === 1) return; // Siempre al menos una fila
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  const payload = {
    km: kmActual,
    justificacion,
    observacion: observaciones,
    respuestas: "", 
    conteo: items.length,
    idh: vehiculoIDH,
    insertador: user ? `${user.nombres} ${user.apellidos}` : null,
     solicitud: {
  id: application?.id
}
  };

  items.forEach((item, index) => {
    const i = index + 1;

    payload[`cantidad${i}`] = item.cantidad;
    payload[`medida${i}`] = item.unidad;
    payload[`descripcion${i}`] = item.descripcion;
  });

  const res = await onSave(payload);

  setSaving(false);

  if (res?.ok) {
  toast.success("✅ Petición registrada correctamente");
  onClose();
} else {
  toast.error(res?.error || "❌ Error al guardar la petición");
}
};

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl relative max-h-[90vh] flex flex-col">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200"
          aria-label="Cerrar formulario"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6 mb-4">
          Realizar petición de material
        </h2>

        <p className="text-sm text-center mb-6 px-6">
          <span className="text-green-600 ">■ Los campos en verde son obligatorios.</span>{" "}
          <span className="text-blue-500 ">■ Los campos en azul son opcionales.</span>
        </p>

        {/* Formulario con scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Km Actual */}
            <div>
              <label className="text-green-600 font-semibold block mb-1">
                Km. Actual del Vehículo*
              </label>
              <input
                type="number"
                placeholder="Ejm. 25828"
                value={kmActual}
                onChange={(e) => setKmActual(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
            </div>

            {/* Tabla Items */}
            <div className="overflow-x-auto border border-gray-300 rounded-md bg-blue-50">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                      Cantidad
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                      Unid./Medida
                    </th>
                    <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">
                      Descripción
                    </th>
                    <th className="border border-gray-300 px-3 py-2 w-12" />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="bg-white">
                      <td className="border border-gray-300 px-2 py-1">
                        <input
                          type="number"
                          min="0"
                          value={item.cantidad}
                          onChange={(e) =>
                            handleItemChange(i, "cantidad", e.target.value)
                          }
                          placeholder="Ejm. 1"
                          required
                          className="w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
                        />
                      </td>

                      <td className="border border-gray-300 px-2 py-1">
                        <select
                          value={item.unidad}
                          onChange={(e) =>
                            handleItemChange(i, "unidad", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
                          required
                        >
                          {unidadMedidaOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border border-gray-300 px-2 py-1">
                        <input
                          type="text"
                          value={item.descripcion}
                          onChange={(e) =>
                            handleItemChange(i, "descripcion", e.target.value)
                          }
                          placeholder="Ejm. Líquido de freno"
                          required
                          className="w-full border border-gray-300 rounded-md px-2 py-1 bg-white"
                        />
                      </td>

                      <td className="border border-gray-300 px-2 py-1 text-center">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(i)}
                            className="text-red-600 font-bold hover:text-red-800"
                            aria-label="Eliminar fila"
                          >
                            &times;
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-1 rounded"
                  aria-label="Agregar fila"
                >
                  + 
                </button>
              </div>
            </div>

        
            <div>
              <label className="text-green-600 font-semibold block mb-1">
                Justificación*
              </label>
              <textarea
                placeholder="Describa la justificación del pedido a realizar"
                value={justificacion}
                onChange={(e) => setJustificacion(e.target.value)}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
            </div>

          
            <div>
              <label className="text-blue-500 font-semibold block mb-1">
                Observaciones
              </label>
              <textarea
                placeholder="Escriba las observaciones del pedido"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
            </div>

            
            <div>
              <label className="text-blue-500 font-semibold block mb-1">
                Vehículo con IDH?
              </label>
              <input
                type="text"
                placeholder="Ejm. IDH"
                value={vehiculoIDH}
                onChange={(e) => setVehiculoIDH(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => onDelete(request.id)}
                className="bg-red-500 text-white px-5 py-2 rounded-md"
              >
                Eliminar 
              </button>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-5 py-2 rounded-md disabled:opacity-70"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}