import React from "react";
import {
  Document,
  Page,
  Image,
  View,
  Text,
} from "@react-pdf/renderer";

import logo from "../assets/logouatf.png";

import UsersReportHeader from "../UsersReport/UsersReportHeader";
import CombustibleMensualTable from "./TablaMensualCombustible";
import UsersReportFooter from "../UsersReport/UsersReportFooter";

export default function ReporteCombustibleMensualPDF({
  mensual,
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
          title="REPORTE DE CONSUMO DE COMBUSTIBLE MENSUAL"
        />

        <CombustibleMensualTable
          data={mensual}
        />

        <UsersReportFooter />
      </Page>
    </Document>
  );
}