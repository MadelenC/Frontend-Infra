import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DatosViaje from "./Secctions/DatosViaje";
import Viaticos from "./Secctions/Viaticos";
import Combustible from "./Secctions/Combustible";
import Peajes from "./Secctions/Peajes";
import Devoluciones from "./Secctions/Devoluciones";
import InformeViaje from "./Secctions/InformeViaje";
import InformeTecnico from "./Secctions/InformeTecnico";
import SectionCard from "./SectionCard";

import { useTripReportStore } from "../../../../zustand/useTripReportStore";

export default function InformCheck({
  data,
  onClose,
  choferes,
  encargados,
  vehiculos,
}) {
  
  const toNumber = (v) => Number(v || 0);

  const [formData, setFormData] = useState({
    vehiculo: "",
    chofer: "",
    encargado: "",

    fechaPartida: "",
    kmPartida: "",
    horaPartida: "",

    fechaLlegada: "",
    kmLlegada: "",
    horaLlegada: "",

    viaticosCiudad: 0,
    viaticosProvincia: 0,
    viaticosFrontera: 0,

    pasajeros: "",
    kmsDesignados: "",
    diasViaje: "",

    asignacionCombustible: "",

    recargue1: "",
    compra1: "",
    recargue2: 0,
    compra2: 0,
    recargue3: 0,
    compra3: 0,

    montope: "",
    montoim: "",

    peajes: "",
    imprevistos: 0,

    devolucionCombustible: 0,
    devolucionPeajes: 0,
    devolucionImprevistos: 0,

    informeViaje: "",
    descripcionTecnica: "",
    recomendaciones: "",
  });

  const addTripReport = useTripReportStore(
    (state) => state.addTripReport
  );

  const [selectedPiezas, setSelectedPiezas] = useState([]);

 useEffect(() => {
  if (!data) return;

  if (!data?.presupuestos?.length) {
    toast.error("❌ El viaje no tiene presupuesto asignado");
    onClose();
    return;
  }


 

const vehiculo = data?.vehiculos?.[0];

const kmVehiculo =
  Number(vehiculo?.modelos?.[0]?.kilometraje || 0);

const kmRutas = (data?.rutas || []).reduce(
  (acc, r) => acc + Number(r.total || 0),
  0
);

const kmPartidaFinal = kmVehiculo;

  setFormData((prev) => ({
    ...prev,

    vehiculo:
      data.vehicleTravels?.[0]?.vehiculo?.id ||
      data.vehiculos?.[0]?.id ||
      "",

    chofer: data.choferes?.[0]?.id || "",
    encargado: data.encargados?.[0]?.id || "",

    fechaPartida: data.fecha_inicial || "",
    fechaLlegada: data.fecha_final || "",

    pasajeros: data.pasajeros || "",
    diasViaje: data.dias || "",

    kmsDesignados: kmRutas,

    
    kmPartida: kmPartidaFinal,

    asignacionCombustible:
      data.presupuestos?.[0]?.combustible1 || "",
  }));
}, [data]);

 const handleChange = (e) => {

  const { name, value } = e.target;

  
  if (name === "vehiculo") {

    const vehiculoSeleccionado =
      data?.vehiculos?.find(
        (v) => Number(v.id) === Number(value)
      );

    const kmVehiculo =
      Number(
        vehiculoSeleccionado?.modelos?.[0]?.kilometraje || 0
      );

    const kmPartidaFinal = kmVehiculo;

    setFormData((prev) => ({
      ...prev,
      vehiculo: value,
      kmPartida: kmPartidaFinal,
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalRecargue =
      toNumber(formData.recargue1) +
      toNumber(formData.recargue2) +
      toNumber(formData.recargue3);

    const totalCompra =
      toNumber(formData.compra1) +
      toNumber(formData.compra2) +
      toNumber(formData.compra3);

    const totalPeajesImprevistos =
      toNumber(formData.montope) +
      toNumber(formData.montoim);

    const totalDevoluciones =
      toNumber(formData.devolucionCombustible) +
      toNumber(formData.devolucionPeajes) +
      toNumber(formData.devolucionImprevistos);

    const payload = {
      viaje: data?.id,
      vehiculo: formData.vehiculo,
      chofer: formData.chofer,
      encargado: formData.encargado,
      entidad: data?.entidad,

      fechapartida: formData.fechaPartida,
      tiempopartida: formData.horaPartida,
      kilopartida: toNumber(formData.kmPartida),

      fechallegada: formData.fechaLlegada,
      tiempollegada: formData.horaLlegada,
      kilollegada: toNumber(formData.kmLlegada),

      kmtotal: toNumber(formData.kmsDesignados),

      viaticoa: toNumber(formData.viaticosCiudad),
      viaticob: toNumber(formData.viaticosProvincia),
      viaticoc: toNumber(formData.viaticosFrontera),

      pasajeros: toNumber(formData.pasajeros),
      dias: toNumber(formData.diasViaje),

      recargue1: toNumber(formData.recargue1),
      recargue2: toNumber(formData.recargue2),
      recargue3: toNumber(formData.recargue3),

      compra1: toNumber(formData.compra1),
      compra2: toNumber(formData.compra2),
      compra3: toNumber(formData.compra3),

      combustotalco: totalCompra,
      combustotalu: totalRecargue,

      descripe: formData.descripe || "",

      montope: toNumber(formData.montope),
      montoim: toNumber(formData.montoim),
      totalpeim: totalPeajesImprevistos,

      combus: toNumber(formData.devolucionCombustible),
      peaje: toNumber(formData.devolucionPeajes),
      impre: toNumber(formData.devolucionImprevistos),
      totalcopeim: totalDevoluciones,

      delegacion: formData.informeViaje,
      descripmante: formData.descripcionTecnica,
      recomendacion: formData.recomendaciones,

      piezas: selectedPiezas,
    };

    try {
        const res = await addTripReport(payload);

        if (res?.ok) {
          toast.success("✔ Informe registrado correctamente");
          onClose();
        } else {
          toast.error(res?.error || "❌ Error al registrar informe");
        }
      } catch (error) {
        console.error(error);
        toast.error("❌ Error inesperado al guardar el informe");
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">

        <div className="flex items-center justify-between border-b p-5 sticky top-0 bg-white z-10">
          <div>
            <h1 className="text-3xl font-bold text-green-700">
              Informe de Viaje
            </h1>

            <h2 className="text-gray-600">
              Informe de viaje de la entidad {data?.entidad}
            </h2>
          </div>

          <button onClick={onClose} className="absolute top-3 right-3 font-bold px-3 py-1">
          X
        </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">

            <SectionCard title="Datos del Viaje">
              <DatosViaje
                formData={formData}
                handleChange={handleChange}
                choferes={data?.choferes || []}
                encargados={data?.encargados || []}
                vehiculos={data?.vehiculos || []}
              />
            </SectionCard>

            <SectionCard title="Viaticos">
              <Viaticos
                formData={formData}
                handleChange={handleChange}
              />
            </SectionCard>

            <SectionCard title="Combustible">
              <Combustible
                formData={formData}
                handleChange={handleChange}
              />
            </SectionCard>

            <SectionCard title="Peajes e Imprevistos">
              <Peajes
                formData={formData}
                handleChange={handleChange}
              />
            </SectionCard>

            <SectionCard title="Devoluciones">
              <Devoluciones
                formData={formData}
                handleChange={handleChange}
              />
            </SectionCard>

            <SectionCard title="Informe del Viaje">
              <InformeViaje
                formData={formData}
                handleChange={handleChange}
              />
            </SectionCard>

            <SectionCard title="Informe Técnico">
              <InformeTecnico
                formData={formData}
                handleChange={handleChange}
                selectedPiezas={selectedPiezas}
                setSelectedPiezas={setSelectedPiezas}
              />
            </SectionCard>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold"
              >
                Guardar Informe
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}