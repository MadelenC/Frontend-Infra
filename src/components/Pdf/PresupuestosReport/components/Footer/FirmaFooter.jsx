import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

export default function FirmaFooter() {

  return (

    <View style={styles.firmaContainer}>

      <Text>
        Lic. Carlos F. Mamani Arroyo
      </Text>

      <Text style={styles.bold}>
        ENCARGADO DE AUTOMOTORES
      </Text>

    </View>

  );

}