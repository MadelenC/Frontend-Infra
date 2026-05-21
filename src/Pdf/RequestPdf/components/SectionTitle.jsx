// src/Pdf/RequestPdf/components/SectionTitle.jsx

import React from "react";
import { View, Text } from "@react-pdf/renderer";

export default function SectionTitle({ title }) {

  return (
    <View
      style={{
        borderBottom: 1,
        padding: 4,
        backgroundColor: "#eaeaea",
        alignItems: "center",
      }}
    >

      <Text
        style={{
          fontSize: 8,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>

    </View>
  );
}