import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FiFileText,FiPrinter } from "react-icons/fi";

import { useReporteDepartureStore } from "../../zustand/useReporteDepartureStore";

export default function BoletaDeparturesButton({ boletaId }) {
  const fetchBoleta = useReporteDepartureStore((s) => s.fetchBoleta);

  const handleDownload = async () => {
    try {
      const data = await fetchBoleta(boletaId);
       const fechaImpresion = new Date().toLocaleDateString("es-BO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      

      console.log("DATA PDF:", data);

      if (!data) return;

      const { default: ReporteDeparture } = await import(
        "../../Pdf/DepartureAuthorization/ReporteDeparture"
      );

      const blob = await pdf(
        <ReporteDeparture boleta={data} 
        fechaImpresion={fechaImpresion}/>
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `boleta-salida-${boletaId}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      title="Imprimir boleta de salida"
      className="p-2 rounded-full   bg-red-100 dark:bg-red-900/30  text-red-600 dark:text-red-400  hover:bg-red-200 dark:hover:bg-red-800   transition duration-200  flex items-center justify-center"
    >
      <FiPrinter/>
    </button>
  );
}