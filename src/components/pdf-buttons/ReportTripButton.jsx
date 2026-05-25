import React from "react";
import { pdf } from "@react-pdf/renderer";
import ReportTrip from "../../Pdf/ReportTrip/ReportTrip";
import { getTripReportById } from "../../services/TripReportService";
import { FiPrinter } from "react-icons/fi";

export default function ReportTripButton({ tripId }) {

  const handleDownload = async () => {
    try {
      const res = await getTripReportById(tripId);

     
      const trip = res?.data || res;
       console.log("viajes =>", trip);

      const blob = await pdf(
        <ReportTrip trip={trip} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Informe_Viaje_${tripId}.pdf`;
      a.click();


      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Error generando PDF:", err);
    }
  };

  return (
   <button
  onClick={handleDownload}
  title="Imprimir PDF"
  className="p-2 rounded-full   bg-red-100 dark:bg-red-900/30  text-red-600 dark:text-red-400  hover:bg-red-200 dark:hover:bg-red-800   transition duration-200  flex items-center justify-center">

  <FiPrinter />
</button>
  );
}