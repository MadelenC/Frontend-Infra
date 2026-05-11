import React from "react";

import {
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

import { styles } from "../../common";

import logoUATF from "../../assets/logouatf.png";

export default function TripsReportHeaderPDF({
  date,
}) {
  return (

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >

      <Image
        src={logoUATF}
        style={{
          width: 70,
          height: 70,
        }}
      />

      <View style={{ flex: 1 }}>

        <Text style={styles.subtitle}>
          UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
        </Text>

        <Text style={styles.subtitle}>
          DEPARTAMENTO DE INFRAESTRUCTURA
        </Text>

        <Text style={styles.subtitle}>
          SECCIÓN AUTOMOTORES
        </Text>

        <Text style={styles.title}>
          CUADRO GENERAL DE VIAJES GESTIÓN 2026
        </Text>

        <Text style={styles.center}>
          {date}
        </Text>

      </View>

    </View>
  );
}