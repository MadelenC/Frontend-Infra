// ReportTripSignatures.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import SectionTitle from "../components/SectionTitle";
import styles from "../styles/reportTripStyles";

export default function ReportTripSignatures() {
  return (
    <View style={styles.section}>

      <SectionTitle title="FIRMAS" />

      <View style={styles.signatureRow}>

        <View style={styles.signatureBox}>
          <Text>Conductor</Text>
        </View>

        <View style={styles.signatureBox}>
          <Text>Responsable</Text>
        </View>

        <View style={styles.signatureBox}>
          <Text>Jefe de Infraestructura</Text>
        </View>

      </View>

    </View>
  );
}