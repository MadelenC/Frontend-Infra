import React, { useState, useEffect } from "react";

export default function TripsCajaForm({
  viajeData,
  choferes,
  encargados,
  vehiculos,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    vehiculo: "",
    chofer: "",
    encargado: "",
    kmRecorridos: 0,
    litros: 0,
    nroVuelta: "",
    fechaVuelta: "",
    nroOrden: "",
    objetivo: "",
  });


  useEffect(() => {
    if (!viajeData) return;

    setForm({
      vehiculo: viajeData.vehiculo || "",
      chofer: viajeData.chofer || "",
      encargado: viajeData.encargado || "",
      kmRecorridos: viajeData.km || 0,
      litros: 0,
      nroVuelta: "",
      fechaVuelta: "",
      nroOrden: "",
      objetivo: viajeData.objetivo || "",
    });
  }, [viajeData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-10 z-50 bg-black/40 backdrop-blur-sm overflow-hidden">
  
  <div className="bg-white w-[95%] sm:w-[80%] md:w-[60%] max-w-[800px] max-h-[85vh] overflow-y-auto p-6 rounded-xl shadow-lg space-y-6 relative dark:bg-gray-800">
       <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray font-bold bg-white-600 px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          X
        </button>

        <h2 className="text-2xl font-semibold text-center dark:text-gray-200">
          Presupuesto de viaje por caja
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block dark:text-gray-300 ">Vehículo:</label>
            <select
              value={form.vehiculo}
              onChange={(e) => handleChange("vehiculo", e.target.value)}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.tipog} {v.placa}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block  dark:text-gray-300">Chofer:</label>
            <select
              value={form.chofer}
              onChange={(e) => handleChange("chofer", e.target.value)}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            >
              <option value="">Seleccione un chofer</option>
              {choferes?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombres} {c.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block dark:text-gray-300">Encargado del viaje:</label>
            <select
              value={form.encargado}
              onChange={(e) => handleChange("encargado", e.target.value)}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            >
              <option value="" className="dark:-text-gray-300">Seleccione un encargado</option>
              {encargados?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombres} {e.apellidos}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" space-y-1">
          <p className="text-lg font dark:text-gray-300">
            Viaje: {viajeData?.entidad || "SIN NOMBRE"} con {form.kmRecorridos} km.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font dark:text-gray-300">
              Klometraje Total:
            </label>
            <input
              type="number"
              value={form.litros}
              onChange={(e) => handleChange("litros", Number(e.target.value))}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div>
            <label className="block font dark:text-gray-300">
              Gasolina/Diesel(Litros):
            </label>
            <input
              type="number"
              value={form.litros}
              onChange={(e) => handleChange("litros", Number(e.target.value))}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>
          <div>
            <label className="block dark:text-gray-300">
              Litros:
            </label>
            <input
              type="number"
              value={form.litros}
              readOnly
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div>
            <label className="block font-size dark:text-gray-300">
              Nro. de vuelta:
            </label>
            <input
              type="text"
              value={form.nroVuelta}
              onChange={(e) => handleChange("nroVuelta", e.target.value)}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div>
            <label className="block font-size dark:text-gray-300">
              Fecha del Nro. vuelta:
            </label>
            <input
              type="date"
              value={form.fechaVuelta}
              onChange={(e) => handleChange("fechaVuelta", e.target.value)}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          <div>
            <label className="block dark:text-gray-300 ">
              Nro. de orden:
            </label>
            <input
              type="text"
              value={form.nroOrden}
              onChange={(e) => handleChange("nroOrden", e.target.value)}
              className="border rounded px-3 py-1 w-full dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>
        </div>
        <div>
          <label className="block dark:text-gray-300 ">
            Objetivo del viaje:
          </label>

          <textarea
            value={form.objetivo}
            onChange={(e) => handleChange("objetivo", e.target.value)}
            className="border rounded px-3 py-2 w-full min-h-[90px] dark:bg-gray-200/40 dark:border-gray-200"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}