// src/Pdf/RequestPdf/sections/RequestHeader.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/requestPdfStyles";

export default function RequestHeader({ request }) {

  return (
    <View>

      <View style={styles.topHeader}>

        <Text style={styles.miniTitle}>
          "U.A.T.F." DEPARTAMENTO DE INFRAESTRUCTURA
        </Text>

        <Text style={styles.title}>
          SOLICITUD DE REPUESTOS Y LUBRICANTES PARA VEHÍCULOS
        </Text>

      </View>

      {/* FILA 1 */}
      <View style={styles.row}>

        <View style={[styles.cell, { width: "25%" }]}>
          <Text style={styles.label}>SOL. No.:{request?.id}</Text>
          
        </View>

        <View style={[styles.cell, { width: "35%" }]}>
          <Text style={styles.label}>Movilidad: {request?.solicitud?.vehiculo?.tipog}</Text>
          
        </View>

        <View style={[styles.cell, { width: "25%" }]}>
          <Text style={styles.label}>Chofer: {request?.solicitud?.chofer}</Text>
        </View>

        <View style={[styles.lastCell, { width: "15%" }]}>
          <Text style={styles.label}>Km.: {request?.km}</Text>
          
        </View>

      </View>

      {/* FILA 2 */}
      <View style={styles.row}>

        <View style={[styles.lastCell, { width: "100%" }]}>
          <Text style={styles.label}>
            Trabajo solicitado y cumplió su vida de uso
          </Text>

          <Text style={styles.value}>
            {request?.solicitud?.descripsoli}
          </Text>
        </View>

      </View>

    </View>
  );
}