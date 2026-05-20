import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function ReportTripSignatures({ trip }) {
  return (
    <View style={styles.signaturesContainer}>

      <View style={styles.signatureBox}>
        <Text>_____________________</Text>
        <Text>CONDUCTOR</Text>
        <Text>{trip?.chofer?.nombres}</Text>
      </View>

      <View style={styles.signatureBox}>
        <Text>_____________________</Text>
        <Text>ENCARGADO</Text>
        <Text>{trip?.encargado?.nombres}</Text>
      </View>

      <View style={styles.signatureBox}>
        <Text>_____________________</Text>
        <Text>INFRAESTRUCTURA</Text>
        <Text>UATF</Text>
      </View>

    </View>
  );
}