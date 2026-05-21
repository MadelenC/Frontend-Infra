// ReportTripGeneral.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import SectionTitle from "../components/SectionTitle";
import PdfTable from "../components/PdfTable";
import PdfCell from "../components/PdfCell";
import styles from "../styles/reportTripStyles";

export default function ReportTripGeneral({ trip }) {
  return (
    <View style={styles.section}>

      <SectionTitle title="DATOS GENERALES" />

      <PdfTable>

        <View style={styles.row}>
          <PdfCell
            label="CONDUCTOR"
            value={`${trip?.chofer?.nombres || ""} ${trip?.chofer?.apellidos || ""}`}
          />

          <View style={styles.cell}>
            <Text>
              Vehículo: {trip?.vehiculo?.tipog ?? "-"}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <PdfCell
            label="RESPONSABLE"
            value={`${trip?.encargado?.nombres || ""} ${trip?.encargado?.apellidos || ""}`}
          />

          <PdfCell
            label="ENTIDAD"
            value={trip?.entidad ?? "-"}
          />

         
        </View>

        <View style={styles.row}>

           <PdfCell
            label="PASAJEROS"
            value={trip?.pasajeros}
          />
          <PdfCell
            label="DÍAS"
            value={trip?.dias}
          />

          <PdfCell
            label="RECORRIDO TOTAL"
            value={trip?.kmtotal}
          />
        </View>

      </PdfTable>

    </View>
  );
}