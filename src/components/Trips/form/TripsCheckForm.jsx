import React, { useState } from "react";
import { toast } from "react-toastify";

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

    transporte: [{ ruta: "", personas: "", costo: "" }],
    flete: [{ vueltas: "", costo: "" }],
  });

  const [errors, setErrors] = useState({});

  
  const optionalFields = [
    "materia",
    "docentes",
    "sigla",
    "nota",
    "viaticosFrontera",
    "viaticosCiudad",
    "mantenimiento",
    "garaje",
  ];

const validateField = (name, value) => {
  // CAMPOS OPCIONALES
  if (optionalFields.includes(name)) return "";
  // OBLIGATORIOS
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return "Este campo es obligatorio";
  }
  // VALIDAR SOLO LETRAS
  if (
    ["chofer", "encargado", "docentes"].includes(name)
  ) {
    const onlyLetters =
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    if (!onlyLetters.test(value)) {
      return "Solo se permiten letras";
    }
  }
  // VALIDAR SIGLA
  if (name === "sigla") {
    const siglaRegex = /^[A-Za-z0-9-]+$/;

    if (!siglaRegex.test(value)) {
      return "Sigla inválida";
    }
  }
  // VALIDAR NUMEROS POSITIVOS
  if (
    [
      "litros",
      "precioLitro",
    ].includes(name)
  ) {
    if (Number(value) <= 0) {
      return "Debe ser mayor a 0";
    }
  }
  // VALIDAR FECHA
  if (name === "fecha") {
    const hoy = new Date()
      .toISOString()
      .split("T")[0];

    if (value < hoy) {
      return "La fecha no puede ser anterior a hoy";
    }
  }
  // VALIDAR HORAS
  if (
    name === "horaSalida" &&
    form.horaLlegada
  ) {
    if (value >= form.horaLlegada) {
      return "La hora salida debe ser menor";
    }
  }

  if (
    name === "horaLlegada" &&
    form.horaSalida
  ) {
    if (value <= form.horaSalida) {
      return "La hora llegada debe ser mayor";
    }
  }
  // VALIDAR NOTA
  if (name === "nota") {
    if (value.length > 300) {
      return "Máximo 300 caracteres";
    }
  }

  return "";
};

  const [collapsed, setCollapsed] = useState({
    casilla1: true,
    casilla2: true,
    casilla3: true,
    casilla4: true,
  });

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

  
  const handleBlur = (field, value) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };



  const addArrayItem = (field, template) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  
  const combustible = (
    Number(form.litros || 0) *
    Number(form.precioLitro || 0)
  ).toFixed(2);

  const combustibleTotal = Math.round(
    Number(form.litros || 0)
  );

  const peajesTotal = form.peajes.reduce(
    (sum, p) =>
      sum +
      Number(p.nro || 0) * Number(p.precio || 0),
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

  const transporteTotal = form.transporte.reduce(
    (sum, t) =>
      sum +
      Number(t.personas || 0) *
        Number(t.costo || 0),
    0
  );

  const fleteTotal = form.flete.reduce(
    (sum, f) =>
      sum +
      Number(f.vueltas || 0) *
        Number(f.costo || 0),
    0
  );

  const totalB = transporteTotal + fleteTotal;

  const diferencia = totalA - totalB;

  const formatBs = (value) =>
    `${Number(value).toFixed(2)} Bs.`;

const handleUpdate = () => {
  const newErrors = {};

  // VALIDAR CAMPOS PRINCIPALES
  Object.keys(form).forEach((field) => {
    const error = validateField(
      field,
      form[field]
    );

    if (error) {
      newErrors[field] = error;
    }
  });

  // VALIDAR PEAJES
  form.peajes.forEach((p, i) => {
    if (!p.nro || Number(p.nro) <= 0) {
      newErrors[`peajes_nro_${i}`] =
        "Ingrese cantidad válida";
    }

    if (
      !p.precio ||
      Number(p.precio) <= 0
    ) {
      newErrors[`peajes_precio_${i}`] =
        "Ingrese precio válido";
    }
  });

  // VALIDAR VIATICOS CIUDAD
  form.viaticosCiudad.forEach((v, i) => {
    if (
      v.dias &&
      Number(v.dias) < 0
    ) {
      newErrors[`dias_${i}`] =
        "Cantidad inválida";
    }

    if (
      v.precio &&
      Number(v.precio) < 0
    ) {
      newErrors[`precio_${i}`] =
        "Precio inválido";
    }
  });
  form.transporte.forEach((t, i) => {
    if (!t.ruta) {
      newErrors[`ruta_${i}`] =
        "Ruta obligatoria";
    }

    if (
      !t.personas ||
      Number(t.personas) <= 0
    ) {
      newErrors[`personas_${i}`] =
        "Cantidad inválida";
    }

    if (
      !t.costo ||
      Number(t.costo) <= 0
    ) {
      newErrors[`costo_${i}`] =
        "Costo inválido";
    }
  });
  form.flete.forEach((f, i) => {
    if (
      !f.vueltas ||
      Number(f.vueltas) <= 0
    ) {
      newErrors[`vueltas_${i}`] =
        "Vueltas inválidas";
    }

    if (
      !f.costo ||
      Number(f.costo) <= 0
    ) {
      newErrors[`flete_costo_${i}`] =
        "Costo inválido";
    }
  });

  setErrors(newErrors);
  if (
    Object.keys(newErrors).length > 0
  ) {
    toast.error(
      "Complete correctamente los campos obligatorios"
    );

    return;
  }

  if (diferencia < 0) {
    toast.error(
      "La diferencia no puede ser negativa"
    );

    return;
  }
  toast.success(
    "Registro realizado correctamente"
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
        "¿Seguro que deseas eliminar este presupuesto?"
      )
    ) {
      onClose();
    }
  };

  
  const ComboInput = ({
    label,
    value,
    onChange,
    onBlur,
    options,
    error,
   }) => {
    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState(
      value || ""
    );

    const getLabel = (opt) =>
      opt?.nombres
        ? `${opt.nombres} ${opt.apellidos}`
        : opt?.tipog
        ? `${opt.tipog} ${opt.placa}`
        : "";

    const filtered =
      options?.filter((opt) =>
        getLabel(opt)
          .toLowerCase()
          .includes(search.toLowerCase())
      ) || [];

    return (
      <div className="relative">
        <label className="block mb-1 text-sm font-semibold">
          {label}
        </label>

       

        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error}
          </p>
        )}

        {open && (
          <div className="absolute z-50 w-full bg-white border rounded shadow max-h-40 overflow-auto">
            {filtered.length > 0 ? (
              filtered.map((opt, i) => (
                <div
                  key={i}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => {
                    const val = getLabel(opt);

                    setSearch(val);
                    onChange(val);
                    setOpen(false);
                  }}
                >
                  {getLabel(opt)}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-400">
                Sin resultados
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-10 z-50 overflow-y-auto  bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[1200px] p-6 rounded-xl shadow-lg space-y-6 relative dark:bg-gray-800">

      
        <button
          onClick={onClose}
          className="absolute top-3 right-3 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center dark:text-gray-200">
          Presupuesto del viaje
        </h2>

        <Section
          title="1️⃣ Datos generales"
          collapsed={collapsed.casilla1}
          toggle={() =>
            setCollapsed((prev) => ({
              ...prev,
              casilla1: !prev.casilla1,
            }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2">

           {/* VEHÍCULO */}
<div>
  <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
    Vehículo :
  </label>

  <select
    value={form.vehiculo}
    onChange={(e) =>
      handleChange("vehiculo", e.target.value)
    }
    onBlur={(e) =>
      handleBlur("vehiculo", e.target.value)
    }
    className={`w-full border px-3 py-2 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200${
      errors.vehiculo ? "border-red-500" : ""
    }`}
  >
    <option value="">
      Seleccione un vehículo
    </option>

    {vehiculos?.map((v, i) => (
      <option
        key={i}
        value={`${v.tipog} ${v.placa}`}
      >
        {v.tipog} - {v.placa}
      </option>
    ))}
  </select>

  {errors.vehiculo && (
    <p className="text-red-500 text-sm mt-1">
      {errors.vehiculo}
    </p>
  )}
</div>

{/* CHOFER */}
<div>
  <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
    Chofer *
  </label>

  <select
    value={form.chofer}
    onChange={(e) =>
      handleChange("chofer", e.target.value)
    }
    onBlur={(e) =>
      handleBlur("chofer", e.target.value)
    }
    className={`w-full border px-3 py-2 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 ${
      errors.chofer ? "border-red-500" : ""
    }`}
  >
    <option value="">
      Seleccione un chofer
    </option>

    {choferes?.map((c, i) => (
      <option
        key={i}
        value={`${c.nombres} ${c.apellidos}`}
      >
        {c.nombres} {c.apellidos}
      </option>
    ))}
  </select>

  {errors.chofer && (
    <p className="text-red-500 text-sm mt-1">
      {errors.chofer}
    </p>
  )}
</div>

{/* ENCARGADO */}
<div>
  <label className="block mb-1 text-sm font-semibold dark:text-gray-300">
    Encargado:
  </label>

  <select
    value={form.encargado}
    onChange={(e) =>
      handleChange("encargado", e.target.value)
    }
    onBlur={(e) =>
      handleBlur("encargado", e.target.value)
    }
    className={`w-full border px-3 py-2 rounded text-sm  dark:bg-gray-200/40 dark:border-gray-200${
      errors.encargado ? "border-red-500" : ""
    }`}
  >
    <option value="">
      Seleccione un encargado
    </option>

    {encargados?.map((e, i) => (
      <option
        key={i}
        value={`${e.nombres} ${e.apellidos}`}
      >
        {e.nombres} {e.apellidos}
      </option>
    ))}
  </select>

  {errors.encargado && (
    <p className="text-red-500 text-sm mt-1">
      {errors.encargado}
    </p>
  )}
          </div>
            <Input
              label="Fecha *"
              type="date"
              value={form.fecha}
              onChange={(v) =>
                handleChange("fecha", v)
              }
              onBlur={(v) =>
                handleBlur("fecha", v)
              }
              error={errors.fecha}
              
            />
          </div>
        </Section>

        
        {/* 2COMBUSTIBLE */}
       

        <Section
          title="2️⃣ Combustible y viaje"
          collapsed={collapsed.casilla2}
          toggle={() =>
            setCollapsed((prev) => ({
              ...prev,
              casilla2: !prev.casilla2,
            }))
          }
          >
          <div className="grid grid-cols-3 gap-4 mt-2 dark:text-gray-300">

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

            <Input
              label="Precio por litro *"
              type="number"
              value={form.precioLitro}
              onChange={(v) =>
                handleChange("precioLitro", v)
              }
              onBlur={(v) =>
                handleBlur(
                  "precioLitro",
                  v
                )
              }
              error={errors.precioLitro}
            />

            <Input
              label="Combustible (Bs)"
              value={combustible}
              readOnly
            />

            <Input
              label="Combustible total"
              value={combustibleTotal}
              readOnly
            />

            <Input
              label="Hora salida *"
              type="time"
              value={form.horaSalida}
              onChange={(v) =>
                handleChange("horaSalida", v)
              }
              onBlur={(v) =>
                handleBlur("horaSalida", v)
              }
              error={errors.horaSalida}
            />

            <Input
              label="Hora llegada *"
              type="time"
              value={form.horaLlegada}
              onChange={(v) =>
                handleChange("horaLlegada", v)
              }
              onBlur={(v) =>
                handleBlur("horaLlegada", v)
              }
              error={errors.horaLlegada}
            />

            {/* OPCIONALES */}

            <Input
              label="Materia"
              value={form.materia}
              onChange={(v) =>
                handleChange("materia", v)
              }
            />

            <Input
              label="Docentes"
              value={form.docentes}
              onChange={(v) =>
                handleChange("docentes", v)
              }
            />

            <Input
              label="Sigla"
              value={form.sigla}
              onChange={(v) =>
                handleChange("sigla", v)
              }
            />

            <Input
              label="Nota"
              value={form.nota}
              onChange={(v) =>
                handleChange("nota", v)
              }
              colSpan={3}
            />
          </div>
        </Section>

       
        {/* PEAJES */}
        
        <Section
          title="3️⃣ Peajes y viáticos"
          collapsed={collapsed.casilla3}
          toggle={() =>
            setCollapsed((prev) => ({
              ...prev,
              casilla3: !prev.casilla3,
            }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2 dark:text-gray-300">

            <ArrayInput
              title="Peajes ida y vuelta"
              array={form.peajes}
              onChange={(i, k, v) =>
                handleArrayChange(
                  "peajes",
                  i,
                  k,
                  v
                )
              }
              total={formatBs(peajesTotal)}
            />

            <ArrayInput
              title="Viáticos provincia"
              array={form.viaticosProvincia}
              onChange={(i, k, v) =>
                handleArrayChange(
                  "viaticosProvincia",
                  i,
                  k,
                  v
                )
              }
              total={formatBs(0)}
            />

            {/* OPCIONALES */}

            <ArrayInput
              title="Viáticos frontera"
              array={form.viaticosFrontera}
              onChange={(i, k, v) =>
                handleArrayChange(
                  "viaticosFrontera",
                  i,
                  k,
                  v
                )
              }
              total={formatBs(0)}
            />

            <ArrayInput
              title="Viáticos ciudad"
              array={form.viaticosCiudad}
              onChange={(i, k, v) =>
                handleArrayChange(
                  "viaticosCiudad",
                  i,
                  k,
                  v
                )
              }
              total={formatBs(
                viaticosCiudadTotal
              )}
            />

            <ArrayInput
              title="Mantenimiento vehicular"
              array={form.mantenimiento}
              onChange={(i, k, v) =>
                handleArrayChange(
                  "mantenimiento",
                  i,
                  k,
                  v
                )
              }
              total={formatBs(0)}
            />

            <ArrayInput
              title="Garaje vehicular"
              array={form.garaje}
              onChange={(i, k, v) =>
                handleArrayChange(
                  "garaje",
                  i,
                  k,
                  v
                )
              }
              total={formatBs(0)}
            />

            <div className="col-span-2">
              <label className="font-semibold">
                Total (A)
              </label>

              <input
                readOnly
                value={formatBs(totalA)}
                className="border p-2 rounded w-full text-right bg-yellow-100"
              />
            </div>
          </div>
        </Section>

       
        {/* TRANSPORTE */}
      

        <Section
          title="4️⃣ Transporte y flete"
          collapsed={collapsed.casilla4}
          toggle={() =>
            setCollapsed((prev) => ({
              ...prev,
              casilla4: !prev.casilla4,
            }))
          }
        >
          <div className="grid grid-cols-2 gap-4 mt-2 dark:text-gray-300">

            {form.transporte.map((t, i) => (
              <div
                key={i}
                className="border p-3 rounded space-y-2 relative"
              >
                <Input
                  label="Ruta"
                  value={t.ruta}
                  onChange={(v) => {
                    const arr = [
                      ...form.transporte,
                    ];

                    arr[i].ruta = v;

                    setForm((prev) => ({
                      ...prev,
                      transporte: arr,
                    }));
                  }}
                />

                <Input
                  label="Personas"
                  type="number"
                  value={t.personas}
                  onChange={(v) => {
                    const arr = [
                      ...form.transporte,
                    ];

                    arr[i].personas = v;

                    setForm((prev) => ({
                      ...prev,
                      transporte: arr,
                    }));
                  }}
                />

                <Input
                  label="Costo"
                  type="number"
                  value={t.costo}
                  onChange={(v) => {
                    const arr = [
                      ...form.transporte,
                    ];

                    arr[i].costo = v;

                    setForm((prev) => ({
                      ...prev,
                      transporte: arr,
                    }));
                  }}
                />

                <Input
                  label="Total"
                  readOnly
                  value={formatBs(
                    Number(t.personas || 0) *
                      Number(t.costo || 0)
                  )}
                />
              </div>
            ))}

            <button
              onClick={() =>
                addArrayItem(
                  "transporte",
                  {
                    ruta: "",
                    personas: "",
                    costo: "",
                  }
                )
              }
              className="w-10 h-10 border rounded text-green-600 font-bold"
            >
              +
            </button>

            <div className="col-span-2">

              <h4 className="font-semibold mb-2">
                Uso del flete
              </h4>

              {form.flete.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-2"
                >
                  <Input
                    label="Vueltas"
                    type="number"
                    value={f.vueltas}
                    onChange={(v) => {
                      const arr = [
                        ...form.flete,
                      ];

                      arr[i].vueltas = v;

                      setForm((prev) => ({
                        ...prev,
                        flete: arr,
                      }));
                    }}
                  />

                  <Input
                    label="Costo"
                    type="number"
                    value={f.costo}
                    onChange={(v) => {
                      const arr = [
                        ...form.flete,
                      ];

                      arr[i].costo = v;

                      setForm((prev) => ({
                        ...prev,
                        flete: arr,
                      }));
                    }}
                  />

                  <Input
                    label="Total"
                    readOnly
                    value={formatBs(
                      Number(f.vueltas || 0) *
                        Number(f.costo || 0)
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="col-span-2">
              <label className="font-semibold">
                Total (B)
              </label>

              <input
                readOnly
                value={formatBs(totalB)}
                className="border p-2 rounded w-full text-right bg-yellow-100"
              />
            </div>

            <div className="col-span-2">
              <label className="font-semibold">
                Diferencia (A - B)
              </label>

              <input
                readOnly
                value={formatBs(diferencia)}
                className="border p-2 rounded w-full text-right bg-yellow-100"
              />
            </div>
          </div>
        </Section>

       

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


const Section = ({
  title,
  children,
  collapsed,
  toggle,
}) => (
  <div className="border rounded p-4">
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={toggle}
    >
      <h3 className="font-semibold text-lg dark:text-gray-300">
        {title}
      </h3>

      <span className="dark:text-gray-300 dark:hover:text-gray-700">{collapsed ? "+" : "-"}</span>
    </div>

    {!collapsed && (
      <div className="mt-2">{children}</div>
    )}
  </div>
);


const Input = ({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  readOnly,
  error,
  colSpan = 1,
  className="",
}) => (
  <div className={`col-span-${colSpan}`}>
    <label className="block text-sm font-medium ">
      {label}
    </label>

    <input
      type={type}
      value={value}
      min={
        type === "number"
          ? "0"
          : undefined
      }
      maxLength={
        label === "Nota"
          ? 300
          : undefined
      }
      onChange={(e) =>
        onChange?.(e.target.value)
      }
      onBlur={(e) =>
        onBlur?.(e.target.value)
      }
      readOnly={readOnly}
      className={`border p-2 rounded w-full dark:bg-gray-200/40 dark:border-gray-200 dark:text-gray-200 ${
        readOnly ? "bg-gray-100" : ""
      } ${error ? "border-red-500" : ""}`}
    />

    {error && (
      <p className="text-red-500 text-sm mt-1">
        {error}
      </p>
    )}
  </div>
);


const ArrayInput = ({
  title,
  array,
  onChange,
  total,
}) => (
  <div className="border p-2 rounded space-y-2">
    <h4 className="font-semibold">
      {title}
    </h4>

    {array.map((item, i) => (
      <div key={i} className="flex gap-2">

        {Object.keys(item).map((key) => {
          let label = "";

          if (title.includes("Peajes")) {
            if (key === "nro")
              label = "Nro. Peajes";

            if (key === "precio")
              label = "Precio";
          }

          if (title.includes("ciudad")) {
            if (key === "dias")
              label = "Nro. días";

            if (key === "precio")
              label = "Precio día";
          }

          return (
            <Input
              key={key}
              label={label}
              type="number"
              value={item[key] || ""}
              onChange={(v) =>
                onChange(i, key, v)
              }
            />
          );
        })}
      </div>
    ))}

    <div>
      <label className="font-semibold">
        Total
      </label>

      <input
        readOnly
        value={total}
        className="border p-2 rounded w-full text-right bg-yellow-100"
      />
    </div>
  </div>
);