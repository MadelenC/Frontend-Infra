// ReportTripReports.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import SectionTitle from "../components/SectionTitle";
import styles from "../styles/reportTripStyles";

export default function ReportTripReports({ trip }) {
  return (
    <View style={styles.section}>

      <SectionTitle title="INFORMES" />

      {/* INFORME DELEGACIÓN */}
      <View style={styles.reportBox}>

        <Text style={styles.reportLabel}>
          INFORME DE LA DELEGACIÓN
        </Text>

        <Text style={styles.reportValue}>
          {trip?.delegacion}
        </Text>

      </View>

      {/* INFORME VEHICULAR */}
      <View style={styles.reportBox}>

        <Text style={styles.reportLabel}>
          INFORME TÉCNICO VEHICULAR
        </Text>

        <Text style={styles.reportValue}>
          {trip?.descripmante}
        </Text>

      </View>

      {/* RECOMENDACIÓN */}
      <View style={styles.reportBox}>

        <Text style={styles.reportLabel}>
          RECOMENDACIÓN
        </Text>

        <Text style={styles.reportValue}>
          {trip?.recomendacion}
        </Text>

      </View>

    </View>
  );
}