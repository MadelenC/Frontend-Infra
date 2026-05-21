// ReportTripExpenses.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import SectionTitle from "../components/SectionTitle";
import styles from "../styles/reportTripStyles";

export default function ReportTripExpenses({ trip }) {

  const devolucion = trip?.informesdebolu?.[0];

  return (
    <View style={styles.section}>

      <SectionTitle title="PEAJES E IMPREVISTOS" />

      <View style={{ padding: 5 }}>
        <Text style={styles.label}>
          DESCRIPCIÓN: {trip?.descripe}
        </Text>
      </View>

     
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
          borderTop: 1,
        }}
      >

        <View style={{ width: "32%" }}>
          <Text style={styles.label}>
            MONTO DE PEAJES
          </Text>

          <Text style={styles.value}>
            {trip?.montope}
          </Text>
        </View>

        <View style={{ width: "32%" }}>
          <Text style={styles.label}>
            MONTO IMPREVISTOS
          </Text>

          <Text style={styles.value}>
            {trip?.montoim}
          </Text>
        </View>

        <View style={{ width: "32%" }}>
          <Text style={styles.label}>
            TOTAL
          </Text>

          <Text style={styles.value}>
            {trip?.totalpeim}
          </Text>
        </View>

      </View>

      {/* DEVOLUCIONES */}
      <SectionTitle title="DEVOLUCIONES" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
          borderTop: 1,
        }}
      >

        <View style={{ width: "24%" }}>
          <Text style={styles.label}>
            COMBUSTIBLE
          </Text>

          <Text style={styles.value}>
            {devolucion?.combus ?? "0"}
          </Text>
        </View>

        <View style={{ width: "24%" }}>
          <Text style={styles.label}>
            PEAJES
          </Text>

          <Text style={styles.value}>
            {devolucion?.peaje ?? "0"}
          </Text>
        </View>

        <View style={{ width: "24%" }}>
          <Text style={styles.label}>
            IMPREVISTOS
          </Text>

          <Text style={styles.value}>
            {devolucion?.impre ?? "0"}
          </Text>
        </View>

        <View style={{ width: "24%" }}>
          <Text style={styles.label}>
            TOTAL
          </Text>

          <Text style={styles.value}>
            {devolucion?.totalcopeim ?? "0"}
          </Text>
        </View>

      </View>

    </View>
  );
}