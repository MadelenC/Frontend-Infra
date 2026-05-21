// src/Pdf/RequestPdf/sections/RequestTexts.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/requestPdfStyles";

export default function RequestTexts({ request }) {

  return (
    <View>

      <View style={styles.paragraphBox}>

        <Text style={styles.paragraphTitle}>
          Justificación:
        </Text>

        <Text style={styles.paragraphText}>
          {request?.justificacion}
        </Text>

      </View>

      <View style={styles.paragraphBox}>

        <Text style={styles.paragraphTitle}>
          Observación:
        </Text>

        <Text style={styles.paragraphText}>
          {request?.observacion}
        </Text>

      </View>

    </View>
  );
}