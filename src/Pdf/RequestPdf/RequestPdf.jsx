// src/Pdf/RequestPdf/RequestPdf.jsx

import React from "react";
import { Document, Page, View } from "@react-pdf/renderer";

import styles from "./styles/requestPdfStyles";

import RequestHeader from "./sections/RequestHeader";
import RequestItems from "./sections/RequestItems";
import RequestTexts from "./sections/RequestTexts";
import RequestSignatures from "./sections/RequestSignatures";

export default function RequestPdf({ request }) {

  return (
    <Document>

      <Page
        size="A4"
        style={styles.page}
      >

        <View style={styles.container}>

          <RequestHeader request={request} />

          <RequestItems request={request} />

          <RequestTexts request={request} />

          <RequestSignatures request={request} />

        </View>

      </Page>

    </Document>
  );
}