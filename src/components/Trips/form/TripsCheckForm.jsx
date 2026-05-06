import React, { useState } from "react";
import { toast } from "react-toastify";

import DatosForm from "./SeccTripsCheck/DatosForm";
import Combustible from "./SeccTripsCheck/Combustible";
import Peajes from "./SeccTripsCheck/Peajes";
import Transport from "./SeccTripsCheck/Transport";
import { useTravelBudgetsStore } from "../../../zustand/useTravelBudgetsStore";

export default function CheckTripForm({
  data,
  onClose,
  choferes,
  encargados,
  vehiculos,
  destinos,
}) {

const km_total =
  (data?.destinos || []).reduce((sum, d) => {
    const destinoCompleto = destinos?.find(x => x.id === d.id);
    return sum + Number(destinoCompleto?.distancia || 0);
  }, 0) + Number(data?.kmAdicional || 0);

  const { addBudget } = useTravelBudgetsStore();

  const [form, setForm] = useState(() => ({
    vehiculo: data?.vehiculo || "",
    chofer: data?.chofer || "",
    encargado: "",
    fecha: "",

    
    division1: "",
    combustibleTotal: "",
    precioLitro: "",

    horaSalida: "",
    horaLlegada: "",

    materia: "",
    docentes: "",
    sigla: "",
    nota: "",

    peajes: [{ nro: "", precio: "" }],
    viaticosCiudad: [{ dias: "", precio: "" }],
    viaticosProvincia: [{ _v: "", _p: "" }],
    viaticosFrontera: [{ _v: "", _p: "" }],
    mantenimiento: [{ _v: "", _p: "" }],
    garaje: [{ _v: "", _p: "" }],

    transporte: [{ ruta: "", personas: "", costo: "" }],
    flete: [{ vueltas: "", costo: "" }],
  }));

  const [errors] = useState({});
  const [collapsed, setCollapsed] = useState({
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

  const handleArrayChange = (field, index, key, value) => {
    const arr = [...form[field]];
    arr[index][key] = value;

    setForm((prev) => ({
      ...prev,
      [field]: arr,
    }));
  };

  const addArrayItem = (field, template) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  
 

const baseCombustible = 1160;

// inputs
const division1 = parseFloat(form.division1) || 0; 
const combustibleTotal = parseFloat(form.combustibleTotal) || 0; 
const precioLitro = parseFloat(form.precioLitro) || 0;

const combustible1 =
  division1 > 0 ? baseCombustible / division1 : 0;


const costoTotal =
  combustibleTotal > 0 && precioLitro > 0
    ? combustibleTotal * precioLitro
    : 0;

  

  const peajesTotal = form.peajes.reduce(
    (sum, p) => sum + Number(p.nro || 0) * Number(p.precio || 0),
    0
  );

  const viaticosCiudadTotal = form.viaticosCiudad.reduce(
    (sum, v) => sum + Number(v.dias || 0) * Number(v.precio || 0),
    0
  );

  const viaticosProvinciaTotal = form.viaticosProvincia.reduce(
    (sum, v) => sum + Number(v._v || 0) * Number(v._p || 0),
    0
  );

  const viaticosFronteraTotal = form.viaticosFrontera.reduce(
    (sum, v) => sum + Number(v._v || 0) * Number(v._p || 0),
    0
  );

  const mantenimientoTotal = form.mantenimiento.reduce(
    (sum, m) => sum + Number(m._v || 0) * Number(m._p || 0),
    0
  );

  const garajeTotal = form.garaje.reduce(
    (sum, g) => sum + Number(g._v || 0) * Number(g._p || 0),
    0
  );

  const transporteTotal = form.transporte.reduce(
    (sum, t) => sum + Number(t.personas || 0) * Number(t.costo || 0),
    0
  );

  const fleteTotal = form.flete.reduce(
    (sum, f) => sum + Number(f.vueltas || 0) * Number(f.costo || 0),
    0
  );

  
  let totalA =
 
    peajesTotal +
    viaticosCiudadTotal +
    viaticosProvinciaTotal +
    viaticosFronteraTotal +
    mantenimientoTotal +
    garajeTotal;

    totalA = totalA + costoTotal; 
  const totalB = transporteTotal + fleteTotal;

  const diferencia = totalA - totalB;

  
  const buildPayload = () => ({
    vehiculo: form.vehiculo,
    chofer: form.chofer,
    encargado: form.encargado,
    entidad: data?.entidad || "",
    fecha_sa: form.fecha,


    total1: String(baseCombustible),
      division1: String(division1),
      combustible1: String(combustible1),
      cantidad1: String(combustibleTotal),
      precio1: String(precioLitro),
      total1C: String(costoTotal),

    // VIATICOS
    cantidad2: String(form.viaticosCiudad[0]?.dias || 0),
    precio2: String(form.viaticosCiudad[0]?.precio || 0),
    total2VC: String(viaticosCiudadTotal),

    cantidad3: String(form.viaticosProvincia[0]?._v || 0),
    precio3: String(form.viaticosProvincia[0]?._p || 0),
    total3VP: String(viaticosProvinciaTotal),

    cantidad4: String(form.viaticosFrontera[0]?._v || 0),
    precio4: String(form.viaticosFrontera[0]?._p || 0),
    total4VF: String(viaticosFronteraTotal),

    // PEAJES
    cantidad5: String(form.peajes[0]?.nro || 0),
    precio5: String(form.peajes[0]?.precio || 0),
    total5P: String(peajesTotal),

    // MANTENIMIENTO
    cantidad6: String(form.mantenimiento[0]?._v || 0),
    precio6: String(form.mantenimiento[0]?._p || 0),
    total6M: String(mantenimientoTotal),

    // GARAJE
    cantidad7: String(form.garaje[0]?._v || 0),
    precio7: String(form.garaje[0]?._p || 0),
    total7G: String(garajeTotal),

    total8T: String(totalA),

    materia: form.materia,
    sigla: form.sigla,
    ndocentes: form.docentes,
    hsalida: form.horaSalida,
    hllegada: form.horaLlegada,
    nota: form.nota,
    responsable: form.encargado,

    // TRANSPORTE
    p1: String(form.transporte[0]?.personas || 0),
    r1: form.transporte[0]?.ruta || "",
    c1: String(form.transporte[0]?.costo || 0),
    t1: String(
      (form.transporte[0]?.personas || 0) *
      (form.transporte[0]?.costo || 0)
    ),

    p2: String(form.transporte[1]?.personas || 0),
    r2: form.transporte[1]?.ruta || "",
    c2: String(form.transporte[1]?.costo || 0),
    t2: String(
      (form.transporte[1]?.personas || 0) *
      (form.transporte[1]?.costo || 0)
    ),

    
    p3: String(form.flete[0]?.vueltas || 0),
    c3: String(form.flete[0]?.costo || 0),
    t3: String(fleteTotal),

    tt: String(totalA),
    diferencia: String(diferencia),

    viaje: { id: data?.id },
  });

  const handleUpdate = async () => {
    const res = await addBudget(buildPayload());

    if (res.ok) {
      toast.success("Presupuesto guardado correctamente");
      onClose();
    } else {
      toast.error("Error al guardar presupuesto");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-10 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 w-[95%] md:w-[80%] p-6 rounded-xl space-y-6 relative">

        <button onClick={onClose} className="absolute top-3 right-3 font-bold px-3 py-1">
          X
        </button>

        <h2 className="text-2xl font-bold text-center dark:text-gray-200">
          Presupuesto - {data?.entidad} ({km_total} km)
        </h2>

        <DatosForm
          form={form}
          errors={errors}
          handleChange={handleChange}
          handleBlur={() => {}}
          vehiculos={vehiculos}
          choferes={choferes}
          encargados={encargados}
          collapsed={collapsed.casilla1}
          toggle={() => setCollapsed((p) => ({ ...p, casilla1: !p.casilla1 }))}
        />

        <Combustible
          form={form}
          errors={errors}
          handleChange={handleChange}
          handleBlur={() => {}}
          combustible={combustible1}
          combustibleTotal={combustibleTotal}
          costoTotal={costoTotal}
          collapsed={collapsed.casilla2}
          toggle={() => setCollapsed((p) => ({ ...p, casilla2: !p.casilla2 }))}
        />

        <Peajes
          form={form}
          handleArrayChange={handleArrayChange}
          peajesTotal={peajesTotal}
          viaticosCiudadTotal={viaticosCiudadTotal}
          viaticosProvinciaTotal={viaticosProvinciaTotal}
          viaticosFronteraTotal={viaticosFronteraTotal}
          mantenimientoTotal={mantenimientoTotal}
          garajeTotal={garajeTotal}
          totalA={totalA}
          formatBs={(n) => `${Number(n || 0).toFixed(2)} Bs`}
          collapsed={collapsed.casilla3}
          toggle={() => setCollapsed((p) => ({ ...p, casilla3: !p.casilla3 }))}
        />

        <Transport
          form={form}
          setForm={setForm}
          addArrayItem={addArrayItem}
          transporteTotal={transporteTotal}
          fleteTotal={fleteTotal}
          totalB={totalB}
          diferencia={diferencia}
          formatBs={(n) => `${Number(n || 0).toFixed(2)} Bs`}
          collapsed={collapsed.casilla4}
          toggle={() => setCollapsed((p) => ({ ...p, casilla4: !p.casilla4 }))}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded">
            Cancelar
          </button>

          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}