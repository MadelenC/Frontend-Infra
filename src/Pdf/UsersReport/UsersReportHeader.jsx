import React from "react";

import {
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

import logo
from "../assets/logouatf.png";

export default function UsersReportHeader({
  title,
}) {

  return (

    <View
      style={{
        marginBottom: 15,
      }}
    >

      {/* LOGO */}
      <View
        style={{
          alignItems: "center",
          marginBottom: 10,
        }}
      >

        <Image
          src={logo}
          style={{
            width: 70,
            height: 70,
          }}
        />

      </View>

      {/* TITULOS */}
      <View
        style={{
          textAlign: "center",
        }}
      >

        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
        </Text>

        <Text
          style={{
            fontSize: 10,
          }}
        >
          DEPARTAMENTO DE INFRAESTRUCTURA
        </Text>

        <Text
          style={{
            marginTop: 5,
            fontSize: 11,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>

      </View>

    </View>

  );

}