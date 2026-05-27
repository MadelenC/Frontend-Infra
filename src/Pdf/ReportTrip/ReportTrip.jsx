import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";

import styles from "./styles/reportTripStyles";

import ReportTripGeneral from "./sections/ReportTripGeneral";
import ReportTripRoute from "./sections/ReportTripRoute";
import ReportTripFuel from "./sections/ReportTripFuel";
import ReportTripExpenses from "./sections/ReportTripExpenses";
import ReportTripReports from "./sections/ReportTripReports";
import ReportTripSignatures from "./sections/ReportTripSignatures";

export default function ReportTrip({ trip }) {
  return (
    <Document>

      <Page
        size="LETTER"
        style={styles.page}
      >

        <View style={styles.headerContainer}>

          <Text style={styles.universityText}>
            UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
          </Text>

          <Text style={styles.reportTitle}>
            INFORME GENERAL DE VIAJE
          </Text>

        </View>

        {/* CONTENIDO */}
        <ReportTripGeneral trip={trip} />

        <ReportTripRoute trip={trip} />

        <ReportTripFuel trip={trip} />

        <ReportTripExpenses trip={trip} />

        <ReportTripReports trip={trip} />

        <ReportTripSignatures />

      </Page>

    </Document>
  );
}