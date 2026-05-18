import React from "react";

import { pdf } from "@react-pdf/renderer";

import { FiFileText } from "react-icons/fi";

import HojaRutaPDF
from "../Pdf/tripsHojaRuta/HojaRutaPDF";

import {
  getHojaRuta
} from "../../services/hojaRutaService";

export default function HojaRutaButton({
  viajeId,
}) {

  const handleDownload = async () => {

    try {

      const res =
        await getHojaRuta(viajeId);

      const data =
        res.data?.data;

      if (!data) return;

      const blob = await pdf(

        <HojaRutaPDF
          data={data}
        />

      ).toBlob();

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `hoja-ruta-${viajeId}.pdf`;

      link.click();

      URL.revokeObjectURL(url);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <button
       onClick={handleDownload}
  className="
    flex items-center gap-1
    bg-red-600 hover:bg-red-700
    text-white text-xs
    px-2 py-1
    rounded
    w-full
  "
    >

      <FiFileText />

      Imprimir Ruta

    </button>

  );

}