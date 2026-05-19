import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

export default function PresupuestoRows({
  detalles,
  total8T
}) {

  return (

    <View>

      {
        detalles.map((d, i) => (

          <View
            key={i}
            style={styles.presupuestoRow}
          >

            <View style={styles.colCant}>
              <Text style={styles.bodyCenter}>
                {d.cantidad}
              </Text>
            </View>

            <View style={styles.colUnidad}>
              <Text style={styles.bodyCenter}>
                {d.unidad}
              </Text>
            </View>

            <View style={styles.colDescripcion}>
              <Text style={styles.bodyLeft}>
                {d.descripcion}
              </Text>
            </View>

            <View style={styles.colPU}>
              <Text style={styles.bodyRight}>
                {d.precio}
              </Text>
            </View>

            <View style={styles.colTotal}>
              <Text style={styles.bodyRight}>
                {d.total}
              </Text>
            </View>

         

          </View>

          

        ))
      }

       {/* TOTAL GENERAL */}

  <View style={styles.presupuestoRow}>

    <View style={styles.colCant}>
      <Text></Text>
    </View>

    <View style={styles.colUnidad}>
      <Text></Text>
    </View>

    <View style={styles.colDescripcion}>
      <Text style={styles.headerText}>
        TOTAL (A) BS
      </Text>
    </View>

    <View style={styles.colPU}>
      <Text></Text>
    </View>

    <View style={styles.colTotal}>
      <Text style={styles.bodyRight}>
        {total8T}
      </Text>
    </View>

  </View>

    </View>

  );

}