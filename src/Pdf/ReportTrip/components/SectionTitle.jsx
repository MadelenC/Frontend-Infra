import React from "react";
import { Text, View } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function SectionTitle({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}