import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect } from "react";
import { useVehicleResumenStore } from "../../zustand/usevehicleResumenStore";
import { formatChartData } from "../../helpers/formatChartData";

const COLORS = ["#3B82F6", "#374151"];

export default function CombustibleMensualChart() {
  const { chartData, fetchCombustibleMensual } =
    useVehicleResumenStore();

 useEffect(() => {
  fetchCombustibleMensual(new Date().getFullYear());
}, []);

  const data = formatChartData(chartData || []);

  const totalGasolina = data.reduce((a, b) => a + b.gasolina, 0);
  const totalDiesel = data.reduce((a, b) => a + b.diesel, 0);

  const pieData = [
    { name: "Gasolina", value: totalGasolina },
    { name: "Diesel", value: totalDiesel },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">

      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
          Consumo de combustible
        </h2>
        <span className="text-xs text-gray-400">
          {new Date().getFullYear()}
        </span>
      </div>

    
      <div className="flex justify-center mb-6">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="gasolina"
            fill="#3B82F6"
            name="Gasolina"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="diesel"
            fill="#374151"
            name="Diesel"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}