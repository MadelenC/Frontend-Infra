import React from "react";
import { View, Text, Image } from "@react-pdf/renderer";
import { styles } from "../common/pdfStyles"; 
import logo from "../assets/logouatf.png";

export default function VehicleReportHeader() {
  return (
    <View>
      <Text style={styles.subtitle}>
          UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
        </Text>

        <Text style={styles.subtitle}>
          DEPARTAMENTO DE INFRAESTRUCTURA
        </Text>

        <Text style={styles.subtitle}>
          SECCIÓN AUTOMOTORES
        </Text>

      

      <View style={{ alignItems: "center" }}>
        <Image src={logo} style={{ width: 70, height: 70 }} />
      </View>

      <Text style={styles.subtitle}>
        FLOTA DE BUSES U.A.T.F.
      </Text>

      <Text style={styles.subtitle}>
        CUADRO GENERAL DE VIAJES GESTIÓN 2026
      </Text>
     

    </View>
  );
}