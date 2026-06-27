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
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ddd",
          borderBottom: 1,
        }}
      >
        <Text style={styles.anio}>AÑO</Text>
        <Text style={styles.vehiculo}>ENCARGADO</Text>
        <Text style={styles.placa}>PLACA</Text>
        <Text style={styles.tipo}>TIPO</Text>
        <Text style={styles.combustible}>COMBUSTIBLE</Text>
        <Text style={styles.litros}>LITROS</Text>
        <Text style={styles.gasto}>GASTO BS.</Text>
      </View>

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

          <Text style={styles.vehiculo}>
            {item.vehiculo || item.codigo || "-"}
          </Text>

          <Text style={styles.placa}>
            {item.placa || "-"}
          </Text>

          <Text style={styles.tipo}>
            {item.tipo || item.tipog || "-"}
          </Text>

          <Text style={styles.combustible}>
            {item.combustible || "-"}
          </Text>

          <Text style={styles.litros}>
            {Number(item.litros || 0).toFixed(2)}
          </Text>

          <Text style={styles.gasto}>
            {Number(item.gasto || 0).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = {
  anio: {
    width: "10%",
    borderRight: 1,
    padding: 4,
  },

  vehiculo: {
    width: "20%",
    borderRight: 1,
    padding: 4,
  },

  placa: {
    width: "14%",
    borderRight: 1,
    padding: 4,
  },

  tipo: {
    width: "16%",
    borderRight: 1,
    padding: 4,
  },

  combustible: {
    width: "16%",
    borderRight: 1,
    padding: 4,
  },

  litros: {
    width: "12%",
    borderRight: 1,
    padding: 4,
  },

  gasto: {
    width: "12%",
    padding: 4,
  },
};
