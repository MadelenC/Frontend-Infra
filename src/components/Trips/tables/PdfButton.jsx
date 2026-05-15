import React, { memo, useMemo } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FiFileText } from "react-icons/fi";

import TripsReportPDF from "../../../components/Pdf/TripPDF/TripPDF";

const PdfButton = memo(({ trips }) => {

  const pdfDoc = useMemo(() => (
    <TripsReportPDF trips={trips} />
  ), [trips]);

  return (
    <PDFDownloadLink
      document={pdfDoc}
      fileName="reporte-viajes.pdf"
    >
      {({ loading }) => (
        <button
          className="
          flex items-center gap-2
          bg-red-600 hover:bg-red-700
          text-white
          px-4 h-10
          rounded-md
          "
        >
          <FiFileText />

          {loading
            ? "Generando..."
            : "PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
});

export default PdfButton;