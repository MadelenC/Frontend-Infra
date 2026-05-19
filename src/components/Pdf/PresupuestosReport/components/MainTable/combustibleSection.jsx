import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../../PresupuestoStyles";

export default function CombustibleSection({ item }) {
  if (!item) return null;

  const cell = {
    borderWidth: 1,
    borderColor: "#000",
    padding: 3,
    fontSize: 7,
  };

  return (
    <View style={{ width: "100%" }}>

      {/* HEADER */}
      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 1, fontWeight: "bold", textAlign: "center" }]}>
          COMBUSTIBLE
        </Text>
      </View>

      {/* TABLA */}
      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 1 }]}>Combustible</Text>
        <Text style={[cell, { flex: 1, textAlign: "right" }]}>
          {item.cantidad1 || 0}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 1 }]}>Pedido</Text>
        <Text style={[cell, { flex: 1, textAlign: "right" }]}>
          0
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 1 }]}>Carta</Text>
        <Text style={[cell, { flex: 1, textAlign: "right" }]}>
          {item.cantidad1 || 0}
        </Text>
      </View>

      {/* TOTAL */}
      <View style={{ flexDirection: "row" }}>
        <Text style={[cell, { flex: 1, fontWeight: "bold" }]}>
          TOTAL
        </Text>
        <Text style={[cell, { flex: 1, textAlign: "right" }]}>
          {item.cantidad1 || 0} Lts
        </Text>
      </View>

    </View>
  );
}