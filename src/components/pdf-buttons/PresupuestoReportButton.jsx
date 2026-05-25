import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FiPrinter } from "react-icons/fi";

import { useBudgetsReportStore } from "../../zustand/useReportBudgetsStore";

export default function PresupuestosReportButton({ budgetId }) {

  const { fetchReporte } = useBudgetsReportStore();

  const handleDownload = async () => {
    try {
      
      const response = await fetchReporte(budgetId);

      const presupuesto = response?.data;

      console.log("PRESUPUESTO =>", presupuesto);
      const { default: PresupuestoPDF } = await import(
        "../../Pdf/PresupuestosReport/PresupuestoFormatoPDF"
      );

      const blob = await pdf(
        <PresupuestoPDF data={presupuesto} />
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
      title="imprimir"
      className="p-2 rounded-full   bg-red-100 dark:bg-red-900/30  text-red-600 dark:text-red-400  hover:bg-red-200 dark:hover:bg-red-800   transition duration-200  flex items-center justify-center">
      <FiPrinter />
    </button>
  );
}