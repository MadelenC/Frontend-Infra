// ReportTripRoute.jsx

import React from "react";
import { View } from "@react-pdf/renderer";
import SectionTitle from "../components/SectionTitle";
import PdfTable from "../components/PdfTable";
import PdfCell from "../components/PdfCell";
import styles from "../styles/reportTripStyles";

export default function ReportTripRoute({ trip }) {
  return (
    <View style={styles.section}>

      <SectionTitle title="DATOS DE PARTIDA Y LLEGADA" />

      <PdfTable>

        <View style={styles.row}>
          <PdfCell
            label="FECHA SALIDA"
            value={trip?.fechapartida}
          />

          <PdfCell
            label="HORA SALIDA"
            value={trip?.tiempopartida}
          />
           <PdfCell
            label="Kilometros PARTIDA"
            value={trip?.kilopartida}
          />
        </View>

        <View style={styles.row}>
          <PdfCell
            label="FECHA LLEGADA"
            value={trip?.fechallegada}
          />

          <PdfCell
            label="HORA LLEGADA"
            value={trip?.tiempollegada}
          />

           <PdfCell
            label="Kilometros LLEGADA"
            value={trip?.kilollegada}
          />
        </View>

     
    

      </PdfTable>
    </View>
  );
}