import React from "react";

import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import HojaRutaHeader from "./HojaRutaHeader";
import HojaRutaTable from "./HojaRutaTable";
import HojaRutaFooter from "./HojaRutaFooter";
import logo from "../../Pdf/assets/logouatf.png";
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default function HojaRutaPDF({
  data,
}) {

  return (

    <Document>

      <Page
        size="LETTER"
        style={{
          padding: 20,
          fontSize: 9,
        }}
      >

          <Image
          src={logo}
          fixed
          style={{
          position: "absolute",
          top: "25%",
          left: "30%",
          width: 240,
          height: 300,
          opacity: 0.06,
          }}
          />
          <Image
            src={logo}
            fixed
            style={{
              position: "absolute",

              top: 15,
              right: 20,

              width: 55,
              height: 55,
            }}
          />

        <HojaRutaHeader data={data} />

        <HojaRutaTable data={data} />

        <HojaRutaFooter />
            <View fixed style={styles.footer}>
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