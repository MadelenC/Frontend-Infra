import React from "react";
import Section from "../../../common/Section";
import Input from "../../../common/Input";

export default function DatosForm({
  form,
  errors,
  handleChange,
  handleBlur,
  collapsed,
  toggle,
}) {

  return (
    <Section
      title="1️⃣ Datos generales"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-2 gap-4 mt-2">

        {/* VEHÍCULO */}
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Vehículo :
          </label>

          <input
            type="text"
            value={form.vehiculoNombre || ""}
            disabled
            className="w-full border px-3 py-2 rounded text-sm 
            bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* CHOFER */}
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Chofer :
          </label>

          <input
            type="text"
            value={form.choferNombre || ""}
            disabled
            className="w-full border px-3 py-2 rounded text-sm 
            bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* ENCARGADO */}
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Encargado :
          </label>

          <input
            type="text"
            value={form.encargadoNombre || ""}
            disabled
            className="w-full border px-3 py-2 rounded text-sm 
            bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* FECHA */}
        <Input
          label="Fecha *"
          type="date"
          value={form.fecha}
          onChange={(v) =>
            handleChange("fecha", v)
          }
          onBlur={(v) =>
            handleBlur("fecha", v)
          }
          error={errors.fecha}
        />

      </div>
    </Section>
  );
}