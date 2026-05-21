import React from "react";
import { pdf } from "@react-pdf/renderer";
import ReportTrip from "../../Pdf/ReportTrip/ReportTrip";
import { getTripReportById } from "../../services/TripReportService";
import { FaFilePdf } from "react-icons/fa";

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
  style={{
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    color: "#dc2626",
    transition: "0.2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.color = "#991b1b";
    e.currentTarget.style.transform = "scale(1.1)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.color = "#dc2626";
    e.currentTarget.style.transform = "scale(1)";
  }}
>
  <FaFilePdf />
</button>
  );
}