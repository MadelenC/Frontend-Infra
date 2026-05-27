import React from "react";

import {
  Document,
  Page,
} from "@react-pdf/renderer";

import HojaRutaHeader from "./HojaRutaHeader";
import HojaRutaTable from "./HojaRutaTable";
import HojaRutaFooter from "./HojaRutaFooter";

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

        <HojaRutaHeader data={data} />

        <HojaRutaTable data={data} />

        <HojaRutaFooter />

      </Page>

    </Document>

  );
}