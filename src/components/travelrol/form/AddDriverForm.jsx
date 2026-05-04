import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "../../../zustand/userStore";

export default function AddDriverForm({
 
  choferesRegistrados = [],
  onSubmit, 
  setOpenPanel,
}) {
  const [choferId, setChoferId] = useState(""); 
  const [error, setError] = useState(""); 

  const fetchDrivers = useUserStore((state) => state.fetchDrivers);
const getDrivers = useUserStore((state) => state.getDrivers);

const [drivers, setDrivers] = useState([]);

  const inputBase =
    "p-2 border rounded text-sm w-full transition dark:bg-gray-200/40 dark:border-gray-200";

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!choferId) {
      setError("Debe seleccionar un chofer");
      toast.error("❌ Debe seleccionar un chofer");
      return;
    }

    if (choferesRegistrados.some((c) => c.chofer_id === parseInt(choferId))) {
      setError("Este chofer ya está registrado");
      toast.warning("⚠️ Este chofer ya está registrado");
      return;
    }

    setError("");

    const payload = {
      chofer_id: parseInt(choferId),
      tipoa: "",
      tipob: "",
      tipoc: "",
      cantidad: 1,
      fecha: new Date().toISOString(),
    };

    
    try {
      const res = await onSubmit(payload);

      
      if (res?.ok || res === true) {
        toast.success("✅ Chofer registrado correctamente");
        setChoferId(""); 
        setOpenPanel(false); 
      } else {
        toast.error("❌ No se pudo registrar el chofer");
      }
    } catch (error) {
      toast.error(`⚠️ Error inesperado: ${error.message || error}`);
    }
  };

  useEffect(() => {
  const loadDrivers = async () => {
    await fetchDrivers();

    const data = getDrivers();

    setDrivers(Array.isArray(data) ? data : []);
  };

  loadDrivers();
}, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative dark:bg-gray-800 dark:text-gray-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
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

          
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm dark:text-gray-200">Chofer:</label>
            <select
              value={choferId}
              onChange={(e) => setChoferId(e.target.value)}
              className={inputBase}
            >
              <option value="">Seleccione un chofer</option>

             
              {drivers.map((chofer) => {
                const yaRegistrado = choferesRegistrados.some(
                  (c) => c.chofer_id === chofer.id
                );

                return (
                  <option
                    key={chofer.id}
                    value={chofer.id}
                    disabled={yaRegistrado} 
                    style={{
                      color: yaRegistrado ? "#A9A9A9" : "black", 
                      backgroundColor: yaRegistrado ? "#f8d7da" : "white", 
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