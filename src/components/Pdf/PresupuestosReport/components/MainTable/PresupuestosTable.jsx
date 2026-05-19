import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

import { safe } from "../../../../../utils/safe";

export default function PresupuestoTable({
  detalles = [],
}) {

  return (

    <View style={styles.presupuestoTable}>

      

      <View style={styles.presupuestoRow}>

        <View style={styles.colCant}>
          <Text style={styles.headerText}>
            CANT
          </Text>
        </View>

        <View style={styles.colUnidad}>
          <Text style={styles.headerText}>
            UNIDAD
          </Text>
        </View>

        <View style={styles.colDescripcion}>
          <Text style={styles.headerText}>
            DESCRIPCIÓN
          </Text>
        </View>

        <View style={styles.colPU}>
          <Text style={styles.headerText}>
            P/U BS
          </Text>
        </View>

        <View style={styles.colTotal}>
          <Text style={styles.headerText}>
            TOTAL BS
          </Text>
        </View>

      </View>

   
      {
        detalles.map((d, i) => (

          <View
            key={i}
            style={styles.presupuestoRow}
          >

            <View style={styles.colCant}>
              <Text style={styles.bodyCenter}>
                {safe(d.cantidad)}
              </Text>
            </View>

            <View style={styles.colUnidad}>
              <Text style={styles.bodyCenter}>
                {safe(d.unidad)}
              </Text>
            </View>

            <View style={styles.colDescripcion}>
              <Text style={styles.bodyLeft}>
                {safe(d.descripcion)}
              </Text>
            </View>

            <View style={styles.colPU}>
              <Text style={styles.bodyRight}>
                {safe(d.precio)}
              </Text>
            </View>

            <View style={styles.colTotal}>
              <Text style={styles.bodyRight}>
                {safe(d.total)}
              </Text>
            </View>

          </View>

        ))
      }

    </View>

  );

}

