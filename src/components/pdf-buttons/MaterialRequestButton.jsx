import React from "react";
import { pdf } from "@react-pdf/renderer";
import { FaEye } from "react-icons/fa";

import MaterialRequestPdf from "../../Pdf/MaterialRequestPdf/MaterialRequestPdf";

import { getRequestById } from "../../services/materialOrderService";


export default function MaterialRequestButton({ requestId }) {

  const handleDownload = async () => {

    try {

      const res = await getRequestById(requestId);

      const request = Array.isArray(res)
        ? res[0]
        : res;

      const blob = await pdf(
        <MaterialRequestPdf request={request} />
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `Solicitud_Material_${requestId}.pdf`;

      a.click();

      URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <button
      onClick={handleDownload}
      className="p-2 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 transition"
      title="Ver solicitud"
    >
      <FaEye size={14} />
    </button>
  );
}