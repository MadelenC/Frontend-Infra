import React from "react";

import {
  Document,
  Page,
  Image,
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "./PresupuestoStyles";

import HeaderPDF from "./components/Header/HeaderPDF";

import MainTable from "./components/MainTable/MainTable";

import NotaTable from "./components/Nota/NotaTable";

import FirmaFooter from "./components/Footer/FirmaFooter";

import PasajesSection
from "./components/MainTable/PasajesSection";

import { buildDetalles }
from "../../utils/buildDetalles";

import logo
from "../../Pdf/assets/logouatf.png";

export default function PresupuestoPDF({
  data,
}) {

  const item = data;

  if (!item) {

    return (
      <Document>
        <Page>
          <HeaderPDF />
        </Page>
      </Document>
    );

  }

  const rutas =
    Array.isArray(item.rutas)
      ? item.rutas
      : [];

  const detalles =
    buildDetalles(item);

  const total8T =
    item.total8T;

  return (

    <Document>

      <Page
        size="LETTER"
        style={{
          ...styles.page,
          position: "relative",
        }}
      >

        <Image
          src={logo}
          fixed
          style={{
            position: "absolute",

            top: "32%",
            left: "30%",

            width: 240,
            height: 300,

            opacity: 0.06,
          }}
        />

        {/* LOGO SUPERIOR DERECHO */}
        <Image
          src={logo}
          fixed
          style={{
            position: "absolute",

            top: 15,
            right: 20,

            width: 55,
            height: 55,
          }}
        />

        {/* CONTENIDO */}
        <View>

          <HeaderPDF />

          <MainTable
            item={item}
            rutas={rutas}
            detalles={detalles}
            total8T={total8T}
          />

          <NotaTable item={item} />

          <FirmaFooter />

        </View>

        {/* PIE DE PAGINA */}
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