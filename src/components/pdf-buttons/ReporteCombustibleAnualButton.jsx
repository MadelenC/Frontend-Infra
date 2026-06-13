import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FaRegFilePdf } from "react-icons/fa6";

import { useVehicleResumenStore }
from "../../zustand/usevehicleResumenStore";

export default function ReporteCombustibleAnualButton() {

  const { anualData } =
    useVehicleResumenStore();

  const handleDownload = async () => {
    try {

      const {
        default: ReporteCombustibleAnualPDF,
      } = await import(
        "../../Pdf/Combustible/ReporteCombustibleAnualPDF"
      );

      const blob = await pdf(
        <ReporteCombustibleAnualPDF
          anual={anualData}
        />
      ).toBlob();

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        "reporte-combustible-anual.pdf";

      link.click();

      URL.revokeObjectURL(url);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      title="Reporte anual"
      className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
    >
      <FaRegFilePdf size={20} />
    </button>
  );
}