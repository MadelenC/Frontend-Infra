import React, { useState } from "react";
import SearchBar from "../search/SearchBar";
import TableFuel from "./TableFuel";
import Pagination from "./Pagination";

export default function FuelTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  // 🔹 data de ejemplo (luego viene de API)
  const data = [
    {
      id: 1,
      solicitud: "001",
      pedido: "P-120",
      fecha: "2024-05-01",
      factura: "F-778",
      vehiculo: "ABC-123",
      gasolina: 50,
      diesel: 0,
      gnv: 20,
      total: 350,
    },
  ];

  // 🔹 search simple (global)
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  // 🔹 paginación
  const totalPages = Math.ceil(filteredData.length / limit);
  const currentData = filteredData.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-4">

      {/* CABECERA */}
      <div className="flex justify-between items-center mb-4">

        {/* BOTONES */}
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">
            Actualizar Capital
          </button>
          <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm">
            Agregar
          </button>
          <button className="px-3 py-2 rounded-md bg-gray-600 text-white text-sm">
            Imprimir
          </button>
          <button className="px-3 py-2 rounded-md bg-red-500 text-white text-sm">
            Guardar
          </button>
        </div>

        {/* SEARCH */}
        <div className="w-64">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
      </div>

      {/* TABLA */}
      <TableFuel data={currentData} />

      {/* PAGINACIÓN */}
      <div className="flex justify-center mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
