import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddReservaModal({ isOpen, onClose, onSave, encargados = [] }) {
  const [formData, setFormData] = useState({
    encargado: "",
    fechaInicial: "",
    fechaFinal: "",
    entidad: "",
    objetivo: "",
    pasajeros: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      encargado: "",
      fechaInicial: "",
      fechaFinal: "",
      entidad: "",
      objetivo: "",
      pasajeros: "",
    });

    setErrors({});
    setTouched({});
  }, [isOpen]);

  // vALIDACIÓN
  const validateField = (name, value) => {
    if (!value) return "Campo obligatorio";

    if (name === "pasajeros" && Number(value) <= 0) {
      return "Debe ser mayor a 0";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // evitar números en texto
    if ((name === "entidad" || name === "objetivo") && /\d/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);

    return !Object.values(newErrors).some((e) => e);
  };

  // SUBMIT CORREGIDO CON TOASTIFY
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("❌ Corrija los errores del formulario");
    return;
  }

  const payload = {
    user_id: Number(formData.encargado),
    fecha_inicial: formData.fechaInicial + ":00",
    fecha_final: formData.fechaFinal + ":00",
    entidad: formData.entidad,
    objetivo: formData.objetivo,
    pasajeros: Number(formData.pasajeros),
  };

  setSaving(true);

  try {
    await onSave(payload);

    toast.success("✅ Reserva creada correctamente");

    onClose();

  } catch (error) {
    console.error(error);
    toast.error("⚠️ Error al guardar la reserva");

  } finally {
    setSaving(false);
  }
};

  if (!isOpen) return null;

  return (
    <>
      
      

      <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-5 backdrop-blur-sm">

        <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-2xl dark:bg-gray-800 relative">
     <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6 dark:text-gray-200">
            Nueva Reserva
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ENCARGADO */}
            <Field label="Encargado">
              <select
                name="encargado"
                value={formData.encargado}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass(errors.encargado)}
              >
                <option value="">Seleccione</option>
                {encargados.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombres} {u.apellidos}
                  </option>
                ))}
              </select>
              <Error error={errors.encargado} />
            </Field>

            {/* FECHAS */}
            <div className="grid grid-cols-2 gap-4">

              <Field label="Fecha Inicial">
                <input
                  type="datetime-local"
                  name="fechaInicial"
                  value={formData.fechaInicial}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass(errors.fechaInicial)}
                />
                <Error error={errors.fechaInicial} />
              </Field>

              <Field label="Fecha Final">
                <input
                  type="datetime-local"
                  name="fechaFinal"
                  value={formData.fechaFinal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass(errors.fechaFinal)}
                />
                <Error error={errors.fechaFinal} />
              </Field>

            </div>

            {/* CAMPOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <Field label="Entidad">
                <input
                  name="entidad"
                  value={formData.entidad}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass(errors.entidad)}
                />
                <Error error={errors.entidad} />
              </Field>

              <Field label="Objetivo">
                <input
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass(errors.objetivo)}
                />
                <Error error={errors.objetivo} />
              </Field>

              <Field label="Pasajeros">
                <input
                  type="number"
                  name="pasajeros"
                  value={formData.pasajeros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass(errors.pasajeros)}
                />
                <Error error={errors.pasajeros} />
              </Field>

            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-3 pt-4 border-t">

              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white px-5 py-2 rounded-md"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-700 text-white px-5 py-2 rounded-md"
              >
                {saving ? "Guardando..." : "Registrar"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </>
  );
}


function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1 dark:text-gray-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function Error({ error }) {
  if (!error) return null;
  return <p className="text-red-500 text-xs mt-1">{error}</p>;
}

function inputClass(error) {
  return `p-2 border rounded text-sm w-full transition
  bg-white text-gray-800
  focus:outline-none focus:ring-2 focus:ring-blue-400
  dark:bg-gray-800 dark:text-gray-200
  ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 dark:border-gray-600"}`;
}