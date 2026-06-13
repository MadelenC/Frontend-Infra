import React from "react";
import Select from "react-select";
import Section from "../../../common/Section";

export default function DatosForm({
  form,
  collapsed,
  toggle,
  handleChange,
  vehiculos = [],
  choferes = [],
  encargados = [],
}) {

  const vehiculoOptions = vehiculos.map(v => ({
    value: v.id,
    label: `${v.tipo} - ${v.placa}`
  }));

  const choferOptions = choferes.map(c => ({
    value: c.id,
    label: `${c.nombres} ${c.apellidos}`
  }));

  const encargadoOptions = encargados.map(e => ({
    value: e.id,
    label: `${e.nombres} ${e.apellidos}`
  }));

  return (
    <Section
      title="3️⃣ Datos"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-2 gap-4 mt-2 dark:text-gray-300">

        {/* VEHICULOS */}
        <div>
          <label className="block mb-1 font-medium">
            Vehículos
          </label>

          <Select
            options={vehiculoOptions}
            value={
              vehiculoOptions.find(
                opt => opt.value === form.vehiculo
              ) || null
            }
            onChange={(selected) =>
              handleChange(
                "vehiculo",
                selected?.value || ""
              )
            }
            placeholder="Seleccionar vehículo"
          />
        </div>

        {/* CHOFER */}
        <div>
          <label className="block mb-1 font-medium">
            Chofer
          </label>

          <Select
            options={choferOptions}
            value={
              choferOptions.find(
                opt => opt.value === form.chofer
              ) || null
            }
            onChange={(selected) =>
              handleChange(
                "chofer",
                selected?.value || ""
              )
            }
            placeholder="Seleccionar chofer"
          />
        </div>

        {/* ENCARGADO */}
        <div>
          <label className="block mb-1 font-medium">
            Encargado
          </label>

          <Select
            options={encargadoOptions}
            value={
              encargadoOptions.find(
                opt => opt.value === form.encargado
              ) || null
            }
            onChange={(selected) =>
              handleChange(
                "encargado",
                selected?.value || ""
              )
            }
            placeholder="Seleccionar encargado"
          />
        </div>

        {/* FECHA */}
        <div>
          <label className="block mb-1 font-medium">
            Fecha
          </label>

          <input
            type="date"
            value={form.fecha || ""}
            onChange={(e) =>
              handleChange("fecha", e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2
            dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

      </div>
    </Section>
  );
}