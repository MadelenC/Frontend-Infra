import React from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "../styles/materialRequestStyles";

export default function MaterialAccessories({ request }) {

  const accesorios = [];

  for (let i = 1; i <= 11; i++) {

    const desc = request?.[`descripcion${i}`];

    if (desc && desc !== "") {
      accesorios.push(desc);
    }
  }

  return (

    <View style={styles.accessories}>

      <Text style={styles.label}>
        Accesorios:
      </Text>

      <Text style={styles.value}>
        {accesorios.join(" | ")}
      </Text>

    </View>
  );
}