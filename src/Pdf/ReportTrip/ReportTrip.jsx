import React from "react";

import {
  Document,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

import styles from "./styles/reportTripStyles";

import ReportTripGeneral from "./sections/ReportTripGeneral";
import ReportTripRoute from "./sections/ReportTripRoute";
import ReportTripFuel from "./sections/ReportTripFuel";
import ReportTripExpenses from "./sections/ReportTripExpenses";
import ReportTripReports from "./sections/ReportTripReports";
import ReportTripSignatures from "./sections/ReportTripSignatures";

import logo from "../../Pdf/assets/logouatf.png";

export default function ReportTrip({ trip }) {

  return (

    <Document>

      <Page
        size="LETTER"
        style={[
          styles.page,
          {
            position: "relative",
          },
        ]}
      >

     
        <Image
          fixed
          src={logo}
          style={{
            position: "absolute",
            top: "30%",
            left: "28%",
            width: 260,
            height: 320,
            opacity: 0.07,
          }}
        />

      
        <Image
          fixed
          src={logo}
          style={{
            position: "absolute",
            top: 15,
            right: 20,
            width: 55,
            height: 55,
          }}
        />

        <View style={styles.headerContainer}>

          <Text style={styles.universityText}>
            UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
          </Text>

          <Text style={styles.reportTitle}>
            INFORME GENERAL DE VIAJE
          </Text>

        </View>

      
        <ReportTripGeneral trip={trip} />

        <ReportTripRoute trip={trip} />

        <ReportTripFuel trip={trip} />

        <ReportTripExpenses trip={trip} />

        <ReportTripReports trip={trip} />

        <ReportTripSignatures />

    
        <View
          fixed
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >

          <Text
            style={{
              fontSize: 7,
              color: "gray",
            }}
          >
            Sistema Web Departamento de Infraestructura U.A.T.F.
          </Text>

        </View>

      </Page>

    </Document>
  );
}