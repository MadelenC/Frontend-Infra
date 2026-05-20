import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../common/pdfStyles"; 

export default function VehicleReportTable({ data, totales, fecha}) {
  


  const safe = Array.isArray(data) ? data : [];

  return (
    <View style={styles.table}>

     
      <View style={styles.row}>

        <Text style={[styles.cell, styles.headerCell, { width: "5%" }]}>
          #
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "25%" }]}>
          Vehículo
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "20%" }]}>
          Conductor
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "10%" }]}>
          Km
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "10%" }]}>
          Combustible
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "10%" }]}>
          Precio
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "10%" }]}>
          Total
        </Text>
        <Text style={[styles.cell, styles.headerCell, { width: "10%" }]}>
          Pasajeros</Text>

        <Text style={[styles.cell, styles.headerCell, { width: "5%" }]}>
          Viajes
        </Text>

      </View>

      
      {safe.map((v, i) => (

        
        <View key={i} style={styles.row}>

          <Text style={[styles.cell, { width: "5%" }]}>
            {v.nro}
          </Text>

          <Text style={[styles.cell, { width: "25%" }]}>
            {v.vehiculo}
          </Text>

          <Text style={[styles.cell, { width: "20%" }]}>
            {v.conductor}
          </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
            {v.km_total}
          </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
            {v.combustible_total}
          </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
            {v.precio}
          </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
            {v.precio_total}
          </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
            {v.pasajeros_total}
          </Text>

          <Text style={[styles.cell, { width: "5%" }]}>
            {v.numero_viajes}
          </Text>

        </View>
      ))}
  
      <View style={[styles.row, { backgroundColor: "#eee", fontWeight: "bold" }]}>

        <Text style={[styles.cell, { width: "50%" }]}>
          TOTALES
        </Text>

        <Text style={[styles.cell, { width: "10%" }]}>
          {}
        </Text>

        <Text style={[styles.cell, { width: "10%" }]}>
          {}
        </Text>

        <Text style={[styles.cell, { width: "10%" }]}>
          {totales?.combustible}
        </Text>

        <Text style={[styles.cell, { width: "10%" }]}>
          {totales?.precio}
        </Text>

        <Text style={[styles.cell, { width: "10%" }]}>
          {totales?.pasajeros}
        </Text>

        <Text style={[styles.cell, { width: "5%" }]}>
          {totales?.viajes}
        </Text>
         

      </View>
      <Text style={{ marginTop: 10, fontSize: 7 }}>
                        Fecha de impresión: {fecha}
      </Text>

    </View>
  );
}