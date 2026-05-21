// src/Pdf/RequestPdf/components/PdfCell.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/requestPdfStyles";

export default function PdfCell({
  label,
  value,
  width = "100%",
  last = false,
}) {

  return (
    <View
      style={[
        last ? styles.lastCell : styles.cell,
        styles.filledBox,
        { width }
      ]}
    >

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.filledValue}>
        {value ?? "-"}
      </Text>

    </View>
  );
}