import React from "react";
import { toast } from "react-toastify";

export default function UpdateKmForm({
  vehicle,
  registrarCambioAceite,
  onClose,
}) {

  const currentKm = Number(
    vehicle.modelos?.[0]?.kilometraje || 0
  );

  const kmUltimoMantenimiento = Number(
    vehicle.modelos?.[0]?.km_ultimo_mantenimiento || 0
  );

  const kmRecorridos =
    currentKm - kmUltimoMantenimiento;

  const limite =
    vehicle.combustible === "Gasolina"
      ? 5000
      : 8000;

  const necesitaMantenimiento =
    kmRecorridos >= limite;

  const handleCambioAceite = async () => {

    try {

      const result =
        await registrarCambioAceite(vehicle.id);

      if (result?.ok === false) {

        toast.error(
          "Error al registrar mantenimiento"
        );

        return;
      }

      toast.success(
        "Cambio de aceite registrado correctamente"
      );

      onClose?.();

    } catch (error) {

      console.error(error);

      toast.error("Ocurrió un error");

    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 relative dark:bg-gray-800">

        <h2 className="pt-5 text-2xl text-center font-semibold text-gray-800 mb-4 dark:text-gray-200">
          Cambio de Aceite
        </h2>

        <p className="mb-2 dark:text-gray-300">
          Vehículo:
          <span className="font-semibold dark:text-gray-400">
            {" "}
            {vehicle.tipo} {vehicle.placa}
          </span>
        </p>

        <p className="mb-2 dark:text-gray-300">
          Kilometraje actual:
          <span className="font-semibold dark:text-gray-400">
            {" "}
            {currentKm} Km
          </span>
        </p>

        <p className="mb-2 dark:text-gray-300">
          Último mantenimiento:
          <span className="font-semibold dark:text-gray-400">
            {" "}
            {kmUltimoMantenimiento} Km
          </span>
        </p>

        <p className="mb-4 dark:text-gray-300">
          Km recorridos:
          <span
            className={`font-bold ${
              necesitaMantenimiento
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {" "}
            {kmRecorridos} Km
          </span>
        </p>

        {
          necesitaMantenimiento && (
            <div className="mb-4 rounded-lg bg-red-100 border border-red-300 p-3 text-red-700 text-sm font-semibold">
              ⚠ El vehículo requiere cambio de aceite
            </div>
          )
        }

        <div className="flex justify-end gap-2 mt-4">

          <button
            type="button"
            onClick={handleCambioAceite}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
          >
            Registrar Cambio
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 text-sm"
          >
            Cancelar
          </button>

        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          X
        </button>

      </div>

    </div>
  );
}