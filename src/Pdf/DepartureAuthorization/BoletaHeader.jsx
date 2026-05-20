// BoletaHeader.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles/boletaStyles";

const BoletaHeader = ({ boleta, fechaImpresion }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>

        <Text style={styles.headerText}>
          Departamento de Infraestructura
        </Text>

        <Text style={styles.subHeaderText}>
          Sección Automotores
        </Text>

        <Text style={styles.title}>
          Salida e Informe
        </Text>

      </View>

      <View style={styles.box}>
        
       
        <Text style={styles.rowText}>
          <Text style={styles.bold}>Movilidad: </Text>
          {boleta?.vehiculo?.tipog || ""}{" "}
          {boleta?.vehiculo?.codigo || ""}{" "}
          - {boleta?.vehiculo?.placa || ""}
        </Text>

      
        <Text style={styles.rowText}>
          <Text style={styles.bold}>Fecha de impresión: </Text>
          {fechaImpresion}
        </Text>

      
        <Text style={styles.rowText}>
          <Text style={styles.bold}>Chofer: </Text>
          {boleta?.chofer
            ? `${boleta.chofer.nombres || ""} ${boleta.chofer.apellidos || ""}`
            : ""}
        </Text>

       
        <Text style={styles.rowText}>
          <Text style={styles.bold}>Responsable: </Text>
          {boleta?.responsable || ""}
        </Text>

        <Text style={styles.rowText}>
          <Text style={styles.bold}>Lugar: </Text>
          {boleta?.lugar || ""}
        </Text>

    
        <Text style={styles.rowText}>
          <Text style={styles.bold}>Motivo: </Text>
          {boleta?.motivo || ""}
        </Text>

    
        <View style={styles.timesRow}>
          <Text style={styles.rowText}>
            <Text style={styles.bold}>Salida: </Text>
            {boleta?.hsalida || ""}
          </Text>

          <Text style={styles.rowText}>
            <Text style={styles.bold}>Llegada: </Text>
            {boleta?.hllegada || ""}
          </Text>
        </View>

      </View>
    </View>
  );
};

export default BoletaHeader;