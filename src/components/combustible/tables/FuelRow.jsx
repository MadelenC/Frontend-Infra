import React from "react";

export default function FuelRow({ item, index }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-2 border-b">{index}</td>
      <td className="px-6 py-2 border-b">{item.solicitud}</td>
      <td className="px-6 py-2 border-b">{item.pedido}</td>
      <td className="px-6 py-2 border-b">{item.fecha}</td>
      <td className="px-6 py-2 border-b">{item.factura}</td>
      <td className="px-6 py-2 border-b">{item.vehiculo}</td>
      <td className="px-6 py-2 border-b text-center">{item.gasolina}</td>
      <td className="px-6 py-2 border-b text-center">{item.diesel}</td>
      <td className="px-6 py-2 border-b text-center">{item.gnv}</td>
      <td className="px-6 py-2 border-b font-medium">{item.total}</td>
    </tr>
  );
}
