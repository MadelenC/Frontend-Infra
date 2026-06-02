import React from "react";

import {
  Document,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

import { styles } from "../common";

import logoUATF
from "../assets/logouatf.png";

import {
  RoleTravelHeaderPDF,
  RoleTravelTablePDF,
  RoleTravelNotesPDF,
  RoleTravelSignaturePDF,
} from "./ComPdf";

export default function RoleTravelPDF({
  travels,
}) {

  return (

    <Document>

      <Page
        size="LETTER"
        orientation="portrait"
        style={{
          ...styles.page,
          position: "relative",
        }}
      >

               <Image
                src={logoUATF}
                style={{
                  position: "absolute",
                  top: "32%",
                  left: "30%",
                  width: 240,
                  height: 300,
                  opacity: 0.06,
                }}
              />

    
        <View>

          <RoleTravelHeaderPDF
            date={new Date().toLocaleDateString()}
          />

          <RoleTravelTablePDF
            travels={travels}
          />

          <RoleTravelNotesPDF />

          <RoleTravelSignaturePDF />

        </View>

      
        <View
          fixed
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,

            alignItems: "center",
          }}
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