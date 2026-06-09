import React, { useState, useEffect  } from "react";
import { toast } from "react-toastify";

import DatosForm from "./SeccEdChek/Datos";
import Combustible from "./SeccEdChek/Combustible";
import Peajes from "./SeccEdChek/Peajes";
import Transport from "./SeccEdChek/Transport";
import { useTravelBudgetsStore } from "../../../zustand/useTravelBudgetsStore";

export default function EditCheckTripForm({
  data,
  onClose,
  choferes,
  encargados,
  vehiculos,
}) {

  const { editBudget } = useTravelBudgetsStore();


  
  const [form, setForm] = useState({
   vehiculo: String(
  data?.vehiculo?.id || data?.vehiculo || ""
),

chofer: String(
  data?.chofer?.id || data?.chofer || ""
),

encargado: String(
  data?.encargado?.id || data?.encargado || ""
),

vehiculoNombre: data?.vehiculo
  ? `${data.vehiculo.tipog} - ${data.vehiculo.placa}`
  : "",

choferNombre: data?.chofer
  ? `${data.chofer.nombres} ${data.chofer.apellidos}`
  : "",

encargadoNombre: data?.encargado
  ? `${data.encargado.nombres} ${data.encargado.apellidos}`
  : "",

  fecha: data?.fecha_sa || "",

  litros: data?.cantidad1 || "",
  precioLitro: data?.precio1 || "",
  horaSalida: data?.hsalida || "",
  horaLlegada: data?.hllegada || "",

  materia: data?.materia || "",
  docentes: data?.ndocentes || "",
  sigla: data?.sigla || "",
  nota: data?.nota || "",

  peajes: [
    {
      nro: data?.cantidad5 || "",
      precio: data?.precio5 || "",
    },
  ],

  viaticosProvincia: [
    {
      _v: data?.cantidad3 || "",
      _p: data?.precio3 || "",
    },
  ],

  viaticosFrontera: [
    {
      _v: data?.cantidad4 || "",
      _p: data?.precio4 || "",
    },
  ],

  viaticosCiudad: [
    {
      dias: data?.cantidad2 || "",
      precio: data?.precio2 || "",
    },
  ],

  mantenimiento: [
    {
      _v: data?.cantidad6 || "",
      _p: data?.precio6 || "",
    },
  ],

  garaje: [
    {
      _v: data?.cantidad7 || "",
      _p: data?.precio7 || "",
    },
  ],

  transporte: [
    {
      ruta: data?.r1 || "",
      personas: data?.p1 || "",
      costo: data?.c1 || "",
    },

    {
      ruta: data?.r2 || "",
      personas: data?.p2 || "",
      costo: data?.c2 || "",
    },
  ],

  flete: [
    {
      vueltas: data?.p3 || "",
      costo: data?.c3 || "",
    },
  ],
});
useEffect(() => {
  if (!data) return;

      setForm({
        vehiculo: String(
        data?.vehiculo?.id || data?.vehiculo || ""
          ),

        chofer: String(
          data?.chofer?.id || data?.chofer || ""
        ),

        encargado: String(
          data?.encargado?.id || data?.encargado || ""
        ),


        vehiculoNombre: data?.vehiculo
          ? `${data.vehiculo.tipog} - ${data.vehiculo.placa}`
          : "",

        choferNombre: data?.chofer
          ? `${data.chofer.nombres} ${data.chofer.apellidos}`
          : "",

        encargadoNombre: data?.encargado
          ? `${data.encargado.nombres} ${data.encargado.apellidos}`
          : "",
        fecha: data?.fecha_sa || "",

        litros: data?.cantidad1 || "",
        precioLitro: data?.precio1 || "",
        horaSalida: data?.hsalida || "",
        horaLlegada: data?.hllegada || "",

        materia: data?.materia || "",
        docentes: data?.ndocentes || "",
        sigla: data?.sigla || "",
        nota: data?.nota || "",

        peajes: [
          {
            nro: data?.cantidad5 || "",
            precio: data?.precio5 || "",
          },
        ],

        viaticosProvincia: [
          {
            _v: data?.cantidad3 || "",
            _p: data?.precio3 || "",
          },
        ],

        viaticosFrontera: [
          {
            _v: data?.cantidad4 || "",
            _p: data?.precio4 || "",
          },
        ],

        viaticosCiudad: [
          {
            dias: data?.cantidad2 || "",
            precio: data?.precio2 || "",
          },
        ],

        mantenimiento: [
          {
            _v: data?.cantidad6 || "",
            _p: data?.precio6 || "",
          },
        ],

        garaje: [
          {
            _v: data?.cantidad7 || "",
            _p: data?.precio7 || "",
          },
        ],

        transporte: [
          {
            ruta: data?.r1 || "",
            personas: data?.p1 || "",
            costo: data?.c1 || "",
          },

          {
            ruta: data?.r2 || "",
            personas: data?.p2 || "",
            costo: data?.c2 || "",
          },
        ],

        flete: [
          {
            vueltas: data?.p3 || "",
            costo: data?.c3 || "",
          },
        ],
      });
  }, [data]); 


  
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

  
  const handleUpdate = async () => {
  try {
    const res = await editBudget(data.id, form);

    if (!res.ok) {
      toast.error(res.error || "Error al actualizar");
      return;
    }

    toast.success("Registro actualizado");

    onClose();
  } catch (error) {
    console.error(error);
    toast.error("Error inesperado al actualizar");
  }
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
          vehiculos={data?.vehiculo ? [data.vehiculo] : []}
          choferes={data?.chofer ? [data.chofer] : []}
          encargados={data?.encargado ? [data.encargado] : []}
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