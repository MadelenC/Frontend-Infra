import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function HojaRutaFooter() {

  return (

    <View
      style={{
        marginTop: 40,
        fontSize: 8,
      }}
    >

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >

        <View
          style={{
            alignItems: "center",
            width: "30%",
          }}
        >

          <Text>
            ________________________
          </Text>

          <Text>
            Chofer Designado
          </Text>

        </View>

        <View
          style={{
            alignItems: "center",
            width: "40%",
          }}
        >

          <Text>
            ________________________
          </Text>

          <Text
            style={{
              textAlign: "center",
            }}
          >
            Lic. Carlos F. Mamani Arroyo
          </Text>

          <Text
            style={{
              textAlign: "center",
            }}
          >
            Encargado Automotores
          </Text>

        </View>

     
        <View
          style={{
            alignItems: "center",
            width: "30%",
          }}
        >

          <Text>
            ________________________
          </Text>

          <Text>
            Responsable de Viaje
          </Text>

        </View>

      </View>

    </View>

  );

}