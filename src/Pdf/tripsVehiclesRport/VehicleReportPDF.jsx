import React from "react";
import { Document, Page } from "@react-pdf/renderer";

import VehicleReportHeader from "./VehicleReportHeader";
import VehicleReportTable from "./VehicleReportTable";
import VehicleReportFooter from "./VehicleReportFooter";

export default function VehicleReportPDF({ data, totales }) {
  return (
    <Document>

      <Page size="A4" style={{ padding: 20 }}>

        <VehicleReportHeader />

        <VehicleReportTable data={data} 
        totales={totales}
        />

        <VehicleReportFooter />

      </Page>

    </Document>
  );
}