import React from "react";

export default function SearchBarEntitie({ search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row justify-start mb-4 gap-2 items-center">
      <input
        type="text"
        placeholder="Origen o destino..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-10 w-full md:w-1/1 px-3 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400

        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
}