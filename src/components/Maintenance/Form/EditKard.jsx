import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../zustand/AuthUsers";


export default function EditKard({ isOpen, onClose, onSave, application }) {
 const [formData, setFormData] = useState({
  kilometraje: "",
  fechaTrabajo: "",
  cantidad: "",
  nombrePieza: "",
  trabajoRealizado: "",
  marca: "",
  codigo: "",
  observacion: "",
});

useEffect(() => {
  if (application) {
    setFormData({
      kilometraje: application.kilometraje || "",
      fechaTrabajo: application.fecha
        ? new Date(application.fecha).toISOString().split("T")[0]
        : "",
      cantidad: application.cantidad || "",
      nombrePieza: application.unidad || "",
      trabajoRealizado: application.trabajo || "",
      marca: application.marca || "",
      codigo: application.codigo || "",
      observacion: application.repuesto || "",
    });
  }
}, [application]);

 
  const { user } = useAuthStore();
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  //  VALIDACIONES
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "kilometraje":
        if (!value) error = "Requerido";
        else if (value < 0) error = "No negativo";
        break;

      case "fechaTrabajo":
        if (!value) error = "Requerido";
        break;

      case "cantidad":
        if (!value) error = "Requerido";
        else if (value <= 0) error = "Mayor a 0";
        break;

      case "nombrePieza":
        if (!value.trim()) error = "Requerido";
        break;

      case "trabajoRealizado":
        if (!value.trim()) error = "Requerido";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateAll = () => {
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); 
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAll();

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Corrige los campos obligatorios");
      return;
    }

    if (!user?.id) {
    toast.error("Usuario no autenticado");
    return;
  }


    setSaving(true);

   const payload = {
    id: application.id,
    fecha: formData.fechaTrabajo,
    cantidad: Number(formData.cantidad),
    unidad: formData.nombrePieza,
    trabajo: formData.trabajoRealizado,
    marca: formData.marca,
    codigo: formData.codigo,
    observacion: formData.observacion,
    kilometraje: Number(formData.kilometraje),
    insertador: `${user?.nombres || ""} ${user?.apellidos || ""}`.trim(),
    };

    const response = await onSave(payload);
    setSaving(false);

    if (response?.ok) {
      toast.success("Trabajo actualizao correctamente ✅");
      onClose();
    } else {
      toast.error(response?.error || "Error al guardar trabajo");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-5 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl relative h-[90vh] flex flex-col dark:bg-gray-800">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6 dark:text-gray-200">
          Editar Trabajo
        </h2>

        <p className="text-sm text-center mb-4 px-6">
          <span className="text-green-600 font-semibold">■ Los campos en verde son obligatorios.</span>{" "}
          <span className="text-blue-500 font-semibold">■ Los campos en azul son opcionales.</span>
        </p>

        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6 dark:text-gray-200 ">
            <div className="p-4 border border-gray-300 rounded-md bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-2">Trabajo Realizado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-green-600 font-semibold">Kilometraje*</label>
                  <input
                    type="number"
                    name="kilometraje"
                    value={formData.kilometraje}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ejm. 18965"
                    className={`p-2 border rounded text-sm w-full transition 
                      ${errors.kilometraje ? "border-red-500" : ""} 
                      dark:bg-gray-200/40 dark:border-gray-200`}
                  />
                  {errors.kilometraje && <p className="text-red-500 text-xs">{errors.kilometraje}</p>}
                </div>
                <div>
                  <label className="text-green-600 font-semibold">Fecha*</label>
                  <input
                    type="date"
                    name="fechaTrabajo"
                    value={formData.fechaTrabajo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`p-2 border rounded text-sm w-full transition 
                      ${errors.fechaTrabajo ? "border-red-500" : ""} 
                      dark:bg-gray-200/40 dark:border-gray-200`}
                  />
                  {errors.fechaTrabajo && <p className="text-red-500 text-xs">{errors.fechaTrabajo}</p>}
                </div>

                <div>
                  <label className="text-green-600 font-semibold">Cantidad*</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ejm. 1"
                    className={`p-2 border rounded text-sm w-full transition 
                      ${errors.cantidad ? "border-red-500" : ""} 
                      dark:bg-gray-200/40 dark:border-gray-200`}
                  />
                  {errors.cantidad && <p className="text-red-500 text-xs">{errors.cantidad}</p>}
                </div>

                <div>
                  <label className="text-green-600 font-semibold">Nombre*</label>
                  <input
                    type="text"
                    name="nombrePieza"
                    value={formData.nombrePieza}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ejm. piezas"
                    className={`p-2 border rounded text-sm w-full transition 
                      ${errors.nombrePieza ? "border-red-500" : ""} 
                      dark:bg-gray-200/40 dark:border-gray-200`}
                  />
                  {errors.nombrePieza && <p className="text-red-500 text-xs">{errors.nombrePieza}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="text-green-600 font-semibold">Trabajo realizado*</label>
                  <textarea
                    name="trabajoRealizado"
                    value={formData.trabajoRealizado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Escriba un trabajo realizado"
                    className={`p-2 border rounded text-sm w-full transition 
                      ${errors.trabajoRealizado ? "border-red-500" : ""} 
                      dark:bg-gray-200/40 dark:border-gray-200`}
                  />
                  {errors.trabajoRealizado && <p className="text-red-500 text-xs">{errors.trabajoRealizado}</p>}
                </div>

                <div>
                  <label className="text-blue-500 font-semibold">Marca</label>
                  <input type="text" name="marca" value={formData.marca} onChange={handleChange}
                    className="p-2 border rounded text-sm w-full dark:bg-gray-200/40 dark:border-gray-200" />
                </div>

                <div>
                  <label className="text-blue-500 font-semibold">Código</label>
                  <input type="text" name="codigo" value={formData.codigo} onChange={handleChange}
                    className="p-2 border rounded text-sm w-full dark:bg-gray-200/40 dark:border-gray-200" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-blue-500 font-semibold">Observación</label>
                  <textarea name="observacion" value={formData.observacion} onChange={handleChange}
                    className="p-2 border rounded text-sm w-full dark:bg-gray-200/40 dark:border-gray-200" />
                </div>

              </div>
            </div>

          </form>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button onClick={onClose} className="bg-gray-500 text-white px-5 py-2 rounded-md">
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-blue-700 text-white px-5 py-2 rounded-md"
          >
            {saving ? "Guardando..." : "Actualizar"}
          </button>
        </div>

      </div>
    </div>
  );
}