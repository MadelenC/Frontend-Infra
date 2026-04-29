import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddDriverForm({
  choferes = [],
  choferesRegistrados = [],
  onSubmit, // Se espera que sea una función que maneja el registro de choferes
  setOpenPanel,
}) {
  const [choferId, setChoferId] = useState(""); // ID del chofer seleccionado
  const [error, setError] = useState(""); // Para mostrar errores

  const inputBase =
    "p-2 border rounded text-sm w-full transition dark:bg-gray-200/40 dark:border-gray-200";

  // Función que maneja el submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación si no se seleccionó un chofer
    if (!choferId) {
      setError("Debe seleccionar un chofer");
      toast.error("❌ Debe seleccionar un chofer");
      return;
    }

    // Comprobamos si el chofer ya está registrado
    if (choferesRegistrados.some((c) => c.chofer_id === parseInt(choferId))) {
      setError("Este chofer ya está registrado");
      toast.warning("⚠️ Este chofer ya está registrado");
      return;
    }

    setError(""); // Limpiamos el error si todo está correcto

    const payload = {
      chofer_id: parseInt(choferId),
      tipoa: "",
      tipob: "",
      tipoc: "",
      cantidad: 1,
      fecha: new Date().toISOString(),
    };

    // Intentamos registrar el chofer
    try {
      const res = await onSubmit(payload);

      // Verificamos si el registro fue exitoso
      if (res?.ok || res === true) {
        toast.success("✅ Chofer registrado correctamente");
        setChoferId(""); // Limpiamos el valor del select
        setOpenPanel(false); // Cerramos el panel de registro
      } else {
        toast.error("❌ No se pudo registrar el chofer");
      }
    } catch (error) {
      toast.error(`⚠️ Error inesperado: ${error.message || error}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative dark:bg-gray-800 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Botón de cerrar */}
          <button
            type="button"
            onClick={() => setOpenPanel(false)} 
            className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Cerrar formulario"
          >
            X
          </button>

          <h3 className="text-center font-semibold text-gray-600 dark:text-gray-200">
            Registrar Chofer al Rol de Viajes
          </h3>

          {/* Selección del chofer */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm dark:text-gray-200">Chofer:</label>
            <select
              value={choferId}
              onChange={(e) => setChoferId(e.target.value)}
              className={inputBase}
            >
              <option value="">Seleccione un chofer</option>

              {/* Mostramos la lista de choferes */}
              {choferes.map((chofer) => {
                const yaRegistrado = choferesRegistrados.some(
                  (c) => c.chofer_id === chofer.id
                );

                return (
                  <option
                    key={chofer.id}
                    value={chofer.id}
                    disabled={yaRegistrado} 
                    style={{
                      color: yaRegistrado ? "#A9A9A9" : "black", // Gris para choferes ya registrados
                      backgroundColor: yaRegistrado ? "#f8d7da" : "white", // Fondo rojo claro para choferes ya registrados
                    }}
                  >
                    {chofer.nombres} {chofer.apellidos}{" "}
                    {yaRegistrado ? "(Ya registrado)" : ""}
                  </option>
                );
              })}
            </select>

            {error && <span className="text-red-500 text-xs">{error}</span>}
          </div>

          <div className="flex justify-center gap-3 mt-2">
            <button
              type="submit"
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-900"
            >
              Registrar
            </button>

            <button
              type="button"
              onClick={() => setOpenPanel(false)} 
              className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}