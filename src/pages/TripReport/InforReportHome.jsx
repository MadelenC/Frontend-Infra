import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import TripReportInforTable from "../../components/TripReport/Tables/Minforme/TripReportInforTable";

export default function InforReportHome() {
  return (
    <>
      <PageMeta
        title="Informes de Viajes | Panel de Administración"
        description="Gestión de informes de viajes del sistema"
      />

      <PageBreadcrumb pageTitle="Lista de Informes de Viajes" />

      <div className="space-y-6">
        <ComponentCard title="Lista de Informes de Viajes">
          <TripReportInforTable  />
        </ComponentCard>
      </div>
    </>
  );
}