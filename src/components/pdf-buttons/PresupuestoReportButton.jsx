import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FiPrinter } from "react-icons/fi";

import PresupuestoPDF from "../Pdf/PresupuestosReport/PresupuestoFormatoPDF";
import { useBudgetsReportStore } from "../../zustand/useReportBudgetsStore";

export default function PresupuestosReportButton() {

  const { fetchReporte } = useBudgetsReportStore();

  const handleDownload = async () => {

    try {

      const data = await fetchReporte();

      const blob = await pdf(
        <PresupuestoPDF data={data} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "presupuesto-viaje.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);

    } catch (error) {
      console.log("ERROR PDF:", error);
    }

  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 h-10 rounded-lg"
    >
      <FiPrinter />
      Reporte Presupuestos
    </button>
  );
}