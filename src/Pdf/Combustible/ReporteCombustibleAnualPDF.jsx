import React from "react";
import {
  Document,
  Page,
  Image,
} from "@react-pdf/renderer";

import logo from "../assets/logouatf.png";

import UsersReportHeader from "../UsersReport/UsersReportHeader";
import CombustibleAnualTable from "./CombustibleAnualTable";
import UsersReportFooter from "../UsersReport/UsersReportFooter";

export default function ReporteCombustibleAnualPDF({
  anual,
}) {
  return (
    <Document>
      <Page
        size="LETTER"
        style={{
          padding: 25,
          fontSize: 8,
          position: "relative",
        }}
      >
        <Image
          src={logo}
          style={{
            position: "absolute",
            top: "32%",
            left: "30%",
            width: 240,
            height: 300,
            opacity: 0.06,
          }}
        />

        <UsersReportHeader
          title="REPORTE DE CONSUMO DE COMBUSTIBLE ANUAL"
        />

        <CombustibleAnualTable
          data={anual}
        />

        <UsersReportFooter />
      </Page>
    </Document>
  );
}