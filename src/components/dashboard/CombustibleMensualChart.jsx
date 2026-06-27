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
import { useEffect, useMemo, useState } from "react";
import { useVehicleResumenStore } from "../../zustand/usevehicleResumenStore";
import { formatChartData } from "../../helpers/formatChartData";
import ReporteCombustibleMensualButton from "../pdf-buttons/ReporteCombustibleMensualButton";
import ReporteCombustibleAnualButton from "../pdf-buttons/ReporteCombustibleAnualButton";

const COLORS = ["#3B82F6", "#374151"];

export default function CombustibleMensualChart() {
  const {
    chartData,
    vehicles,
    loading,
    fetchCombustibleMensual,
    fetchCombustibleAnual,
  } = useVehicleResumenStore();

  const currentYear = new Date().getFullYear();
  const [filters, setFilters] = useState({
    year: currentYear,
    placa: "",
    fechaInicio: "",
    fechaFin: "",
  });

  useEffect(() => {
    fetchCombustibleMensual({ year: currentYear });
    fetchCombustibleAnual({ year: currentYear });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchCombustibleMensual(filters);
    fetchCombustibleAnual(filters);
  };

  const handleReset = () => {
    const cleanFilters = {
      year: currentYear,
      placa: "",
      fechaInicio: "",
      fechaFin: "",
    };

    setFilters(cleanFilters);
    fetchCombustibleMensual(cleanFilters);
    fetchCombustibleAnual(cleanFilters);
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

  const totalGastoGasolina = data.reduce(
    (acc, item) => acc + Number(item.gastoGasolina || 0),
    0
  );

  const totalGastoDiesel = data.reduce(
    (acc, item) => acc + Number(item.gastoDiesel || 0),
    0
  );

  const vehicleOptions = useMemo(() => {
    const unique = new Map();

    vehicles.forEach((vehicle) => {
      if (vehicle.placa) {
        unique.set(String(vehicle.placa), vehicle);
      }
    });

    return Array.from(unique.values());
  }, [vehicles]);

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
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Consumo de combustible
        </h2>

       
        <div className="flex flex-row gap-2 items-center">
          <ReporteCombustibleMensualButton />
          <ReporteCombustibleAnualButton />
        </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6"
        >
          <input
            type="number"
            name="year"
            min="2000"
            max="2100"
            value={filters.year}
            onChange={handleChange}
            placeholder="Año"
            className="rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="search"
            name="placa"
            list="placas-combustible"
            value={filters.placa}
            onChange={handleChange}
            placeholder="Buscar placa"
            className="rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <datalist id="placas-combustible">
            {vehicleOptions.map((vehicle) => (
              <option
                key={vehicle.id}
                value={vehicle.placa}
              >
                {vehicle.codigo} - {vehicle.combustible}
              </option>
            ))}
          </datalist>

          <input
            type="date"
            name="fechaInicio"
            value={filters.fechaInicio}
            onChange={handleChange}
            className="rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="date"
            name="fechaFin"
            value={filters.fechaFin}
            onChange={handleChange}
            className="rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Buscar
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="rounded-xl border px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Limpiar
          </button>
        </form>
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

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/20">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Gasto gasolina
          </p>
          <p className="text-xl font-bold text-blue-900 dark:text-blue-100">
            Bs. {totalGastoGasolina.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Gasto diesel
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            Bs. {totalGastoDiesel.toLocaleString()}
          </p>
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
            name="Gasolina(Litros)"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="diesel"
            fill="#374151"
            name="Diesel (Litros)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
          Gasto mensual en Bs.
        </h3>

        <ResponsiveContainer width="100%" height={260}>
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
              dataKey="gastoGasolina"
              fill="#3B82F6"
              name="Gasolina Bs."
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="gastoDiesel"
              fill="#374151"
              name="Diesel Bs."
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
