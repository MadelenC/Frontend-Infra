import React from "react";

export default function Combustible({
  formData,
  handleChange,
}) {

  const totalRecargue =
    Number(formData.recargue1 || 0) +
    Number(formData.recargue2 || 0) +
    Number(formData.recargue3 || 0);

  const totalCompra =
    Number(formData.compra1 || 0) +
    Number(formData.compra2 || 0) +
    Number(formData.compra3 || 0);

  return (
    <div className="space-y-6">

      {/* ASIGNACION */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center gap-3">

          <label className="font-semibold text-gray-700 min-w-[280px]">
            Asignación Total del Combustible:
          </label>

          <div className="flex items-center gap-2">

            <input
              type="number"
              name="asignacionCombustible"
              value={formData.asignacionCombustible}
              onChange={handleChange}
              className="w-32 border rounded-xl p-3"
            />

            <span className="text-gray-600 font-medium">
              Litros
            </span>

          </div>

        </div>

      </div>

      {/* REGISTROS */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* FILA 1 */}
          <div className="border rounded-2xl p-4 bg-gray-50">

            <h4 className="font-bold text-gray-700 mb-4">
              Registro 1
            </h4>

            <div className="space-y-4">

              <div>
                <label className="block text-sm mb-2 font-medium">
                  Recargue
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    name="recargue1"
                    value={formData.recargue1}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  <span className="text-sm text-gray-500">
                    litros
                  </span>

                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium">
                  Compra
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    name="compra1"
                    value={formData.compra1}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  <span className="text-sm text-gray-500">
                    Bs.
                  </span>

                </div>
              </div>

            </div>

          </div>

          {/* FILA 2 */}
          <div className="border rounded-2xl p-4 bg-gray-50">

            <h4 className="font-bold text-gray-700 mb-4">
              Registro 2
            </h4>

            <div className="space-y-4">

              <div>
                <label className="block text-sm mb-2 font-medium">
                  Recargue
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    name="recargue2"
                    value={formData.recargue2}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  <span className="text-sm text-gray-500">
                    litros
                  </span>

                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium">
                  Compra
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    name="compra2"
                    value={formData.compra2}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  <span className="text-sm text-gray-500">
                    Bs.
                  </span>

                </div>
              </div>

            </div>

          </div>

          {/* FILA 3 */}
          <div className="border rounded-2xl p-4 bg-gray-50">

            <h4 className="font-bold text-gray-700 mb-4">
              Registro 3
            </h4>

            <div className="space-y-4">

              <div>
                <label className="block text-sm mb-2 font-medium">
                  Recargue
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    name="recargue3"
                    value={formData.recargue3}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  <span className="text-sm text-gray-500">
                    litros
                  </span>

                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 font-medium">
                  Compra
                </label>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    name="compra3"
                    value={formData.compra3}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                  <span className="text-sm text-gray-500">
                    Bs.
                  </span>

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* TOTALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

          <p className="text-sm text-gray-600 mb-2">
            Total recargue
          </p>

          <div className="flex items-end gap-2">

            <h2 className="text-3xl font-bold text-green-700">
              {totalRecargue.toFixed(2)}
            </h2>

            <span className="text-gray-600 mb-1">
              litros
            </span>

          </div>

        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">

          <p className="text-sm text-gray-600 mb-2">
            Total compra
          </p>

          <div className="flex items-end gap-2">

            <h2 className="text-3xl font-bold text-blue-700">
              {totalCompra.toFixed(2)}
            </h2>

            <span className="text-gray-600 mb-1">
              Bs.
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}