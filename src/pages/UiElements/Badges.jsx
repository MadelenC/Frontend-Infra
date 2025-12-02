import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Badge from "../../components/ui/badge/Badge";
import { BiGhost } from "react-icons/bi";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

export default function Badges() {
  return (
    <div>
      <PageMeta
        title="React.js Badges Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Badges Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="With Light Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge variant="light" color="primary">
              Primary
            </Badge>
            <Badge variant="light" color="success">
              Success
            </Badge>{" "}
            <Badge variant="light" color="error">
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info">
              Info
            </Badge>
            <Badge variant="light" color="light">
              Light
            </Badge>
            <Badge variant="light" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="With Solid Background">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            {/* Light Variant */}
            <Badge variant="solid" color="primary">
              Primary
            </Badge>
            <Badge variant="solid" color="success">
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error">
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning">
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info">
              Info
            </Badge>
            <Badge variant="solid" color="light">
              Light
            </Badge>
            <Badge variant="solid" color="dark">
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Light Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary" startIcon={<BiGhost />}>
              Primary
            </Badge>
            <Badge variant="light" color="success" startIcon={<BiGhost />}>
              Success
            </Badge>{" "}
            <Badge variant="light" color="error" startIcon={<BiGhost />}>
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning" startIcon={<BiGhost />}>
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info" startIcon={<BiGhost />}>
              Info
            </Badge>
            <Badge variant="light" color="light" startIcon={<BiGhost />}>
              Light
            </Badge>
            <Badge variant="light" color="dark" startIcon={<BiGhost />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Solid Background with Left Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="solid" color="primary" startIcon={<BiGhost />}>
              Primary
            </Badge>
            <Badge variant="solid" color="success" startIcon={<BiGhost />}>
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" startIcon={<BiGhost />}>
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" startIcon={<BiGhost />}>
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" startIcon={<BiGhost />}>
              Info
            </Badge>
            <Badge variant="solid" color="light" startIcon={<BiGhost />}>
              Light
            </Badge>
            <Badge variant="solid" color="dark" startIcon={<BiGhost />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Light Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="light" color="primary" endIcon={<BiGhost />}>
              Primary
            </Badge>
            <Badge variant="light" color="success" endIcon={<BiGhost />}>
              Success
            </Badge>{" "}
            <Badge variant="light" color="error" endIcon={<BiGhost />}>
              Error
            </Badge>{" "}
            <Badge variant="light" color="warning" endIcon={<BiGhost />}>
              Warning
            </Badge>{" "}
            <Badge variant="light" color="info" endIcon={<BiGhost />}>
              Info
            </Badge>
            <Badge variant="light" color="light" endIcon={<BiGhost />}>
              Light
            </Badge>
            <Badge variant="light" color="dark" endIcon={<BiGhost />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
        <ComponentCard title="Solid Background with Right Icon">
          <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
            <Badge variant="solid" color="primary" endIcon={<BiGhost />}>
              Primary
            </Badge>
            <Badge variant="solid" color="success" endIcon={<BiGhost />}>
              Success
            </Badge>{" "}
            <Badge variant="solid" color="error" endIcon={<BiGhost />}>
              Error
            </Badge>{" "}
            <Badge variant="solid" color="warning" endIcon={<BiGhost />}>
              Warning
            </Badge>{" "}
            <Badge variant="solid" color="info" endIcon={<BiGhost />}>
              Info
            </Badge>
            <Badge variant="solid" color="light" endIcon={<BiGhost />}>
              Light
            </Badge>
            <Badge variant="solid" color="dark" endIcon={<BiGhost />}>
              Dark
            </Badge>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
