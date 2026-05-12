import React, { useState, useEffect } from "react";

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
}){

  
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

    viaticosCiudad: "",
    viaticosProvincia: "",
    viaticosFrontera: "",

    pasajeros: "",
    kmsDesignados: "",
    diasViaje: "",

    asignacionCombustible: "",

    recargue1: "",
    compra1: "",
    recargue2: "",
    compra2: "",
    recargue3: "",
    compra3: "",

    peajes: "",
    imprevistos: "",

    devolucionCombustible: "",
    devolucionPeajes: "",
    devolucionImprevistos: "",

    informeViaje: "",

    descripcionTecnica: "",
    recomendaciones: "",
  });

const addTripReport = useTripReportStore((state) => state.addTripReport);

  const [selectedPiezas, setSelectedPiezas] = useState([]);
  useEffect(() => {
  if (!data) return;

  setFormData((prev) => ({
    ...prev,

    vehiculo: data.vehiculos?.[0]?.id || "",
    chofer: data.choferes?.[0]?.id || "",
    encargado: data.encargados?.[0]?.id || "",

    fechaPartida: data.fecha_inicial || "",
    fechaLlegada: data.fecha_final || "",

    pasajeros: data.pasajeros || "",
    diasViaje: data.dias || "",

    kmsDesignados:
      data.rutas?.reduce(
        (acc, r) => acc + Number(r.total || 0),
        0
      ) || "",

        asignacionCombustible:
      data.presupuestos?.[0]?.combustible1 || "",
  }));
}, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    viaje: data?.id,
    vehiculo: formData.vehiculo,
    chofer: formData.chofer,
    encargado: formData.encargado,
    entidad: data?.entidad,

    fechapartida: formData.fechaPartida,
    tiempopartida: formData.horaPartida,
    kilopartida: formData.kmPartida,

    fechallegada: formData.fechaLlegada,
    tiempollegada: formData.horaLlegada,
    kilollegada: formData.kmLlegada,

    kmtotal: formData.kmsDesignados,

    viaticoa: formData.viaticosCiudad,
    viaticob: formData.viaticosProvincia,
    viaticoc: formData.viaticosFrontera,

    pasajeros: formData.pasajeros,
    dias: formData.diasViaje,

    recargue1: formData.recargue1,
    compra1: formData.compra1,
    recargue2: formData.recargue2,
    compra2: formData.compra2,
    recargue3: formData.recargue3,
    compra3: formData.compra3,

    combustotalu: formData.asignacionCombustible,

    descripe: formData.informeViaje,
    descripmante: formData.descripcionTecnica,
    recomendacion: formData.recomendaciones,

    piezas: selectedPiezas,
  };

  const res = await addTripReport(payload);

  if (res.ok) {
    onClose();
  } else {
    console.error(res.error);
  }
};

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center  p-4  bg-black/40 backdrop-blur-sm">

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

        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
        >
          Cerrar
        </button>

      </div>

      {/* CONTENIDO */}
      <div className="p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <SectionCard title="Datos del Viaje">
          <DatosViaje
            formData={formData}
            handleChange={handleChange}
            choferes={choferes}
            encargados={encargados}
            vehiculos={vehiculos}
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
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl font-bold"
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