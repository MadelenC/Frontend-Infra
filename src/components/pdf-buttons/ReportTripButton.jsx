import React from "react";
import { pdf } from "@react-pdf/renderer";
import ReportTrip from "../../Pdf/ReportTrip/ReportTrip";
import { getTripReportById } from "../../services/TripReportService";

export default function ReportTripButton({ tripId }) {

  const handleDownload = async () => {
    try {
      const data = await getTripReportById(tripId);

      const blob = await pdf(
        <ReportTrip data={data} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `Informe_${tripId}.pdf`;
      a.click();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleDownload}>
      Generar PDF
    </button>
  );
}