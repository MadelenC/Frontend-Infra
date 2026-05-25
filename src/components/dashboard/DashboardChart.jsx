import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DashboardChart({ vehicles }) {
  const data = vehicles.slice(0, 8).map((v) => ({
    name: v.placa || v.codigo,
    viajes: Number(v.cantidadViajes || 0),
    combustible: Number(v.litrosCombustible || 0),
    gasto: Number(v.gastoCombustible || 0),
  }));

  return (
    <div
      className="
      bg-white dark:bg-gray-900
      border border-gray-100 dark:border-gray-800
      p-6 rounded-2xl shadow-sm
    "
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Viajes por vehículo
        </h2>

        <span className="text-xs text-gray-400">Resumen actual</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#111827",
              color: "#fff",
            }}
          />

          <Bar dataKey="viajes" fill="#4F46E5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}