import React from "react";

import {
  Document,
  Page,
} from "@react-pdf/renderer";

import { styles } from "../common";

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
        style={styles.page}
      >

        <RoleTravelHeaderPDF
          date={new Date().toLocaleDateString()}
        />

        <RoleTravelTablePDF
          travels={travels}
        />

        <RoleTravelNotesPDF />

        <RoleTravelSignaturePDF />

      </Page>

    </Document>
  );
}