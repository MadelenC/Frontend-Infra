// ReportTripFooter.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function ReportTripFooter({ trip }) {
  return (
    <View style={styles.section}>

      <Text style={styles.sectionTitle}>
        VIÁTICOS Y COMBUSTIBLE
      </Text>

      <View style={styles.row}>
        <Text>Viático A: {trip?.viaticoa}</Text>
        <Text>Viático B: {trip?.viaticob}</Text>
        <Text>Viático C: {trip?.viaticoc}</Text>
      </View>

      <View style={styles.row}>
        <Text>Total Peajes: {trip?.totalpeim}</Text>
        <Text>Combustible: {trip?.combustotalu}</Text>
      </View>

      <View style={styles.row}>
        <Text>Descripción: {trip?.descripe}</Text>
      </View>

    </View>
  );
}