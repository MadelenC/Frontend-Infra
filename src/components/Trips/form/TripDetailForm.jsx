import React from "react";

export default function TripDetailView({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-6 z-50">
      <div className="bg-white dark:bg-gray-900 w-[95%] max-w-6xl max-h-[90vh] overflow-y-auto p-6 rounded-xl space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">
            Detalle del viaje
          </h2>

          <button onClick={onClose} className="text-red-500 font-bold text-lg">
            ✕
          </button>
        </div>

        {/* ENCARGADOS */}
        <div className="border rounded p-3 dark:border-gray-700">
          <h3 className="font-semibold mb-2 dark:text-white">Encargados</h3>

          <table className="w-full text-sm">
            <tbody className="dark:text-gray-200">
              {data?.encargados?.length > 0 ? (
                data.encargados.map((e, i) => (
                  <tr key={i}>
                    <td>{e.nombres}</td>
                    <td>{e.apellidos}</td>
                    <td>{e.celular}</td>
                  </tr>
                ))
              ) : (
                <tr><td>No hay encargados</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CHOFERES */}
        <div className="border rounded p-3 dark:border-gray-700">
          <h3 className="font-semibold mb-2 dark:text-white">Choferes</h3>

          <table className="w-full text-sm">
            <tbody className="dark:text-gray-200">
              {data?.choferes?.length > 0 ? (
                data.choferes.map((c, i) => (
                  <tr key={i}>
                    <td>{c.nombres}</td>
                    <td>{c.apellidos}</td>
                    <td>{c.celular}</td>
                  </tr>
                ))
              ) : (
                <tr><td>No hay choferes</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* VEHÍCULOS */}
        <div className="border rounded p-3 dark:border-gray-700">
          <h3 className="font-semibold mb-2 dark:text-white">Vehículos</h3>

          <table className="w-full text-sm">
            <tbody className="dark:text-gray-200">
              {data?.vehiculos?.length > 0 ? (
                data.vehiculos.map((v, i) => (
                  <tr key={i}>
                    <td>{v.tipo || v.tipog}</td>
                    <td>{v.placa}</td>
                  </tr>
                ))
              ) : (
                <tr><td>No hay vehículos</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* DESTINOS */}
        <div className="border rounded p-3 dark:border-gray-700">
          <h3 className="font-semibold mb-2 dark:text-white">Destinos</h3>

          <table className="w-full text-xs">
            <tbody className="dark:text-gray-200">

              {data?.destinos?.length > 0 ? (
                data.destinos.map((d, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td><b>Depto Inicio:</b></td>
                      <td>{d.dep_inicio || "_"}</td>
                    </tr>

                    <tr>
                      <td><b>Origen:</b></td>
                      <td>{d.origen}</td>
                    </tr>

                    <tr>
                      <td><b>Ruta:</b></td>
                      <td>{d.ruta}</td>
                    </tr>

                    <tr>
                      <td><b>Destino:</b></td>
                      <td>{d.destino}</td>
                    </tr>

                    <tr>
                      <td><b>Depto Final:</b></td>
                      <td>{d.dep_final ||"_"}</td>
                    </tr>

                    <tr>
                      <td><b>Kilometraje:</b></td>
                      <td>{d.kilometraje}</td>
                    </tr>

                    <tr><td colSpan="2"><hr /></td></tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td>No hay destinos</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

        {/* BOTÓN */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}