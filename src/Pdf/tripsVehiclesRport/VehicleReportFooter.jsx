import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "../common/pdfStyles"; 

export default function VehicleReportFooter() {
  return (
    <View style={styles.signature}>

      <Text>______________________________</Text>

      <Text>Lic. Marcelo Raul Guzmán Camacho</Text>

      <Text>ENCARGADO DE AUTOMOTORES</Text>
      

    </View>
  );
}