import { useEffect } from "react";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import { useDashboardStore }
from "../../zustand/useDashboardStore";

export default function Dashboard() {

  const {
    stats,
    loading,
    fetchDashboardStats,
  } = useDashboardStore();

  useEffect(() => {

    fetchDashboardStats();

  }, []);

  return (

    <div className="space-y-6">

      <PageMeta
        title="Dashboard"
        description="Sistema"
      />

      <PageBreadcrumb pageTitle="Dashboard" />

      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

      </div>

      {/* KPIs */}

      <div className="grid grid-cols-3 gap-4">

        <div className="p-4 border rounded-xl">

          <p>Viajes</p>

          <h2 className="text-2xl font-bold">

            {loading
              ? "..."
              : stats?.viajes || 0}

          </h2>

        </div>

        <div className="p-4 border rounded-xl">

          <p>Vehículos</p>

          <h2 className="text-2xl font-bold">

            {loading
              ? "..."
              : stats?.vehiculos || 0}

          </h2>

        </div>

        <div className="p-4 border rounded-xl">

          <p>Presupuestos</p>

          <h2 className="text-2xl font-bold">

            {loading
              ? "..."
              : stats?.presupuestos || 0}

          </h2>

        </div>

      </div>

    </div>
  );
}