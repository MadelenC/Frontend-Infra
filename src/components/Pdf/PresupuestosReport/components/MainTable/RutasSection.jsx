import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

import { safe } from "../../../../../utils/safe";

export default function RutasSection({
  rutas,
}) {

  const filas = [];

  rutas.forEach((r) => {

    if (r.destino_id) {

      filas.push({
        ruta: r.destino_id,
        km: r.kilometraje_principal,
      });

    }

    if (r.dest1) {

      filas.push({
        ruta: r.dest1,
        km: r.k1,
      });

    }

    if (r.dest2) {

      filas.push({
        ruta: r.dest2,
        km: r.k2,
      });

    }

    if (r.dest3) {

      filas.push({
        ruta: r.dest3,
        km: r.k3,
      });

    }

    if (r.dest4) {

      filas.push({
        ruta: r.dest4,
        km: r.k4,
      });

    }

    if (r.dest5) {

      filas.push({
        ruta: r.dest5,
        km: r.k5,
      });

    }

    filas.push({
      ruta: "RECORRIDO ADICIONAL",
      km: r.adicional,
    });

    filas.push({
      ruta: "RECORRIDO TOTAL",
      km: r.total,
    });

  });

  return (

    <View style={styles.rutasContainer}>

      {
        filas.map((f, i) => (

          <View
            key={i}
            style={styles.row}
          >

            <View style={styles.rutaColumn}>

              <Text style={styles.rutaText}>
                {safe(f.ruta)}
              </Text>

            </View>

            <View style={styles.kmColumn}>

              <Text style={styles.kmText}>
                {safe(f.km)}
              </Text>

            </View>

          </View>

        ))
      }

    </View>

  );

}