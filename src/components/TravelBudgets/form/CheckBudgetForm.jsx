import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CheckBudgetForm({ data, onClose,choferes, encargados, vehiculos }) {
  const [form, setForm] = useState({
    vehiculo: data?.vehiculo || "",
    chofer: data?.chofer || "",
    encargado: "",
    fecha: "",

    // 2da Casilla: Combustible y viaje
    litros: 0,
    precioLitro: 0,
    horaSalida: "",
    horaLlegada: "",
    materia: "",
    docentes: "",
    sigla: "",
    nota: "",

    // 3ra Casilla: Peajes, viáticos y mantenimiento
    peajes: [{ nro: 0, precio: 0 }],
    viaticosProvincia: [{ _v: 0, _p: 0 }],
    viaticosFrontera: [{ _v: 0, _p: 0 }],
    viaticosCiudad: [{ dias: 0, precio: 0 }],
    mantenimiento: [{ _v: 0, _p: 0 }],
    garaje: [{ _v: 0, _p: 0 }],

    // 4ta Casilla: Transporte público y flete
    transporte: [{ ruta: "", personas: 0, costo: 0 }],
    flete: [{ vueltas: 0, costo: 0 }],
  });

  const [errors, setErrors] = useState({});

  const [collapsed, setCollapsed] = useState({
    casilla1: true,
    casilla2: true,
    casilla3: true,
    casilla4: true,
  });

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleArrayChange = (field, index, key, value) => {
    const arr = [...form[field]];
    arr[index][key] = Number(value);
    setForm((prev) => ({ ...prev, [field]: arr }));
  };
  const isNumberField = (name) =>
  name?.includes("litros") ||
  name?.includes("precio") ||
  name?.includes("nro") ||
  name?.includes("dias") ||
  name?.includes("personas") ||
  name?.includes("costo") ||
  name?.includes("vueltas");

const validateField = (name, value) => {
  let error = "";

  if (value === "") {
    error = "Obligatorio";
  }

    if (isNumberField(name)) {
    const num = parseFloat(value);
      if (value === "" || value === null) {
        error = "Obligatorio";
      } else if (isNaN(num)) {
        error = "Debe ser número";
      } else if (num < 0) {
        error = "No negativo";
      }
    }

      if (name === "horaLlegada" && form.horaSalida && value) {
        if (value <= form.horaSalida) {
          error = "Debe ser mayor a salida";
        }
  }

  setErrors((prev) => {
  const copy = { ...prev };
  if (!error) delete copy[name];
  else copy[name] = error;
  return copy;
});
};


  const addArrayItem = (field, template) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], template] }));
  };

  // Casilla 2
  const combustible = (form.litros || 0) * (form.precioLitro || 0);
  const combustibleTotal = Math.round(form.litros);

  // Casilla 3
  const peajesTotal = form.peajes.reduce(
    (sum, p) => sum + (p.nro || 0) * (p.precio || 0),
    0
  );
  const viaticosCiudadTotal = form.viaticosCiudad.reduce(
    (sum, v) => sum + (v.dias || 0) * (v.precio || 0),
    0
  );
  const totalA = Number(combustible) + peajesTotal + viaticosCiudadTotal;

  // Casilla 4
  const transporteTotal = form.transporte.reduce(
    (sum, t) => sum + t.personas * t.costo,
    0
  );
  const fleteTotal = form.flete.reduce(
    (sum, f) => sum + f.vueltas * f.costo,
    0
  );
  const totalB = transporteTotal + fleteTotal;
  const diferencia = totalA - totalB;

  const formatBs = (value) => `${value.toFixed(2)} Bs.`;

  
 const handleDelete = () => {
  toast.info("🗑 Presupuesto eliminado");
  onClose();
};

  const validateAll = () => {
      let newErrors = {};

      for (const key in form) {
        const value = form[key];

        if (Array.isArray(value)) {
          value.forEach((item, i) => {
            for (const subKey in item) {
              const v = item[subKey];

              if (v === "") {
                newErrors[`${key}_${i}_${subKey}`] = "Obligatorio";
              } else if (!isNaN(v) && Number(v) < 0) {
                newErrors[`${key}_${i}_${subKey}`] = "No negativo";
              }
            }
          });
        } else {
          if (value === "") {
            newErrors[key] = "Obligatorio";
          } else if (!isNaN(value) && Number(value) < 0) {
            newErrors[key] = "No negativo";
          }
        }
      }

      if (form.horaSalida && form.horaLlegada) {
        if (form.horaLlegada <= form.horaSalida) {
          newErrors.horaLlegada = "Debe ser mayor a salida";
        }
      }

      if (!form.vehiculo) newErrors.vehiculo = "Seleccione vehículo";
      if (!form.chofer) newErrors.chofer = "Seleccione chofer";
      if (!form.encargado) newErrors.encargado = "Seleccione encargado";
      if (!form.fecha) newErrors.fecha = "Fecha obligatoria";

      const isValid = Object.keys(newErrors).length === 0;
      setErrors(newErrors);
      return isValid;
  };

  const handleUpdate = () => {
    const isValid = validateAll();

    if (!isValid) {
      toast.error("⚠️ Complete correctamente todos los campos");
      return;
    }

    toast.success("Presupuesto actualizado correctamente");

    data?.onUpdate?.(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[1200px] p-6 rounded-xl shadow-lg space-y-6 relative dark:bg-gray-800">

        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray dark:text-gray-200 font-bold bg-white-600 px-3 py-1 rounded hover:bg-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold dark:text-gray-200">
          Presupuesto del viaje de ({data?.entidad || "Entidad"})
        </h2>

        
        <Section
          title="1️⃣ Datos generales"
          collapsed={collapsed.casilla1}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla1: !prev.casilla1 }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            <select
              className="border p-2 rounded dark:bg-gray-200/40 dark:border-gray-200"
              value={form.vehiculo}
              onChange={(e) => handleChange("vehiculo", e.target.value)}
            >
              <option value="">Seleccione vehículo</option>
              {vehiculos?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.placa}
                </option>
              ))}
            </select>
            {errors.vehiculo && <p className="text-red-500 text-xs">{errors.vehiculo}</p>}
          <select
            className="border p-2 rounded dark:bg-gray-200/40 dark:border-gray-200"
            value={form.chofer}
            onChange={(e) => handleChange("chofer", e.target.value)}
            >
            <option value="">Seleccione chofer</option>
            {choferes?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombres} {c.apellidos}
              </option>
            ))}
           </select>
           {errors.chofer && <p className="text-red-500 text-xs">{errors.chofer}</p>}
            <select
              className="border p-2 rounded dark:bg-gray-200/40 dark:border-gray-200 "
              value={form.encargado}
              onChange={(e) => handleChange("encargado", e.target.value)}
            >
              <option value="">Seleccione encargado</option>
              {encargados?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombres} {e.apellidos}
                </option>
              ))}
            </select>
            {errors.encargado && <p className="text-red-500 text-xs">{errors.encargado}</p>}
            <Input
              label="Fecha de solicitud"
              type="date"
              value={form.fecha}
              onChange={(v) => handleChange("fecha", v)}
            />
          </div>
        </Section>

        {/* 2da Casilla */}
        <Section
          title="2️⃣ Combustible y viaje"
          collapsed={collapsed.casilla2}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla2: !prev.casilla2 }))
          }
        >
          <div className="grid grid-cols-3 gap-4 mt-2">
            <Input
              name="litros"
              label="Gasolina/Diesel (L)"
              type="number"
              value={form.litros}
              onChange={(v) => handleChange("litros", Number(v))}
              onBlur={validateField}
               error={errors.litros}
            />
            <Input label="Combustible (Bs.)" value={combustible} readOnly />
            <Input label="Combustible Total (L)" value={combustibleTotal} />
            <Input
              name="precioLitro"
              label="Precio (L.) Bs"
              type="number"
              value={form.precioLitro}
              onChange={(v) => handleChange("precioLitro", Number(v))}
            />
            <Input label="Costo Total" value={combustible} readOnly />
            <Input
             name="horaSalida"
              label="Hora de salida"
              type="time"
              value={form.horaSalida}
              onChange={(v) => handleChange("horaSalida", v)}
            />
            <Input
              name="horaLlegada"
              label="Hora de llegada"
              type="time"
              value={form.horaLlegada}
              onChange={(v) => handleChange("horaLlegada", v)}
            />
            <Input
            name="materia"
              label="Materia"
              value={form.materia}
              onChange={(v) => handleChange("materia", v)}
            />
            <Input
            name="docentes"
              label="Docentes"
              value={form.docentes}
              onChange={(v) => handleChange("docentes", v)}
            />
            <Input
            name="sigla"
              label="Sigla"
              value={form.sigla}
              onChange={(v) => handleChange("sigla", v)}
            />
            <Input
            name="nota"
              label="Nota"
              value={form.nota}
              onChange={(v) => handleChange("nota", v)}
              colSpan={3}
            />
          </div>
        </Section>

        {/* 3ra Casilla */}
        <Section
          title="3️⃣ Peajes y viáticos"
          collapsed={collapsed.casilla3}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla3: !prev.casilla3 }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2 dark:text-gray-300">
            <ArrayInput
              title="Peajes ida y vuelta"
              array={form.peajes}
              onChange={(i, k, v) => handleArrayChange("peajes", i, k, v)}
              total={formatBs(peajesTotal)}
              onBlur={validateField}
errors={errors}
            />
            <ArrayInput
              title="Viáticos provincia"
              array={form.viaticosProvincia}
              onChange={(i, k, v) => handleArrayChange("viaticosProvincia", i, k, v)}
              total={formatBs(0)}
              onBlur={validateField}
errors={errors}
            />
            <ArrayInput
              title="Viáticos frontera"
              array={form.viaticosFrontera}
              onChange={(i, k, v) => handleArrayChange("viaticosFrontera", i, k, v)}
              total={formatBs(0)}
              onBlur={validateField}
errors={errors}
            />
            <ArrayInput
              title="Viáticos ciudad"
              array={form.viaticosCiudad}
              onChange={(i, k, v) => handleArrayChange("viaticosCiudad", i, k, v)}
              total={formatBs(viaticosCiudadTotal)}
              onBlur={validateField}
errors={errors}
            />
            <ArrayInput
              title="Mantenimiento vehicular"
              array={form.mantenimiento}
              onChange={(i, k, v) => handleArrayChange("mantenimiento", i, k, v)}
              total={formatBs(0)}
              onBlur={validateField}
errors={errors}
            />
            <ArrayInput
              title="Garaje del vehículo"
              array={form.garaje}
              onChange={(i, k, v) => handleArrayChange("garaje", i, k, v)}
              total={formatBs(0)}
              onBlur={validateField}
errors={errors}
            />

            <div className="col-span-2">
              <label className="font-semibold dark:text-gray-300">Total (A)</label>
              <input
                readOnly
                value={formatBs(totalA)}
                className="border p-2 rounded w-full text-right bg-yellow-100"
              />
            </div>
          </div>
        </Section>

        {/* 4ta Casilla */}
        <Section
          title="4️⃣ Transporte público y flete"
          collapsed={collapsed.casilla4}
          toggle={() =>
            setCollapsed((prev) => ({ ...prev, casilla4: !prev.casilla4 }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2">
            {form.transporte.map((t, i) => (
              <div key={i} className="border p-2 rounded space-y-2 relative dark:text-gray-200">
                <button
                  onClick={() => {
                    const arr = [...form.transporte];
                    arr.splice(i, 1);
                    setForm((prev) => ({ ...prev, transporte: arr }));
                  }}
                  className="absolute top-1 right-1 text-red-600 font-bold px-2 py-0.5 rounded hover:bg-red-100"
                >
                  X
                </button>
                <Input
                  label="Ruta"
                  value={t.ruta}
                  onChange={(v) => {
                    const arr = [...form.transporte];
                    arr[i].ruta = v;
                    setForm((prev) => ({ ...prev, transporte: arr }));
                  }}
              
                />
                <Input
                  label="Personas"
                  type="number"
                  value={t.personas}
                  onChange={(v) => {
                    const arr = [...form.transporte];
                    arr[i].personas = Number(v);
                    setForm((prev) => ({ ...prev, transporte: arr }));
                  }}
                
                />
                <Input
                  label="Costo"
                  type="number"
                  value={t.costo}
                  onChange={(v) => {
                    const arr = [...form.transporte];
                    arr[i].costo = Number(v);
                    setForm((prev) => ({ ...prev, transporte: arr }));
                  }}
               
                />
                <Input label="Total" type="text" readOnly value={formatBs(t.personas * t.costo)} />
              </div>
            ))}

            <button
              onClick={() => addArrayItem("transporte", { ruta: "", personas: 0, costo: 0 })}
              className="px-2 py-1 text-green-600 font-bold rounded border hover:bg-green-50 w-10 h-10 flex justify-center items-center"
              title="Agregar ruta"
            >
              +
            </button>

            <div className="mt-4 col-span-2 dark:text-gray-300">
              <h4 className="font-semibold">Uso del flete por el camión</h4>
              {form.flete.map((f, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <Input
                    label="Vueltas"
                    type="number"
                    value={f.vueltas}
                    onChange={(v) => {
                      const arr = [...form.flete];
                      arr[i].vueltas = Number(v);
                      setForm((prev) => ({ ...prev, flete: arr }));
                    }}
                    onBlur={validateField}
                    errors={errors}
                  />
                  <Input
                    label="Costo"
                    type="number"
                    value={f.costo}
                    onChange={(v) => {
                      const arr = [...form.flete];
                      arr[i].costo = Number(v);
                      setForm((prev) => ({ ...prev, flete: arr }));
                    }}
                    onBlur={validateField}
                    errors={errors}
                  />
                  <Input label="Total" type="text" readOnly value={formatBs(f.vueltas * f.costo)} />
                </div>
              ))}
            </div>

            <div className="col-span-2 mt-2 dark:text-gray-300">
              <label className="font-semibold">Total (B)</label>
              <input
                readOnly
                value={formatBs(totalB)}
                className="border p-2 rounded w-full text-right bg-yellow-100 "
              />
            </div>

            <div className="col-span-2 mt-2 dark:text-gray-300">
              <label className="font-semibold">Diferencia (A - B)</label>
              <input
                readOnly
                value={formatBs(diferencia)}
                className="border p-2 rounded w-full text-right bg-yellow-100"
              />
            </div>
          </div>
        </Section>

        {/* Botones acción */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              if (confirm("¿Seguro que deseas eliminar este presupuesto?")) {
                handleDelete();
              }
            }}
            className="px-4 py-2  rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
          <button
            onClick={() => handleUpdate()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}


const Section = ({ title, children, collapsed, toggle }) => (
  <div className="border rounded p-4">
    <div className="flex justify-between items-center cursor-pointer dark:text-gray-300" onClick={toggle}>
      <h3 className="font-semibold text-lg ">{title}</h3>
      <span>{collapsed ? "+" : "-"}</span>
    </div>
    {!collapsed && <div className="mt-2">{children}</div>}
  </div>
);

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  readOnly,
  colSpan = 1,
}) => {
  const spanClass =
    colSpan === 2 ? "col-span-2" :
    colSpan === 3 ? "col-span-3" :
    colSpan === 4 ? "col-span-4" :
    "col-span-1";

  return (
    <div className={spanClass}>
      <label className="block text-sm font-medium dark:text-gray-300">
        {label}
      </label>

      <input
      
       
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur?.(name, e.target.value)}   
        readOnly={readOnly}
        className={`border p-2 rounded w-full dark:bg-gray-200/40 dark:border-gray-200 
          ${readOnly ? "bg-gray-100" : ""} 
          ${error ? "border-red-500" : ""} 
          text-right`}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

const ArrayInput = ({ title, array, onChange, total,onBlur, errors={}  }) => (
  <div className="border p-2 rounded space-y-2">
    <h4 className="font-semibold">{title}</h4>
    {array.map((item, i) => (
      <div  key={`${title}-${i}`} className="flex gap-2">
        {Object.keys(item).map((key) => {
          let label = "";
          if (title.includes("Peajes")) {
            if (key === "nro") label = "Nro. Peajes";
            if (key === "precio") label = "Precio (c/u)";
          }
          if (title.includes("ciudad")) {
            if (key === "dias") label = "Nro. de Días";
            if (key === "precio") label = "Precio por Día";
          }
          return (
           <Input
           key={`${i}-${key}`} 
            name={`${title}_${i}_${key}`}
            label={label}
            type="number"
            value={item[key] || 0}
            onChange={(v) => onChange(i, key, v)}
            onBlur={(name, value) => onBlur?.(name, value)}  // 👈 FIX
            error={errors?.[`${title}_${i}_${key}`]}
          />
          );
        })}
      </div>
    ))}
    <div>
      <label className="font-semibold">Total</label>
      <input
        readOnly
        value={total}
        className="border p-2 rounded w-full text-right bg-yellow-100"
      />
    </div>
  </div>
);