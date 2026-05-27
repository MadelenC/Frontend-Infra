// src/Pdf/RequestPdf/RequestButton.jsx

import React from "react";
import { pdf } from "@react-pdf/renderer";

import RequestPdf from "../../Pdf/RequestPdf/RequestPdf";
import { getRequestById } from "../../services/materialOrderService";
import { FaFilePdf } from "react-icons/fa6";

export default function RequestButton({
  requestId,
  blank = false,
}) {

  const handleDownload = async () => {

    try {

      let request = {};

      // SI NO ES EN BLANCO
      if (!blank) {

        const res = await getRequestById(requestId);

        request = Array.isArray(res)
          ? res[0]
          : res;

      } else {

        // PDF VACÍO
        request = {
          solicitud: {
            vehiculo: {},
          },
        };

      }

      const blob = await pdf(
        <RequestPdf request={request} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = blank
        ? "Peticion_Blanco.pdf"
        : `Peticion_${requestId}.pdf`;

      a.click();

      URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <button onClick={handleDownload}className="text-red-500 hover:text-red-300" title="Descargar PDF" >
      <FaFilePdf size={20} />
    </button>
  );
}