import React from "react";

import {
  Document,
  Page,
  Image,
  View,
  Text,
} from "@react-pdf/renderer";

import logo
from "../assets/logouatf.png";

import UsersReportHeader
from "./UsersReportHeader";

import UsersReportTable
from "./UsersReportTable";

import UsersReportFooter
from "./UsersReportFooter";

export default function UsersReportPDF({
  users,
  title,
}) {

  return (

    <Document>

      <Page
        size="LETTER"
        style={{
          padding: 25,
          fontSize: 8,
          position: "relative",
        }}
      >

       
      <Image
        src={logo}
        style={{
          position: "absolute",
          top: "32%",
          left: "30%",
          width: 240,
          height: 300,
          opacity: 0.06,
        }}
      />

        <View>

          <UsersReportHeader
            title={title}
          />

          <UsersReportTable
            users={users}
          />

          <UsersReportFooter />

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