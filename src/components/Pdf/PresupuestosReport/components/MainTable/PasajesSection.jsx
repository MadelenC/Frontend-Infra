import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../../PresupuestoStyles";

export default function PasajesSection({ presupuesto }) {
  if (!presupuesto) return null;

  const rows = [
    {
      c: presupuesto.p1,
      u: "Pasaje",
      d: presupuesto.r1,
      t: presupuesto.t1,
    },
    {
      c: presupuesto.p2,
      u: "Pasaje",
      d: presupuesto.r2,
      t: presupuesto.t2,
    },
    {
      c: presupuesto.p3,
      u: "Global",
      d: "Flete por transporte",
      t: presupuesto.t3,
    },
  ];

  return (
    <View>

      {rows.map((r, i) => (
        <View key={i} style={styles.presupuestoRow}>


          <View style={styles.colCant}>
            <Text style={styles.bodyCenter}>
              {r.c || ""}
            </Text>
          </View>

 
          <View style={styles.colUnidad}>
            <Text style={styles.bodyCenter}>
              {r.u}
            </Text>
          </View>

    
          <View style={styles.colDescripcion}>
            <Text style={styles.bodyLeft}>
              {r.d}
            </Text>
          </View>


          <View style={styles.colPU}>
            <Text />
          </View>


          <View style={styles.colTotal}>
            <Text style={styles.bodyRight}>
              {r.t || "0.00"}
            </Text>
          </View>

        </View>
      ))}


      <View style={styles.presupuestoRow}>

        <View style={styles.colCant} />
        <View style={styles.colUnidad} />

        <View style={styles.colDescripcion}>
          <Text style={styles.headerText}>
            TOTAL (B) BS
          </Text>
        </View>

        <View style={styles.colPU} />

        <View style={styles.colTotal}>
          <Text style={styles.bodyRight}>
            {presupuesto.tt || "0.00"}
          </Text>
        </View>

      </View>


      <View style={styles.presupuestoRow}>

        <View style={styles.colCant} />
        <View style={styles.colUnidad} />

        <View style={styles.colDescripcion}>
          <Text style={styles.headerText}>
            DIFERENCIA (A)-(B) BS
          </Text>
        </View>

        <View style={styles.colPU} />

        <View style={styles.colTotal}>
          <Text style={styles.bodyRight}>
            {presupuesto.diferencia || "0.00"}
          </Text>
        </View>

      </View>

    </View>
  );
}