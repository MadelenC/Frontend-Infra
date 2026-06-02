import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../PresupuestoStyles";

import { safe } from "../../../../utils/safe";

export default function ViajeInfo({
  item,
}) {

  return (

    <View
      style={[
        styles.cell,
        {
          width: 290,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingVertical: 6,
          marginLeft: 5,
          gap: 4,
        },
      ]}
    >

      <Text style={styles.bold}>
        Vehículo:
        {" "}
        {
          item.vehiculos?.length > 0
            ? item.vehiculos
                .map(v =>
                  `${safe(v.tipo)} ${safe(v.placa)}`
                )
                .join(", ")
            : "-"
        }
      </Text>

      <Text style={styles.bold}>
        Chofer:
        {" "}
        {
          item.chofer
            ? `${safe(item.chofer.nombres)} ${safe(item.chofer.apellidos)}`
            : "-"
        }
      </Text>

      <Text style={styles.bold}>
        Responsable:
        {" "}
        {safe(item.responsable)}
      </Text>

    </View>

  );

}