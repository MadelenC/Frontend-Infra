import React from "react";
import { View, Text } from "@react-pdf/renderer";

export default function DatosViajeAdicional({ item }) {
  if (!item) return null;

  const cell = {
    borderWidth: 1,
    borderColor: "#000",
    padding: 3,
    fontSize: 7,
  };

  return (
    <View style={{ width: "100%" }}>

      {/* DÍAS */}
      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 2 }]}>
          Días de viaje
        </Text>

        <Text style={[cell, { flex: 1, textAlign: "right" }]}>
          {item.viaje?.dias || 0}
        </Text>
      </View>

      {/* FECHA S.A */}
      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 2 }]}>
          Fecha solicitud S.A
        </Text>

        <Text style={[cell, { flex: 1, textAlign: "right" }]}>
          {item.fecha_sa || "-"}
        </Text>
      </View>

      {/* FECHA INICIO */}
      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 2 }]}>
          Fecha inicio viaje
        </Text>

        <Text style={[cell, { flex: 1, textAlign: "right" }]}>
          {item.viaje?.fecha_inicial || "-"}
        </Text>
      </View>

    </View>
  );
}