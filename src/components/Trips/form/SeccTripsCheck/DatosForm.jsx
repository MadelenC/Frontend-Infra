
import React from "react";
import Section from "../../../common/Section";
import Input from "../../../common/Input";
export default function DatosForm({
 form = {},
  errors = {},
  handleChange,
  handleBlur,
  collapsed,
  toggle,
  vehiculos = [],
  choferes = [],
  encargados = [],
}) {
  return (
    <Section
      title="1️⃣ Datos generales"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-2 gap-4 mt-2">

        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Vehículo :
          </label>

          <select
            value={form?.vehiculo || ""}
            onChange={(e) =>
              handleChange(
                "vehiculo",
                e.target.value
              )
            }
            onBlur={(e) =>
              handleBlur(
                "vehiculo",
                e.target.value
              )
            }
            className={`w-full border px-3 py-2 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${
              errors.vehiculo
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">
              Seleccione un vehículo
            </option>

            {vehiculos?.map((v, i) => (
              <option
                key={i}
                value={`${v.tipog} ${v.placa}`}
              >
                {v.tipog} - {v.placa}
              </option>
            ))}
          </select>

          {errors.vehiculo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vehiculo}
            </p>
          )}
        </div>

        
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Chofer *
          </label>

          <select
            value={form?.chofer || ""}
            onChange={(e) =>
              handleChange(
                "chofer",
                e.target.value
              )
            }
            onBlur={(e) =>
              handleBlur(
                "chofer",
                e.target.value
              )
            }
            className={`w-full border px-3 py-2 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${
              errors.chofer
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">
              Seleccione un chofer
            </option>

            {choferes?.map((c, i) => (
              <option
                key={i}
                value={`${c.nombres} ${c.apellidos}`}
              >
                {c.nombres} {c.apellidos}
              </option>
            ))}
          </select>

          {errors.chofer && (
            <p className="text-red-500 text-sm mt-1">
              {errors.chofer}
            </p>
          )}
        </div>

       
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Encargado:
          </label>

          <select
            value={form?.encargado || ""}
            onChange={(e) =>
              handleChange(
                "encargado",
                e.target.value
              )
            }
            onBlur={(e) =>
              handleBlur(
                "encargado",
                e.target.value
              )
            }
            className={`w-full border px-3 py-2 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${
              errors.encargado
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="">
              Seleccione un encargado
            </option>

            {encargados?.map((e, i) => (
              <option
                key={i}
                value={`${e.nombres} ${e.apellidos}`}
              >
                {e.nombres} {e.apellidos}
              </option>
            ))}
          </select>

          {errors.encargado && (
            <p className="text-red-500 text-sm mt-1">
              {errors.encargado}
            </p>
          )}
        </div>

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

