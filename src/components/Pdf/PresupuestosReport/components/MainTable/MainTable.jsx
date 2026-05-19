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


export default function MainTable({
  item,
  rutas,
  detalles,
  total8T
}) {

  return (

    <View style={styles.table}>

      <View style={styles.row}>

        <Text
          style={[
            styles.cell,
            styles.bold,
            styles.center,
            {
              width: "62%",
            },
          ]}
        >
          VIAJE (Viaje Académico)
        </Text>

        <Text
          style={[
            styles.cell,
            styles.bold,
            styles.center,
            {
              width: "28%",
            },
          ]}
        >
          Ruta
        </Text>

        <Text
          style={[
            styles.cell,
            styles.bold,
            styles.center,
            {
              width: "10%",
            },
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

     

      <PresupuestoTable item={item} />
      <PresupuestoRows detalles={detalles} 
      total8T={total8T}

      />
      
      <PasajesSection />
<View style={{ width: "100%", flexDirection: "row" }}>

  {/* IZQUIERDA VACÍA (respeta flujo) */}
  <View style={{ width: "70%" }} />

  {/* DERECHA: COMBUSTIBLE */}
  <View style={{ width: "30%" }}>
    <CombustibleSection item={item} />
  </View>

</View>

    </View>

  );

}