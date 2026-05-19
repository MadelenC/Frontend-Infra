import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

import { safe } from "../../../../../utils/safe";

export default function NotaTable({
  item,
}) {

  return (

    <View
      style={[
        styles.table,
        {
          marginTop: 20,
        },
      ]}
    >

      <View style={styles.row}>

        <Text
          style={[
            styles.cell,
            styles.bold,
            {
              width: "100%",
              textAlign: "center",
            },
          ]}
        >
          NOTA:
        </Text>

      </View>

      <View style={styles.row}>

        <Text
          style={[
            styles.cell,
            {
              width: "25%",
            },
          ]}
        >
          Tipo:
          {" "}
          {safe(item.viaje?.tipo)}
        </Text>

        <Text
          style={[
            styles.cell,
            {
              width: "15%",
            },
          ]}
        >
          Pasajeros:
          {" "}
          {safe(item.viaje?.pasajeros)}
        </Text>

        <Text
          style={[
            styles.cell,
            {
              width: "20%",
            },
          ]}
        >
          Docentes a cargo
        </Text>

        <Text
          style={[
            styles.cell,
            {
              width: "20%",
            },
          ]}
        >
          Materia:
          {" "}
          {safe(item.materia)}
        </Text>

        <Text
          style={[
            styles.cell,
            {
              width: "20%",
            },
          ]}
        >
          Sigla:
          {" "}
          {safe(item.sigla)}
        </Text>

      </View>

    </View>

  );

}