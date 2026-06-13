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
import ReporteCombustibleMensualButton from "../pdf-buttons/ReporteCombustibleMensualButton";
import ReporteCombustibleAnualButton from "../pdf-buttons/ReporteCombustibleAnualButton";

const COLORS = ["#3B82F6", "#374151"];

export default function CombustibleMensualChart() {
  const {
    chartData,
    anualData,
    fetchCombustibleMensual,
    fetchCombustibleAnual,
  } = useVehicleResumenStore();

  useEffect(() => {
    fetchCombustibleMensual(new Date().getFullYear());
    fetchCombustibleAnual();
  }, []);

   const handlePrint = () => {
    window.print();
  };

  const data = formatChartData(chartData || []);

  const totalGasolina = data.reduce(
    (acc, item) => acc + Number(item.gasolina || 0),
    0
  );



  const totalDiesel = data.reduce(
    (acc, item) => acc + Number(item.diesel || 0),
    0
  );

  const pieData = [
    {
      name: "Gasolina",
      value: totalGasolina,
    },
    {
      name: "Diesel",
      value: totalDiesel,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Consumo de combustible
        </h2>

        <span className="text-xs text-gray-400">
          {new Date().getFullYear()}
        </span>
        <div className="flex flex-col gap-2">
          <ReporteCombustibleMensualButton />
          <ReporteCombustibleAnualButton />
        </div>
      </div>

      <div className="flex justify-center items-center gap-8 mb-6">
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-3">
          {pieData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-3"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <div>
                <div className="font-medium">
                  {item.name}
                </div>

                <div className="text-sm text-gray-500">
                  {item.value.toLocaleString()} L
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.2}
          />

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