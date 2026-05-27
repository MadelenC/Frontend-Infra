import React from "react";

import {
  Document,
  Page,
} from "@react-pdf/renderer";

import { styles } from "./PresupuestoStyles";

import HeaderPDF from "./components/Header/HeaderPDF";

import MainTable from "./components/MainTable/MainTable";

import NotaTable from "./components/Nota/NotaTable";

import FirmaFooter from "./components/Footer/FirmaFooter";
import PasajesSection from "./components/MainTable/PasajesSection";

import { buildDetalles } from "../../utils/buildDetalles";

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
    const total8T = item.total8T;

  return (

    <Document>

      <Page
        size="LETTER"
        style={styles.page}
      >

        <HeaderPDF />

        <MainTable
          item={item}
          rutas={rutas}
          detalles={detalles}
          total8T={total8T}
        />
    

        <NotaTable item={item} />

        <FirmaFooter />

      </Page>

    </Document>

  );

}