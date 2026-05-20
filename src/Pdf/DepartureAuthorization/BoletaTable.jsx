// BoletaTable.jsx

import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "./styles/boletaStyles";

const BoletaTable = () => {

  return (

    <View style={styles.container}>

      <Text style={styles.reportTitle}>
        INFORME DEL RESPONSABLE
      </Text>

      <View style={styles.reportBox}>

        <View style={styles.dottedLine} />

        <View style={styles.dottedLine} />

        <View style={styles.dottedLine} />

        <View style={styles.dottedLine} />

        <View style={styles.firmaLine} />

        <Text style={styles.firmaText}>
          FIRMA
        </Text>

        <Text style={styles.fecha}>
          Fecha:
        </Text>

      </View>

    </View>
  );
};

export default BoletaTable;