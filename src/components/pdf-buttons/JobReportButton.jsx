import React from "react";

import { pdf }
from "@react-pdf/renderer";

import { FiPrinter }
from "react-icons/fi";

export default function JobReportButton({
  item,
}) {

  const handlePrint = async () => {

    try {


      const {
        default: JobReportPDF
      } = await import(
        "../../pdf/JobAplication/JobReportPDF"
      );

      const blob = await pdf(

        <JobReportPDF
          item={item}
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
       className="p-2 rounded-full   bg-red-100 dark:bg-red-900/30  text-red-600 dark:text-red-400  hover:bg-red-200 dark:hover:bg-red-800   transition duration-200  flex items-center justify-center">

      <FiPrinter  size={14} />

    </button>

  );

}