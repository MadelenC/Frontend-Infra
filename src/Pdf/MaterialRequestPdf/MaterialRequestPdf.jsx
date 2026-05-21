import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";

import styles from "./styles/materialRequestStyles";

import MaterialHeader from "./sections/MaterialHeader";
import MaterialAccessories from "./sections/MateriaAccessories";
import MaterialDescription from "./sections/MaterialDescription";
import MaterialSignatures from "./sections/MaterialSignatures";

export default function MaterialRequestPdf({ request }) {

  return (
    <Document>

      <Page size="LETTER" style={styles.page}>

        <View style={styles.container}>

          <MaterialHeader request={request} />

          <MaterialAccessories request={request} />

          <MaterialDescription request={request} />

          <MaterialSignatures request={request} />

        </View>

      </Page>

    </Document>
  );
}