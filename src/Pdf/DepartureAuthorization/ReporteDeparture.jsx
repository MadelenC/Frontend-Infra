// ReporteDeparture.jsx

import React from "react";

import {
  Document,
  Page,
  View,
} from "@react-pdf/renderer";

import BoletaHeader from "./BoletaHeader";
import BoletaTable from "./BoletaTable";
import BoletaFooter from "./BoletaFooter";

import { styles } from "./styles/boletaStyles";

export default function ReporteDeparture({
  boleta,
  fechaImpresion
}) {

  return (

    <Document>

      <Page
        size="LETTER"
        style={styles.page}
      >

        <View>

          <BoletaHeader boleta={boleta} 
          fechaImpresion={fechaImpresion}/>

          <BoletaTable />

          <BoletaFooter />

        </View>

      </Page>

    </Document>
  );
}