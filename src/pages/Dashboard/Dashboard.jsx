import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import DashboardCards from "../../components/dashboard/DashboardCards";
import DashboardChart from "../../components/dashboard/DashboardChart";
import VehicleResumenTable from "../../components/dashboard/VehicleResumenTable";
import TopConsumo from "../../components/dashboard/TopConsumo";
import CombustibleMensualChart from "../../components/dashboard/CombustibleMensualChart";

import { useVehicleResumenStore } from "../../zustand/usevehicleResumenStore";

export default function Dashboard() {
  const { vehicles, loading, fetchVehiclesResumen } = useVehicleResumenStore();
  const navigate = useNavigate();

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
    const totalAlertasAceite = filteredVehicles.filter(
      (v) => v.necesitaMantenimiento
    ).length;

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
      totalAlertasAceite,
      totalViajes,
      totalLitros,
      totalGasto,
      totalKm,
      totalMantenimientos,
      consumoGeneral: totalKm > 0 ? (totalLitros / totalKm).toFixed(2) : 0,
      costoKm: totalKm > 0 ? (totalGasto / totalKm).toFixed(2) : 0,
    };
  }, [filteredVehicles]);

  const alertasAceite = useMemo(() => {
    return filteredVehicles.filter((v) => v.necesitaMantenimiento);
  }, [filteredVehicles]);

  const topConsumo = useMemo(() => {
    return [...filteredVehicles]
      .sort(
        (a, b) =>
          Number(b.gastoCombustible || 0) - Number(a.gastoCombustible || 0)
      )
      .slice(0, 5);
  }, [filteredVehicles]);

  const handleSelectAlertaAceite = (vehicle) => {
    navigate(`/vehiculos?cambioAceite=${vehicle.id}`);
  };

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

      <DashboardCards
        stats={stats}
        vehicles={filteredVehicles}
      />

      {alertasAceite.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm dark:border-red-900/50 dark:bg-red-950/30">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
                Alerta de cambio de aceite
              </h2>
              <p className="text-sm text-red-600 dark:text-red-300">
                {alertasAceite.length} vehículo(s) alcanzaron el rango de mantenimiento.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {alertasAceite.map((vehicle) => (
              <button
                type="button"
                key={vehicle.id}
                onClick={() => handleSelectAlertaAceite(vehicle)}
                className="rounded-xl border border-red-200 bg-white p-4 text-left transition hover:border-red-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-300 dark:border-red-900/50 dark:bg-gray-900"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {vehicle.codigo} - {vehicle.placa}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {vehicle.combustible} | límite {vehicle.limite} km
                    </p>
                  </div>

                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-200">
                    Cambio aceite
                  </span>
                </div>

                <p className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">
                  Recorridos: {vehicle.kmRecorridos} km
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

  <div className="xl:col-span-2 space-y-4">

    <DashboardChart vehicles={filteredVehicles} />

    {/* 🔥 NUEVO GRAFICO (igual estilo dashboard pro) */}
    <CombustibleMensualChart />

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
