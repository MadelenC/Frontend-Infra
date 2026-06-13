import React from "react";
import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function CombustibleMensualTable({
  data,
}) {
  return (
    <View style={{ border: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ddd",
          borderBottom: 1,
        }}
      >
        <Text style={styles.mes}>MES</Text>
        <Text style={styles.gasolina}>GASOLINA (L)</Text>
        <Text style={styles.diesel}>DIESEL (L)</Text>
      </View>

      {data?.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            borderBottom: 1,
          }}
        >
          <Text style={styles.mes}>
            {item.mes}
          </Text>

          <Text style={styles.gasolina}>
            {item.gasolina || 0}
          </Text>

          <Text style={styles.diesel}>
            {item.diesel || 0}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = {
  mes: {
    width: "30%",
    borderRight: 1,
    padding: 4,
  },

  gasolina: {
    width: "35%",
    borderRight: 1,
    padding: 4,
  },

  diesel: {
    width: "35%",
    padding: 4,
  },
};