import React from "react";

const getChoferName = (exception, travel) => {
  if (travel.user) return `${travel.user.nombres} ${travel.user.apellidos}`;
  if (exception.rol?.user) return `${exception.rol.user.nombres} ${exception.rol.user.apellidos}`;
  if (exception.chofer_id) return `ID: ${exception.chofer_id}`;
  return "Desconocido";
};

export default function ListException({ entitie, exceptions, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative dark:bg-gray-800 dark:text-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-center">
           
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>
         Lista de Excepciones de {entitie.chofer || "Desconocido"}
        </h2>

        <table className="min-w-full text-sm border-collapse border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <thead className="bg-blue-100 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-2 border dark:text-gray-200">ID</th>
              <th className="px-3 py-2 border">Chofer</th>
              <th className="px-3 py-2 border">Tipo</th>
              <th className="px-3 py-2 border">Lugar</th>
              <th className="px-3 py-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {exceptions.length > 0 ? (
              exceptions.map((exception, index) => (
                <tr key={exception.id} className="hover:bg-gray-50">
                 
                  <td className="px-3 py-2 border text-center">{index + 1}</td>  
            
                  <td className="px-3 py-2 border">{entitie.chofer || "Desconocido"}</td>
                  <td className="px-3 py-2 border">{exception.tipo || ""}</td>
                  <td className="px-3 py-2 border">{exception.lugar || ""}</td>
                  <td className="px-3 py-2 border">{exception.fecha || ""}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-blue-500">No hay excepciones</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-900"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}