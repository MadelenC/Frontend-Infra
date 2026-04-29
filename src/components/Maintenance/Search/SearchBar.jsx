import React from "react";

export default function SearchBarApplication({
  chofer,
  setChofer,
  vehiculo,
  setVehiculo,
  listaChoferes,
  listaVehiculos
}) {
  return (
    <div className="flex flex-col md:flex-row justify-start mb-4 gap-2 items-center">

      {/* Select Chofer */}
       {/* Select Chofer */}
      <select
        value={chofer}
        onChange={(e) => setChofer(e.target.value)}
        className="h-10 w-full px-4 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Seleccione un chofer</option>
        {(listaChoferes || []).map((c, index) => (
          <option key={index} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {/* Select Vehículo */}
      <select
        value={vehiculo}
        onChange={(e) => setVehiculo(e.target.value)}
        className="h-10 w-full px-4 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">Seleccione un vehículo</option>
        {listaVehiculos?.map((v) => (
          <option key={v.id} value={v.id}>
            {v.placa} - {v.tipog}
          </option>
        ))}
      </select>

    </div>
  );
}
