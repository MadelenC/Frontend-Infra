import React from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "../styles/materialRequestStyles";

export default function MaterialDescription({ request }) {

  return (

    <View style={styles.description}>

      <Text style={styles.label}>
        Descripción del trabajo a realizar:
      </Text>

      <Text style={styles.value}>
        {request?.solicitud?.descripsoli}
      </Text>

    </View>
  );
}