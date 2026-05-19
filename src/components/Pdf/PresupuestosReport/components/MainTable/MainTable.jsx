import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

import ViajeInfo from "./ViajeInfo";
import RutasSection from "./RutasSection";
import PresupuestoRows from "./PresupuestoRows";
import PresupuestoTable from "./PresupuestosTable";
import PasajesSection from "./PasajesSection";
import CombustibleSection from "./CombustibleSection";
import DatosViajeAdicional from "./DatosViajeAdicional"

export default function MainTable({
  item,
  rutas,
  detalles,
  total8T
}) {

  return (

    <View style={styles.table}>

      {/* ENCABEZADO */}
      <View style={styles.row}>

  <Text
    style={[
      styles.cell,
      styles.bold,
      styles.center,
      { flex: 3 }
    ]}
  >
    VIAJE (Viaje Académico)
  </Text>

  <Text
    style={[
      styles.cell,
      styles.bold,
      styles.center,
      { flex: 2.2 }
    ]}
  >
    Ruta
  </Text>

  <Text
    style={[
      styles.cell,
      styles.bold,
      styles.center,
      { flex: 0.8 }
    ]}
  >
    KM
  </Text>

</View>


      <View style={styles.row}>


        <View
          style={[
            styles.cell,
            {
              width: "10%",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.bold}>
            Viaje N°
          </Text>

          <Text>
            {item.viaje?.id}
          </Text>
        </View>

        <ViajeInfo item={item} />


        <RutasSection rutas={rutas} />

      </View>
      
      <View style={styles.row}>

      {/* ESPACIO IZQUIERDA */}
      <View style={{ width: "62%" }} />

      {/* BLOQUE DERECHO (MISMA COLUMNA QUE RUTAS) */}
      <View style={{ width: "38%" }}>

        <CombustibleSection item={item} />

        <DatosViajeAdicional item={item} />

      </View>

    </View>

      <PresupuestoTable item={item} />
      <PresupuestoRows
        detalles={detalles}
        total8T={total8T}
      />

      {/* PASAJES */}
      <PasajesSection presupuesto={item} />

      <View style={{ width: "70%" }} />

    </View>

  );

}