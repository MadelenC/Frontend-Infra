import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function HojaRutaHeader({
  data,
}) {

  return (

    <View>

      

      <View
        style={{
          marginBottom: 10,
          alignItems: "center",
        }}
      >

        <Text
          style={{
            fontSize: 10,
            fontWeight: "bold",
          }}
        >
          HOJA DE RUTA
        </Text>

        <Text>
          Viaje de Vice Rectorado
        </Text>

      </View>

     

      <View
        style={{
          marginBottom: 10,
        }}
      >

        <Text>
          Vehículo:
          {" "}
          {
            data?.vehiculos
              ?.map(v => v.detalle)
              .join(", ")
          }
        </Text>

        <Text>
          Pasajeros:
          {" "}
          {data?.pasajeros}
        </Text>

        <Text>
          Días:
          {" "}
          {data?.dias}
        </Text>

        <Text>
          Kilometraje Total:
          {" "}
          {data?.kilometraje_total}
        </Text>

        <Text>
          Combustible Total:
          {" "}
          {data?.combustible}
          {" "}
          Litros
        </Text>

      </View>

    </View>

  );

}