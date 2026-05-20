import React, { useState } from "react";
import { FiFileText } from "react-icons/fi";

import { useReporteVehiculosStore } from "../../zustand/useReporteVehiculosStore";

export default function VehicleReportButton() {

  const {
    reporte,
    totales,
    fetchReporte,
  } = useReporteVehiculosStore();

  const [loading, setLoading] = useState(false);
  const [PDFDoc, setPDFDoc] = useState(null);

  const handleGenerate = async () => {
    try {

      setLoading(true);

      await fetchReporte();

      
      const { default: VehicleReportPDF } = await import(
        "../../Pdf/tripsVehiclesRport/VehicleReportPDF"
      );

      setPDFDoc(() => VehicleReportPDF);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 👇 antes de generar
  if (!PDFDoc) {
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
        {loading ? "Generando..." : "Generar Reporte"}
      </button>
    );
  }

  const VehicleReportPDF = PDFDoc;

  return (
    <button
      onClick={async () => {

        const { pdf } = await import("@react-pdf/renderer");

        const blob = await pdf(
          <VehicleReportPDF
            data={reporte}
            totales={totales}
          />
        ).toBlob();

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "reporte-vehiculos.pdf";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      }}
      className="
        flex items-center gap-2
        bg-red-600 text-white
        px-4 h-10 rounded-md
      "
    >
      <FiFileText />
      Descargar PDF
    </button>
  );
}