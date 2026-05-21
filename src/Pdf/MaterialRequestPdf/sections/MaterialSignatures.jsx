import React from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "../styles/materialRequestStyles";

export default function MaterialSignatures({ request }) {

  return (

    <View style={styles.signatures}>

      <View style={styles.signBox}>

        <View style={styles.signLine} />

        <Text style={styles.signText}>
          {request?.insertador}
        </Text>

        <Text style={styles.signText}>
          Enc. Automotores
        </Text>

      </View>

      <View style={styles.signBox}>

        <View style={styles.signLine} />

        <Text style={styles.signText}>
          Ing. Roger F. Barahona Telchi
        </Text>

        <Text style={styles.signText}>
          JEFATURA DINF. a.i.
        </Text>

      </View>

    </View>
  );
}