import React from "react";
import { View } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function PdfTable({ children }) {
  return <View style={styles.table}>{children}</View>;
}