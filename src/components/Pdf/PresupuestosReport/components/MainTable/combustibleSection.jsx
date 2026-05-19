import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../../PresupuestoStyles";

export default function CombustibleSection({ item }) {
  if (!item) return null;

  const row = {
    flexDirection: "row",
    width: "100%",
  };

  return (
    <View
      style={{
        width: "100%",
        border: "1px solid #000",
        padding: 5,
        marginTop: 10,
      }}
    >

      {/* TÍTULO */}
      <View style={row}>
        <Text style={styles.headerText}>
          COMBUSTIBLE
        </Text>
      </View>

      {/* FILA 1 */}
      <View style={row}>
        <Text style={{ flex: 1, fontSize: 7 }}>Combustible</Text>
        <Text style={{ flex: 1, fontSize: 7, textAlign: "right" }}>
          {item.cantidad1 || "0"}
        </Text>
      </View>

      {/* FILA 2 */}
      <View style={row}>
        <Text style={{ flex: 1, fontSize: 7 }}>Pedido</Text>
        <Text style={{ flex: 1, fontSize: 7, textAlign: "right" }}>
          0
        </Text>
      </View>

      {/* FILA 3 */}
      <View style={row}>
        <Text style={{ flex: 1, fontSize: 7 }}>Carta</Text>
        <Text style={{ flex: 1, fontSize: 7, textAlign: "right" }}>
          {item.cantidad1 || "0"}
        </Text>
      </View>

      {/* TOTAL */}
      <View
        style={{
          borderTop: "1px solid #000",
          marginTop: 5,
          paddingTop: 3,
          flexDirection: "row",
        }}
      >
        <Text style={{ flex: 1, fontSize: 7, fontWeight: "bold" }}>
          TOTAL
        </Text>

        <Text style={{ flex: 1, fontSize: 7, textAlign: "right" }}>
          {item.cantidad1 || "0"} Lts
        </Text>
      </View>

    </View>
  );
}