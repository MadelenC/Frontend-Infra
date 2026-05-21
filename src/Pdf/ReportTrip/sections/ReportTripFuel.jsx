// ReportTripFuel.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import SectionTitle from "../components/SectionTitle";
import styles from "../styles/reportTripStyles";

export default function ReportTripFuel({ trip }) {
  return (
    <View style={styles.section}>

      <SectionTitle title="VIÁTICOS Y COMBUSTIBLE" />

      <View style={styles.row}>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            VIÁTICOA:  {trip?.viaticoa ?? "0"}
          </Text>

        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            VIÁTICOB: {trip?.viaticob ?? "0"}
          </Text>
        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            VIÁTICOC:  {trip?.viaticoc ?? "0"}
          </Text>
        </View>

      </View>

      <View style={styles.fuelRow}>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            RECARGUE1: {trip?.recargue1 ?? "0"}
          </Text>
        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            COMPRA1: {trip?.compra1 ?? "0"}
          </Text>
        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            RECARGUE2: {trip?.recargue2 ?? "0"}
          </Text>
        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            COMPRA2: {trip?.compra2 ?? "0"}
          </Text>
        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            RECARGUE3: {trip?.recargue3 ?? "0"}
          </Text>
        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            COMPRA3: {trip?.compra3 ?? "0"}
          </Text>
        </View>

      </View>

      {/* TOTALES */}
      <View style={styles.row}>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            TOTAL RECARGUE: {trip?.combustotalu ?? "0"}
          </Text>
        </View>

        <View style={styles.fuelCell}>
          <Text style={styles.fuelLabel}>
            TOTAL COMPRA:  {trip?.combustotalco ?? "0"}
          </Text>

        </View>

      </View>

    </View>
  );
}