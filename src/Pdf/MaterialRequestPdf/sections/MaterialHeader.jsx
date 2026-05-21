import React from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "../styles/materialRequestStyles";

export default function MaterialHeader({ request }) {

  return (

    <>

      <View style={styles.header}>

        <Text style={styles.title}>
          "U.A.T.F." DEPTO. DE INFRAESTRUCTURA
        </Text>

        <Text style={styles.subtitle}>
          SOLICITUD DE TRABAJO INTERNO
        </Text>

        <Text style={styles.subtitle}>
          Mecánica Automotriz
        </Text>

        <Text style={styles.system}>
          Sistema Web Departamento de Infraestructura U.A.T.F.
        </Text>

      </View>

      {/* FILA 1 */}
      <View style={styles.row}>

        <View style={[styles.cell, { width: "45%" }]}>
          <Text style={styles.label}>
            Solicitante:
          </Text>

          <Text style={styles.value}>
            {request?.solicitud?.chofer}
          </Text>
        </View>

        <View style={[styles.cell, { width: "20%" }]}>
          <Text style={styles.label}>
            Fecha:
          </Text>

          <Text style={styles.value}>
            {request?.solicitud?.fecha}
          </Text>
        </View>

        <View style={[styles.cell, { width: "15%" }]}>
          <Text style={styles.label}>
            Km:
          </Text>

          <Text style={styles.value}>
            {request?.km}
          </Text>
        </View>

        <View style={[styles.cell, { width: "20%" }]}>
          <Text style={styles.label}>
            Sol.M#:
          </Text>

          <Text style={styles.value}>
            {request?.id}
          </Text>
        </View>

      </View>

      {/* FILA 2 */}
      <View style={styles.row}>

        <View style={[styles.cell, { width: "35%" }]}>
          <Text style={styles.label}>
            Mobilidad:
          </Text>

          <Text style={styles.value}>
            {request?.solicitud?.vehiculo?.tipog}
          </Text>
        </View>

        <View style={[styles.cell, { width: "20%" }]}>
          <Text style={styles.label}>
            Placa:
          </Text>

          <Text style={styles.value}>
            {request?.solicitud?.vehiculo?.placa}
          </Text>
        </View>

        <View style={[styles.cell, { width: "30%" }]}>
          <Text style={styles.label}>
            Recepción:
          </Text>

          <Text style={styles.value}>
            P/......../......../........
          </Text>
        </View>

        <View style={[styles.cell, { width: "15%" }]}>
          <Text style={styles.label}>
            Hora:
          </Text>

          <Text style={styles.value}>
            ......:......
          </Text>
        </View>

      </View>

    </>
  );
}