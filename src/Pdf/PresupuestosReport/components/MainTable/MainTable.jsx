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


        

      </View>
      
      <View style={styles.row}>

     
      <View style={{ width: "62%" }}>
        <RutasSection rutas={rutas} />
      </View>

      
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


      <PasajesSection presupuesto={item} />

      <View style={{ width: "70%" }} />

    </View>

  );

}