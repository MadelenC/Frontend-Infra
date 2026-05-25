import { useNavigate } from "react-router-dom";
import {
  FaBus,
  FaCheckCircle,
  FaGasPump,
  FaTools,
  FaRoad,
  FaMoneyBill,
  FaChartLine,
  FaCar,
} from "react-icons/fa";

export default function DashboardCards({ stats }) {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Vehículos",
      value: stats.totalVehiculos,
      desc: "Vehículos registrados",
      icon: <FaCar size={18} />,
      route: "/vehiculos",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-500",
    },
    {
      title: "Viajes Realizados",
      value: stats.totalViajes,
      desc: "Viajes registrados",
      icon: <FaBus size={18} />,
      route: "/viajes",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-500",
    },
    {
      title: "Litros Consumidos",
      value: stats.totalLitros,
      desc: "Total combustible",
      icon: <FaGasPump size={18} />,
      route: "/presupuestos",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/20",
      border: "border-orange-400",
    },
    {
      title: "Gasto Combustible",
      value: `Bs. ${stats.totalGasto}`,
      desc: "Costo total",
      icon: <FaMoneyBill size={18} />,
      route: "/presupuestos",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-400",
    },
    {
      title: "Kilómetros Viajes",
      value: stats.totalKm,
      desc: "KM recorridos",
      icon: <FaRoad size={18} />,
      route: "/viajes",
      color: "text-cyan-600",
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      border: "border-cyan-500",
    },
    {
      title: "Mantenimientos",
      value: stats.totalMantenimientos,
      desc: "Registros mecánicos",
      icon: <FaTools size={18} />,
      route: "/mecanicos",
      color: "text-pink-500",
      bg: "bg-pink-50 dark:bg-pink-900/20",
      border: "border-pink-400",
    },
    {
      title: "Consumo General",
      value: `${stats.consumoGeneral} L/KM`,
      desc: "Promedio consumo",
      icon: <FaChartLine size={18} />,
      route: "/dashboard",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-500",
    },
    {
      title: "Costo por KM",
      value: `Bs. ${stats.costoKm}`,
      desc: "Promedio por kilómetro",
      icon: <FaMoneyBill size={18} />,
      route: "/dashboard",
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      border: "border-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={i}
          onClick={() => navigate(card.route)}
          className={`
            bg-white dark:bg-gray-900
            border border-gray-100 dark:border-gray-800
            border-l-4 ${card.border}
            rounded-2xl p-5 cursor-pointer
            shadow-sm hover:shadow-lg
            transition-all duration-300
            hover:-translate-y-1
          `}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className={`rounded-lg p-2 ${card.bg} ${card.color}`}>
              {card.icon}
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {card.title}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {card.value}
          </h2>

          <p className="mt-1 text-xs text-gray-400">{card.desc}</p>
        </div>
      ))}
    </div>
  );
}