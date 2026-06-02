import React from "react";

import {
  Document,
  Page,
  Image,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";

import VehicleReportHeader from "./VehicleReportHeader";
import VehicleReportTable from "./VehicleReportTable";
import VehicleReportFooter from "./VehicleReportFooter";

import logo from "../../Pdf/assets/logouatf.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    position: "relative",
  },

  watermark: {
    position: "absolute",

    top: 180,
    left: 90,

    width: 420,
    height: 420,

    opacity: 0.08,
  },

  footer: {
    position: "absolute",

    bottom: 10,
    left: 0,
    right: 0,

    alignItems: "center",
  },
});

export default function VehicleReportPDF({
  data,
  totales,
}) {

  return (

    <Document>

      <Page
        size="LETTER"
        style={styles.page}
        wrap
      >

        <Image
               src={logo}
               fixed
               style={{
                 position: "absolute",
                 top: "32%",
                 left: "30%",
                 width: 240,
                 height: 300,
                 opacity: 0.06,
               }}
             />

        
        <VehicleReportHeader />

        <VehicleReportTable
          data={data}
          totales={totales}
        />

        <VehicleReportFooter />

       
        <View
          fixed
          style={styles.footer}
         >

          <Text
            style={{
              fontSize: 7,
              color: "gray",
            }}
          >
            Sistema Web Departamento de Infraestructura U.A.T.F.
          </Text>

        </View>

      </Page>

    </Document>

  );

}