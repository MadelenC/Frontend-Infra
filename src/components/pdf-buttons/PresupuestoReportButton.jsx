import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FiPrinter } from "react-icons/fi";

import { useBudgetsReportStore } from "../../zustand/useReportBudgetsStore";

export default function PresupuestosReportButton({ budgetId }) {

  const { fetchReporte } = useBudgetsReportStore();

  const handleDownload = async () => {
    try {
      // 1. Traer datos del backend
      const response = await fetchReporte(budgetId);

      const presupuesto = response?.data;

      console.log("PRESUPUESTO =>", presupuesto);

      // 2. IMPORT DINÁMICO del PDF (IMPORTANTE)
      const { default: PresupuestoPDF } = await import(
        "../../Pdf/PresupuestosReport/PresupuestoFormatoPDF"
      );

      // 3. Generar PDF
      const blob = await pdf(
        <PresupuestoPDF data={presupuesto} />
      ).toBlob();

      // 4. Descargar archivo
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
      Reporte Presupuesto
    </button>
  );
}