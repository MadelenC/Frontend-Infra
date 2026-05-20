import React from "react";
import { Document, Page } from "@react-pdf/renderer";

import ReportTripHeader from "./components/ReportTripHeader";
import ReportTripBody from "./components/ReportTripBody";
import ReportTripTable from "./components/ReportTripTable";
import ReportTripFooter from "./components/ReportTripFooter";
import ReportTripSignatures from "./components/ReportTripSignatures";

import styles from "./styles/reportTripStyles";

export default function ReportTrip({ data }) {
  const trip = data?.data?.[0]; 

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ReportTripHeader trip={trip} />
        <ReportTripBody trip={trip} />
        <ReportTripTable trip={trip} />
        <ReportTripFooter trip={trip} />
        <ReportTripSignatures trip={trip} />
      </Page>
    </Document>
  );
}