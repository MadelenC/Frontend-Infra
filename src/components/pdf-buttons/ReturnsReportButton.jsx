import React from "react";

import { pdf }
from "@react-pdf/renderer";

import { FaPrint }
from "react-icons/fa";

export default function ReturnsReportButton({
  data,
}) {

  const handlePrint = async () => {

    try {

      const {
        default: ReturnsReportPDF
      } = await import(
        "../../Pdf/ReturnReportPDF/ReturnsReportPDF"
      );

      const blob = await pdf(

        <ReturnsReportPDF
          data={data}
        />

      ).toBlob();

      const url =
        URL.createObjectURL(blob);

      window.open(url);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <button
      onClick={handlePrint}
      className=" p-2 bg-red-500 text-gray-200 hover:bg-red-700 rounded flex items-center  gap-1 "
    >

      <FaPrint size={14} />Imprimir

    </button>

  );

}