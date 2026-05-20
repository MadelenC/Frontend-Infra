import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

export default function HeaderPDF() {

  return (

    <View style={styles.header}>

      <Text style={styles.title}>
        PRESUPUESTO DE VIAJE
      </Text>

    </View>

  );

}