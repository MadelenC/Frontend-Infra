import React, { useState, useEffect } from "react";
import RepaymentRow from "./RepaymentRow";
import EditRepaymentForm from "../Form/EditRepaymentForm";
import { useRepaymentStore } from "../../../zustand/useRepaymetnStore";


export default function TableRepayment() {
  const { repayments, fetchRepayments, editRepayment, removeRepayment } =
    useRepaymentStore();
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchRepayments();
  }, []);

  const filteredData =
    repayments?.filter((item) => {
      const itemDate = new Date(item.fecha);
      const matchStart = startDate ? itemDate >= new Date(startDate) : true;
      const matchEnd = endDate ? itemDate <= new Date(endDate) : true;
      const matchSearch = item.nombre
        ? item.nombre.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchStart && matchEnd && matchSearch;
    }) || [];

  
  const handleSave = async (updatedData) => {
    if (!editingItem) return;

    const { ok, error } = await editRepayment(editingItem.id, updatedData);
    if (ok) setEditingItem(null);
    else alert("Error al actualizar: " + error);
  };

  
  const handleDelete = async (id) => {
    const { ok, error } = await removeRepayment(id);
    if (!ok) alert("Error al eliminar: " + error);
    else if (editingItem?.id === id) setEditingItem(null);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-900">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div className="flex flex-wrap gap-2 items-center text-gray-700 dark:text-gray-200">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
          <label className="text-sm">
            Desde:{" "}
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-2 py-1 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </label>
          <label className="text-sm">
            Hasta:{" "}
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-2 py-1 rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </label>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Imprimir
        </button>
      </div>

      
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
          <tr>
            {[
              "#",
              "Serial",
              "Fecha",
              "Nombre",
              "Cantidad",
              "Detalle",
              "Vehiculo",
              "Operación",
            ].map((header) => (
              <th
                key={header}
                className="border px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200 dark:border-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 ? (
            filteredData.map((item, index) => (
              <RepaymentRow
                key={item.id || index}
                item={item}
                index={index + 1}
                onAction={(type, item) => {
                if (type === "edit") setEditingItem(item);
                if (type === "delete") handleDelete(item.id);
                if (type === "print") window.print(); 
              }}

              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500 dark:text-gray-400">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </table>

      
      {editingItem && (
        <EditRepaymentForm
          isOpen={!!editingItem}
          maintenance={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}      
          onDelete={handleDelete}  
        />
      )}
    </div>
  );
}