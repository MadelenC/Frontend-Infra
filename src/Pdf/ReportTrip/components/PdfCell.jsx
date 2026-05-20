import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function PdfCell({ label, value, width = "25%" }) {
  return (
    <View style={[styles.cell, { width }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || ""}</Text>
    </View>
  );
}