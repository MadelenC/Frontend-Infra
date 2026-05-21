// src/Pdf/RequestPdf/sections/RequestSignatures.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/requestPdfStyles";

export default function RequestSignatures({ request }) {

  const fechaActual = new Date().toLocaleDateString("es-BO");

  return (
    <View style={styles.signatures}>

      {/* MECÁNICO */}
      <View style={styles.signBox}>

        <View style={styles.signLine} />

        <Text style={styles.signText}>
          {request?.insertador}
        </Text>

        <Text style={styles.signText}>
          Mecánico Automotores
        </Text>

        <Text style={styles.signDate}>
          Fecha: {fechaActual}
        </Text>

      </View>

      {/* JEFATURA */}
      <View style={styles.signBox}>

        <View style={styles.signLine} />

        <Text style={styles.signText}>
          JEFATURA DINF.
        </Text>

        <Text style={styles.signDate}>
          Fecha: P/....../....../.......
        </Text>

      </View>

      {/* ENCARGADO */}
      <View style={styles.signBox}>

        <View style={styles.signLine} />

        <Text style={styles.signText}>
          Enc. Automotores
        </Text>

        <Text style={styles.signDate}>
          Fecha: P/....../....../.......
        </Text>

      </View>

    </View>
  );
}