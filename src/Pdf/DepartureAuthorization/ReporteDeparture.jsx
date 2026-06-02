import React from "react";

import {
  Document,
  Page,
  View,
  Image,
  Text,
} from "@react-pdf/renderer";

import BoletaHeader from "./BoletaHeader";
import BoletaTable from "./BoletaTable";
import BoletaFooter from "./BoletaFooter";

import { styles } from "./styles/boletaStyles";

import logo from "../../Pdf/assets/logouatf.png";

export default function ReporteDeparture({
  boleta,
  fechaImpresion
}) {

  return (

    <Document>

      <Page
        size="LETTER"
        style={[
          styles.page,
          {
            position: "relative",
          },
        ]}
      >

     
        <Image
          fixed
          src={logo}
          style={{
            position: "absolute",
            top: "30%",
            left: "28%",
            width: 260,
            height: 320,
            opacity: 0.06,
          }}
        />

       
        <Image
          fixed
          src={logo}
          style={{
            position: "absolute",
            top: 15,
            right: 20,
            width: 55,
            height: 55,
          }}
        />

        <View>

          <BoletaHeader
            boleta={boleta}
            fechaImpresion={fechaImpresion}
          />

          <BoletaTable />

          <BoletaFooter />

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