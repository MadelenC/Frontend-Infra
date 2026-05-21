// src/Pdf/RequestPdf/sections/RequestItems.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/requestPdfStyles";

export default function RequestItems({ request }) {

  const items = [];

  for (let i = 1; i <= 11; i++) {

    if (request[`descripcion${i}`]) {

      items.push({
        cantidad: request[`cantidad${i}`],
        medida: request[`medida${i}`],
        descripcion: request[`descripcion${i}`],
      });
    }
  }

  return (
    <View>

      {/* HEADER */}
      <View style={styles.tableHeader}>

        <View style={[styles.cell, { width: "20%" }]}>
          <Text style={styles.tableTitle}>
            Cantidad
          </Text>
        </View>

        <View style={[styles.cell, { width: "20%" }]}>
          <Text style={styles.tableTitle}>
            Unidad de Medida
          </Text>
        </View>

        <View style={[styles.lastCell, { width: "60%" }]}>
          <Text style={styles.tableTitle}>
            Descripción
          </Text>
        </View>

      </View>

      {/* ITEMS */}
      {items.map((item, index) => (

        <View style={styles.row} key={index}>

          <View style={[styles.cell, { width: "20%" }]}>
            <Text style={styles.tableText}>
              {item.cantidad}
            </Text>
          </View>

          <View style={[styles.cell, { width: "20%" }]}>
            <Text style={styles.tableText}>
              {item.medida}
            </Text>
          </View>

          <View style={[styles.lastCell, { width: "60%" }]}>
            <Text style={styles.tableText}>
              {item.descripcion}
            </Text>
          </View>

        </View>

      ))}

    </View>
  );
}