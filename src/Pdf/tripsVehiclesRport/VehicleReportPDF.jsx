import React from "react";
import { Document, Page, Image, StyleSheet, View } from "@react-pdf/renderer";

import VehicleReportHeader from "./VehicleReportHeader";
import VehicleReportTable from "./VehicleReportTable";
import VehicleReportFooter from "./VehicleReportFooter";
import bg from "../../Pdf/assets/uatfblanco.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    position: "relative",
  },

  watermark: {
    position: "absolute",
    top: 180,
    left: 90,
    width: 420,
    height: 420,
    opacity: 0.08,
  },
});

export default function VehicleReportPDF({ data, totales }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page} wrap>

        
        <Image fixed src={bg} style={styles.watermark} />

        <VehicleReportHeader />
        <VehicleReportTable data={data} totales={totales} />
        <VehicleReportFooter />

      </Page>
    </Document>
  );
}