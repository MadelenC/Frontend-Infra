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

  return (
    <Section
          title="3️⃣ Datos"
          collapsed={collapsed}
          toggle={toggle}
        >
    <div className="grid grid-cols-2 gap-4 mt-2 dark:text-gray-300">

      <Select
        isMulti
        options={vehiculoOptions}
        value={vehiculoOptions.filter(opt => form.vehiculo.includes(opt.value))}
        onChange={(selected) =>
          handleChange("vehiculo", selected.map(s => s.value))
        }
        placeholder="Seleccionar vehículos"
      />

      <Select
        isMulti
        options={choferOptions}
        value={choferOptions.filter(opt => form.chofer.includes(opt.value))}
        onChange={(selected) =>
          handleChange("chofer", selected.map(s => s.value))
        }
        placeholder="Seleccionar chofer"
      />

      <Select
        isMulti
        options={encargadoOptions}
        value={encargadoOptions.filter(opt => form.encargado.includes(opt.value))}
        onChange={(selected) =>
          handleChange("encargado", selected.map(s => s.value))
        }
        placeholder="Seleccionar encargado"
      />

    </div>
    </Section>
  );
}