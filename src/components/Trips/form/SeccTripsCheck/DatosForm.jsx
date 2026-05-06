import React from "react";
import Section from "../../../common/Section";
import Input from "../../../common/Input";
import Select from "react-select";

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

  // OPTIONS
 const vehiculoOptions = vehiculos.map(v => ({
  value: v.id,
  label: `${v.tipog} - ${v.placa}`
}));

const choferOptions = choferes.map(c => ({
  value: c.id,
  label: `${c.nombres} ${c.apellidos}`
}));


const encargadoOptions = encargados.map(e => ({
  value: e.id,
  label: `${e.nombres} ${e.apellidos}`
}));

  const selectedVehiculos = vehiculoOptions.filter(opt =>
    form?.vehiculo?.some(v => v.value === opt.value)
  );

  const selectedChoferes = choferOptions.filter(opt =>
    form?.chofer?.some(c => c.value === opt.value)
  );

  const selectedEncargados = encargadoOptions.filter(opt =>
    form?.encargado?.some(e => e.value === opt.value)
  );

   console.log("vehiculos:", vehiculos);
  console.log("vehiculoOptions:", vehiculoOptions);
  console.log("choferes:", choferes);
  console.log("encargados:", encargados);

  return (
    <Section
      title="1️⃣ Datos generales"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-2 gap-4 mt-2">

        {/* VEHICULO */}
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Vehículo :
          </label>

        <Select
  isMulti
  options={vehiculoOptions}
  value={vehiculoOptions.filter(opt => form.vehiculo.includes(opt.value))}
  onChange={(selected) =>
    handleChange("vehiculo", selected || [])
  }
/>

          {errors.vehiculo && (
            <p className="text-red-500 text-sm mt-1">{errors.vehiculo}</p>
          )}
        </div>

        {/* CHOFER */}
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Chofer *
          </label>

        <Select
  isMulti
  options={choferOptions}
  value={choferOptions.filter(opt => form.chofer.includes(opt.value))}
  onChange={(selected) =>
    handleChange("chofer", selected || [])
  }
/>

          {errors.chofer && (
            <p className="text-red-500 text-sm mt-1">{errors.chofer}</p>
          )}
        </div>

        {/* ENCARGADO */}
        <div>
          <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
            Encargado:
          </label>

         <Select
  isMulti
  options={encargadoOptions}
  value={encargadoOptions.filter(opt => form.encargado.includes(opt.value))}
  onChange={(selected) =>
    handleChange("encargado", selected || [])
  }
/>

          {errors.encargado && (
            <p className="text-red-500 text-sm mt-1">{errors.encargado}</p>
          )}
        </div>

        {/* FECHA */}
        <Input
          label="Fecha *"
          type="date"
          value={form.fecha}
          onChange={(v) => handleChange("fecha", v)}
          onBlur={(v) => handleBlur("fecha", v)}
          error={errors.fecha}
        />

      </div>
    </Section>
  );
}