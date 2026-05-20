import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function ReportTripHeader() {
  return (
    <View style={styles.headerBox}>
      <Text style={styles.title}>
        INFORME GENERAL DE VIAJE
      </Text>
    </View>
  );
}