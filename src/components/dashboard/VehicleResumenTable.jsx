import { FaSearch } from "react-icons/fa";

export default function VehicleResumenTable({
  vehicles,
  loading,
  estado,
  setEstado,
  search,
  setSearch,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Resumen por vehículo
        </h2>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 h-3 w-3 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar placa, marca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border px-9 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white md:w-64"
            />
          </div>

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Todos</option>
            <option value="optimo">Óptimo</option>
            <option value="mantenimiento">Mantenimiento</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
            <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Cargando datos...
              </span>
            </div>
          </div>
        )}

        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
              <th className="px-4 py-3">Vehículo</th>
              <th className="px-4 py-3">Placa</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Viajes</th>
              <th className="px-4 py-3">Litros</th>
              <th className="px-4 py-3">Gasto</th>
              <th className="px-4 py-3">KM</th>
              <th className="px-4 py-3">L/KM</th>
              <th className="px-4 py-3">Bs/KM</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={vehicle.id}
                className={`border-b hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/60 ${
                  loading ? "opacity-40" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                  {vehicle.codigo}
                </td>

                <td className="px-4 py-3">{vehicle.placa}</td>

                <td className="px-4 py-3">
                  {vehicle.marca || "-"} {vehicle.modelo || ""}
                </td>

                <td className="px-4 py-3">{vehicle.cantidadViajes}</td>
                <td className="px-4 py-3">{vehicle.litrosCombustible}</td>
                <td className="px-4 py-3">Bs. {vehicle.gastoCombustible}</td>
                <td className="px-4 py-3">{vehicle.kmViajes}</td>
                <td className="px-4 py-3">{vehicle.consumoPorKm}</td>
                <td className="px-4 py-3">Bs. {vehicle.costoPorKm}</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      vehicle.estado === "mantenimiento"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {vehicle.estado}
                  </span>
                </td>
              </tr>
            ))}

            {!loading && vehicles.length === 0 && (
              <tr>
                <td colSpan="10" className="px-4 py-6 text-center text-gray-500">
                  No hay vehículos para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}