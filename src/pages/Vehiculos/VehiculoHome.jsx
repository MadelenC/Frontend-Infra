import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import VehicleTable from "../../components/vehiculo/tables/VehicleTable";

export default function FormElements() {
  return (
    <>
      <PageMeta
        title="React.js Vehicle Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Vehicle Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="" />

      {/* Contenedor principal con espaciado vertical */}
      <div className="space-y-6 justify-center">
        {/* Componente tipo tarjeta que envuelve la tabla */}
        <ComponentCard title="Lista de Vehículos">
          <VehicleTable />
        </ComponentCard>
      </div>
    </>
  );
}

