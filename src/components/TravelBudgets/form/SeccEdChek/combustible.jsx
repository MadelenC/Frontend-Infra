
import React from "react";
import Section from "../../../common/Section";
import Input from "../../../common/Input";

export default function Combustible({
  form,
  errors,
  handleChange,
  handleBlur,
  collapsed,
  toggle,
  combustible,
  combustibleTotal,
}) {
  return (
    <Section
      title="2️⃣ Combustible y viaje"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-3 gap-4 mt-2 dark:text-gray-300">

        {/* LITROS */}
        <Input
          label="Gasolina/Diesel (L) *"
          type="number"
          value={form.litros}
          onChange={(v) =>
            handleChange("litros", v)
          }
          onBlur={(v) =>
            handleBlur("litros", v)
          }
          error={errors.litros}
        />

        {/* PRECIO */}
        <Input
          label="Precio por litro *"
          type="number"
          value={form.precioLitro}
          onChange={(v) =>
            handleChange(
              "precioLitro",
              v
            )
          }
          onBlur={(v) =>
            handleBlur(
              "precioLitro",
              v
            )
          }
          error={errors.precioLitro}
        />

        {/* COMBUSTIBLE */}
        <Input
          label="Combustible (Bs)"
          value={combustible}
          readOnly
        />

        {/* TOTAL COMBUSTIBLE */}
        <Input
          label="Combustible total"
          value={combustibleTotal}
          readOnly
        />

        {/* HORA SALIDA */}
        <Input
          label="Hora salida *"
          type="time"
          value={form.horaSalida}
          onChange={(v) =>
            handleChange(
              "horaSalida",
              v
            )
          }
          onBlur={(v) =>
            handleBlur(
              "horaSalida",
              v
            )
          }
          error={errors.horaSalida}
        />

        {/* HORA LLEGADA */}
        <Input
          label="Hora llegada *"
          type="time"
          value={form.horaLlegada}
          onChange={(v) =>
            handleChange(
              "horaLlegada",
              v
            )
          }
          onBlur={(v) =>
            handleBlur(
              "horaLlegada",
              v
            )
          }
          error={errors.horaLlegada}
        />

        {/* MATERIA */}
        <Input
          label="Materia"
          value={form.materia}
          onChange={(v) =>
            handleChange(
              "materia",
              v
            )
          }
        />

        {/* DOCENTES */}
        <Input
          label="Docentes"
          value={form.docentes}
          onChange={(v) =>
            handleChange(
              "docentes",
              v
            )
          }
        />

        {/* SIGLA */}
        <Input
          label="Sigla"
          value={form.sigla}
          onChange={(v) =>
            handleChange(
              "sigla",
              v
            )
          }
        />

        {/* NOTA */}
        <Input
          label="Nota"
          value={form.nota}
          onChange={(v) =>
            handleChange(
              "nota",
              v
            )
          }
          colSpan={3}
        />
      </div>
    </Section>
  );
}