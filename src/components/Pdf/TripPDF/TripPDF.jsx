import React from "react";

import {
  Document,
  Page,
} from "@react-pdf/renderer";

import { styles } from "../common";

import {
  TripsReportHeaderPDF,
  TripsReportTablePDF,
  TripsReportFooterPDF,
} from "./ComPdf";

export default function TripsReportPDF({
  trips,
}) {
  return (
    <Document>

      <Page
        size="A4"
        orientation="portrait"
        style={styles.page}
      >

        <TripsReportHeaderPDF
          date={new Date().toLocaleDateString()}
        />

        <TripsReportTablePDF
          trips={trips}
        />

        <TripsReportFooterPDF />

      </Page>

    </Document>
  );
}