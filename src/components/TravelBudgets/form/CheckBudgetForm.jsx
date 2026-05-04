import React, { useState } from "react";
import { toast } from "react-toastify";

import DatosForm from "./SeccEdChek/Datos";
import Combustible from "./SeccEdChek/Combustible";
import Peajes from "./SeccEdChek/Peajes";
import Transport from "./SeccEdChek/Transport";

export default function CheckTripForm({
  data,
  onClose,
  choferes,
  encargados,
  vehiculos,
}) {
  
  const [form, setForm] = useState({
    vehiculo: data?.vehiculo || "",
    chofer: data?.chofer || "",
    encargado: "",
    fecha: "",

    litros: "",
    precioLitro: "",
    horaSalida: "",
    horaLlegada: "",

    materia: "",
    docentes: "",
    sigla: "",
    nota: "",

    peajes: [{ nro: "", precio: "" }],
    viaticosProvincia: [{ _v: "", _p: "" }],
    viaticosFrontera: [{ _v: "", _p: "" }],
    viaticosCiudad: [{ dias: "", precio: "" }],
    mantenimiento: [{ _v: "", _p: "" }],
    garaje: [{ _v: "", _p: "" }],

    transporte: [
      {
        ruta: "",
        personas: "",
        costo: "",
      },
    ],

    flete: [
      {
        vueltas: "",
        costo: "",
      },
    ],
  });

  
  const [errors, setErrors] = useState({});
  const [collapsed, setCollapsed] =
  useState({
    casilla1: true,
    casilla2: true,
    casilla3: true,
    casilla4: true,
  });

 

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleArrayChange = (
    field,
    index,
    key,
    value
  ) => {
    if (
      value !== "" &&
      Number(value) < 0
    ) {
      return;
    }

    const arr = [...form[field]];

    arr[index][key] = value;

    setForm((prev) => ({
      ...prev,
      [field]: arr,
    }));
  };

  
  const addArrayItem = (
    field,
    template
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        template,
      ],
    }));
  };


  const validateField = (
    name,
    value
  ) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return "Campo obligatorio";
    }

    return "";
  };

  const handleBlur = (
    field,
    value
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(
        field,
        value
      ),
    }));
  };

  // =========================
  // CÁLCULOS
  // =========================

  const combustible = (
    Number(form.litros || 0) *
    Number(form.precioLitro || 0)
  ).toFixed(2);

  const combustibleTotal =
    Math.round(
      Number(form.litros || 0)
    );

  const peajesTotal =
    form.peajes.reduce(
      (sum, p) =>
        sum +
        Number(p.nro || 0) *
          Number(p.precio || 0),
      0
    );

  const viaticosCiudadTotal =
    form.viaticosCiudad.reduce(
      (sum, v) =>
        sum +
        Number(v.dias || 0) *
          Number(v.precio || 0),
      0
    );

  const totalA =
    Number(combustible) +
    peajesTotal +
    viaticosCiudadTotal;

  const transporteTotal =
    form.transporte.reduce(
      (sum, t) =>
        sum +
        Number(t.personas || 0) *
          Number(t.costo || 0),
      0
    );

  const fleteTotal =
    form.flete.reduce(
      (sum, f) =>
        sum +
        Number(f.vueltas || 0) *
          Number(f.costo || 0),
      0
    );

  const totalB =
    transporteTotal + fleteTotal;

  const diferencia =
    totalA - totalB;

  
  const formatBs = (value) =>
    `${Number(value).toFixed(2)} Bs.`;

  
  const handleUpdate = () => {
    toast.success(
      "Registro actualizado"
    );

    console.log(form);

    if (
      typeof data?.onUpdate ===
      "function"
    ) {
      data.onUpdate(form);
    }

    onClose();
  };

  const handleDelete = () => {
    if (
      confirm(
        "¿Seguro que deseas eliminar?"
      )
    ) {
      onClose();
    }
  };

  
  return (
    <div className="fixed inset-0 flex justify-center items-start pt-10 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">

      <div className="bg-white dark:bg-gray-800 w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[1200px] p-6 rounded-xl shadow-lg space-y-6 relative">

        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-200"
        >
          X
        </button>

     
        <h2 className="text-2xl font-bold text-center dark:text-gray-200">
          Presupuesto del viaje
        </h2>

       
        <DatosForm
          form={form}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          vehiculos={vehiculos}
          choferes={choferes}
          encargados={encargados}
          collapsed={collapsed.casilla1}
          toggle={() =>
          setCollapsed((prev) => ({
            ...prev,
            casilla1: !prev.casilla1,
          }))
        }
        />

        
        <Combustible
          form={form}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          combustible={combustible}
          combustibleTotal={
            combustibleTotal
          }
          collapsed={collapsed.casilla2}
          toggle={() =>
          setCollapsed((prev) => ({
            ...prev,
            casilla2: !prev.casilla2,
          }))
        }
        />

        
        <Peajes
          form={form}
          handleArrayChange={
            handleArrayChange
          }
          peajesTotal={peajesTotal}
          viaticosCiudadTotal={
            viaticosCiudadTotal
          }
          totalA={totalA}
          formatBs={formatBs}
            collapsed={collapsed.casilla3}
          toggle={() =>
          setCollapsed((prev) => ({
            ...prev,
            casilla3: !prev.casilla3,
          }))
        }
        />

        
        <Transport
          form={form}
          setForm={setForm}
          addArrayItem={
            addArrayItem
          }
          transporteTotal={
            transporteTotal
          }
          fleteTotal={fleteTotal}
          totalB={totalB}
          diferencia={diferencia}
          formatBs={formatBs}
            collapsed={collapsed.casilla4}
          toggle={() =>
          setCollapsed((prev) => ({
            ...prev,
            casilla4: !prev.casilla4,
          }))
        }
        />

        {/* BOTONES */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 border rounded bg-red-600 text-white"
          >
            Eliminar
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}