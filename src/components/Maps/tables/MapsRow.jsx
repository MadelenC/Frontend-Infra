import React, { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import ModalMap from "./ModalMap";

export default function MapsRow({ item, index }) {
  const [showMap, setShowMap] = useState(false);

  const handleViewMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-3 py-2 border-b text-center">{index + 1}</td>
        <td className="px-3 py-2 border-b">{item.destino}</td>
        <td className="px-3 py-2 border-b">{item.titulo}</td>
        <td className="px-3 py-2 border-b text-center">{item.lat}</td>
        <td className="px-3 py-2 border-b text-center">{item.lng}</td>

        <td className="px-3 py-2 border-b text-center">
          <button
            onClick={handleViewMap}
            title="Ver mapa"
            className="w-8 h-8 flex items-center justify-center mx-auto
                       rounded-full bg-green-50 text-green-600
                       hover:bg-green-100 transition"
          >
            <FaMapMarkedAlt size={14} />
          </button>
        </td>
      </tr>

      {showMap && (
        <ModalMap
          lat={item.lat}
          lng={item.lng}
          destino={item.destino}
          onClose={handleCloseMap}
        />
      )}
    </>
  );
}

