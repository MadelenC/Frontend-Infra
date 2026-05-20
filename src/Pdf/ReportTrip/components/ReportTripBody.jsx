import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function ReportTripBody({ trip }) {
  return (
    <View style={styles.section}>

      <Text style={styles.sectionTitle}>DATOS GENERALES</Text>

      <View style={styles.row}>
        <Text>Vehículo: {trip?.vehiculo?.tipog}</Text>
        <Text>Placa: {trip?.vehiculo?.placa}</Text>
      </View>

      <View style={styles.row}>
        <Text>Chofer: {trip?.chofer?.nombres} {trip?.chofer?.apellidos}</Text>
      </View>

      <View style={styles.row}>
        <Text>Encargado: {trip?.encargado?.nombres} {trip?.encargado?.apellidos}</Text>
      </View>

      <View style={styles.row}>
        <Text>Pasajeros: {trip?.pasajeros}</Text>
        <Text>Días: {trip?.dias}</Text>
      </View>

    </View>
  );
}