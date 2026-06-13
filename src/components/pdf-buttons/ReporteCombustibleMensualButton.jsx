import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FaFilePdf } from "react-icons/fa6";

import { useVehicleResumenStore }
from "../../zustand/usevehicleResumenStore";

import { formatChartData }
from "../../helpers/formatChartData";

export default function ReporteCombustibleButton() {

  const {
    chartData,
    anualData,
  } = useVehicleResumenStore();

  const handleDownload = async () => {
    try {

      const mensual =
        formatChartData(chartData || []);

      const { default: ReporteCombustibleMensualPDF } =
        await import(
          "../../Pdf/Combustible/ReporteCombustibleMensual"
        );

      const blob = await pdf(
        <ReporteCombustibleMensualPDF
          mensual={mensual}
        />
      ).toBlob();

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "reporte-combustible.pdf";

      link.click();

      URL.revokeObjectURL(url);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      title="Reporte Mensual"
      className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition"
    >
      <FaFilePdf size={20} />
    </button>
  );
}