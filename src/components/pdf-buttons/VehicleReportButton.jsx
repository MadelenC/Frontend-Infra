import React, { useState } from "react";

import {
  PDFDownloadLink,
} from "@react-pdf/renderer";

import { FiFileText } from "react-icons/fi";

import VehicleReportPDF
from "../pdf/tripsVehiclesRport/VehicleReportPDF";

import {
  useReporteVehiculosStore,
} from "../../zustand/useReporteVehiculosStore";

export default function VehicleReportButton() {

  const {
    reporte,
    totales,
    fetchReporte,
  } = useReporteVehiculosStore();

  const [ready, setReady] =
    useState(false);

  const handleGenerate =
    async () => {

      await fetchReporte();

      setReady(true);

    };

  if (!ready) {

    return (

      <button
        onClick={handleGenerate}
        className="
          flex items-center gap-2
          bg-red-600 text-white
          px-4 h-10 rounded-md
        "
      >

        <FiFileText />

        Generar Reporte

      </button>

    );

  }

  return (

    <PDFDownloadLink

      document={
        <VehicleReportPDF
          data={reporte}
          totales={totales}
        />
      }

      fileName="reporte-vehiculos.pdf"
    >

      {({ loading }) => (

        <button
          className="
            flex items-center gap-2
            bg-red-600 text-white
            px-4 h-10 rounded-md
          "
        >

          <FiFileText />

          {
            loading
              ? "Generando..."
              : "Descargar PDF"
          }

        </button>

      )}

    </PDFDownloadLink>

  );

}