import React from "react";
import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function CombustibleAnualTable({
  data,
}) {
  return (
    <View style={{ border: 1 }}>
      {/* CABECERA */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ddd",
          borderBottom: 1,
        }}
      >
        <Text style={styles.anio}>
          AÑO
        </Text>

        <Text style={styles.combustible}>
          COMBUSTIBLE
        </Text>

        <Text style={styles.litros}>
          LITROS
        </Text>
      </View>

      {/* FILAS */}
      {data?.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            borderBottom: 1,
          }}
        >
          <Text style={styles.anio}>
            {item.anio}
          </Text>

          <Text style={styles.combustible}>
            {item.combustible}
          </Text>

          <Text style={styles.litros}>
            {Number(item.litros).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = {
  anio: {
    width: "25%",
    borderRight: 1,
    padding: 4,
  },

  combustible: {
    width: "35%",
    borderRight: 1,
    padding: 4,
  },

  litros: {
    width: "40%",
    padding: 4,
  },
};