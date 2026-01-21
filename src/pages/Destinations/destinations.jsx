import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import DestTable from "../../components/Destinations/tables/DestnTable";

export default function DestinationsPage() {
  return (
    <>
      <PageMeta
        title="Lista de Destinos | Infraestructura - UATF"
        description="Página de listado y control de destinos en el sistema de infraestructura UATF"
      />
      <PageBreadcrumb pageTitle="" />
      <div className="space-y-6 justify-center">
        <ComponentCard title="Tabla de Destinos">
          <DestTable />
        </ComponentCard>
      </div>
    </>
  );
}

