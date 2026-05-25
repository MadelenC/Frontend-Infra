import React, { useEffect, useMemo, useState } from "react";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardChart from "../../components/dashboard/DashboardChart";
import VehicleResumenTable from "../../components/dashboard/VehicleResumenTable";
import TopConsumo from "../../components/dashboard/TopConsumo";

import { useVehicleResumenStore } from "../../zustand/usevehicleResumenStore";

export default function Dashboard() {
  const { vehicles, loading, fetchVehiclesResumen } = useVehicleResumenStore();

  const [estado, setEstado] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVehiclesResumen(estado);
  }, [estado]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const text = `${v.codigo} ${v.placa} ${v.marca} ${v.modelo} ${v.estado}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [vehicles, search]);

  const stats = useMemo(() => {
    const totalVehiculos = filteredVehicles.length;

    const totalViajes = filteredVehicles.reduce(
      (sum, v) => sum + Number(v.cantidadViajes || 0),
      0
    );

    const totalLitros = filteredVehicles.reduce(
      (sum, v) => sum + Number(v.litrosCombustible || 0),
      0
    );

    const totalGasto = filteredVehicles.reduce(
      (sum, v) => sum + Number(v.gastoCombustible || 0),
      0
    );

    const totalKm = filteredVehicles.reduce(
      (sum, v) => sum + Number(v.kmViajes || 0),
      0
    );

    const totalMantenimientos = filteredVehicles.reduce(
      (sum, v) => sum + Number(v.cantidadMantenimientos || 0),
      0
    );

    return {
      totalVehiculos,
      totalViajes,
      totalLitros,
      totalGasto,
      totalKm,
      totalMantenimientos,
      consumoGeneral: totalKm > 0 ? (totalLitros / totalKm).toFixed(2) : 0,
      costoKm: totalKm > 0 ? (totalGasto / totalKm).toFixed(2) : 0,
    };
  }, [filteredVehicles]);

  const topConsumo = useMemo(() => {
    return [...filteredVehicles]
      .sort(
        (a, b) =>
          Number(b.gastoCombustible || 0) - Number(a.gastoCombustible || 0)
      )
      .slice(0, 5);
  }, [filteredVehicles]);

  return (
    <div className="space-y-6">
      <PageMeta title="Dashboard" description="Sistema" />
      <PageBreadcrumb pageTitle="Dashboard" />

      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Dashboard de Flota Vehicular</h1>
        <p className="mt-1 text-sm text-slate-300">
          Control de combustible, viajes, kilometraje y mantenimiento.
        </p>
      </div>

      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DashboardChart vehicles={filteredVehicles} />
        </div>

        <TopConsumo vehicles={topConsumo} />
      </div>

      <VehicleResumenTable
        vehicles={filteredVehicles}
        loading={loading}
        estado={estado}
        setEstado={setEstado}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
}