import React, { useState } from "react";

export default function AddDriverForm({ choferes = [], onSubmit, onClose }) {
  const [choferId, setChoferId] = useState("");
  const [error, setError] = useState("");

  const inputBase = "p-2 border rounded text-sm w-full";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!choferId) {
      setError("Debe seleccionar un chofer");
      return;
    }

    setError("");
    onSubmit({ chofer_id: choferId });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto bg-white p-4 rounded-xl shadow"
    >
      <h3 className="text-center font-bold text-gray-600">
        Registrar Chofer al Rol de Viajes
      </h3>

      <div className="flex flex-col">
        <label className="text-gray-600 text-xs">Chofer</label>
        <select
          value={choferId}
          onChange={(e) => setChoferId(e.target.value)}
          className={inputBase}
        >
          <option value="">Seleccione un chofer</option>
          {choferes.map((chofer) => (
            <option key={chofer.id} value={chofer.id}>
              {chofer.nombres} {chofer.apellidos}
            </option>
          ))}
        </select>

        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>

      <div className="flex justify-center gap-3">
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Registrar
        </button>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

