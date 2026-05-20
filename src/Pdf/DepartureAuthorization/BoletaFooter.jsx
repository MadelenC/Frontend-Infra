// BoletaFooter.jsx

import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "./styles/boletaStyles";

const BoletaFooter = () => {

  return (

    <View style={styles.footer}>

      <Text style={styles.footerName}>
        Sr. Lic. Carlos F. Mamani Arroyo
      </Text>

      <Text style={styles.footerCargo}>
        ENCARGADO DE AUTOMOTORES
      </Text>

    </View>
  );
};

export default BoletaFooter;