import React from "react";
import Section from "../../../common/Section";
import Input from "../../../common/Input";

export default function Combustible({
  form = {},
  errors = {},
  handleChange,
  handleBlur,
  collapsed,
  toggle,
  combustible,
  combustibleTotal,
  costoTotal,
  
}) {

  const safeCombustible =
    Number.isFinite(combustible) ? combustible : 0;

  const safeCosto =
    Number.isFinite(costoTotal) ? costoTotal : 0;

  return (
    <Section
      title="2️⃣ Combustible y viaje"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-3 gap-4 mt-2 dark:text-gray-300">

        
        <Input
          label="Gasolina/Diesel (L)"
          type="number"
          value={form?.division1 || ""}
          onChange={(v) => handleChange("division1", v)}
          onBlur={(v) => handleBlur("division1", v)}
          error={errors.division1}
        />

       
        <Input
          label="Combustible (calculado)"
          value={safeCombustible.toFixed(2)}
          readOnly
        />

        
        <Input
          label="Combustible total"
          type="number"
          value={form?.combustibleTotal || ""}
          onChange={(v) => handleChange("combustibleTotal", v)}
          onBlur={(v) => handleBlur("combustibleTotal", v)}
        />

        <Input
          label="Precio (Bs/L)"
          type="number"
          value={form?.precioLitro || ""}
          onChange={(v) => handleChange("precioLitro", v)}
          onBlur={(v) => handleBlur("precioLitro", v)}
          error={errors.precioLitro}
        />

       
        <Input
          label="Costo total"
          value={safeCosto.toFixed(2)}
          readOnly
        />

        
        <Input
          label="Hora salida *"
          type="time"
          value={form?.horaSalida || ""}
          onChange={(v) => handleChange("horaSalida", v)}
          onBlur={(v) => handleBlur("horaSalida", v)}
          error={errors.horaSalida}
        />

        
        <Input
          label="Hora llegada *"
          type="time"
          value={form?.horaLlegada || ""}
          onChange={(v) => handleChange("horaLlegada", v)}
          onBlur={(v) => handleBlur("horaLlegada", v)}
          error={errors.horaLlegada}
        />

        <Input
          label="Materia"
          value={form?.materia || ""}
          onChange={(v) => handleChange("materia", v)}
        />

        
        <Input
          label="Docentes"
          value={form?.docentes || ""}
          onChange={(v) => handleChange("docentes", v)}
        />

     
        <Input
          label="Sigla"
          value={form?.sigla || ""}
          onChange={(v) => handleChange("sigla", v)}
        />

        <Input
          label="Nota"
          value={form?.nota || ""}
          onChange={(v) => handleChange("nota", v)}
          colSpan={3}
        />

      </div>
    </Section>
  );
}