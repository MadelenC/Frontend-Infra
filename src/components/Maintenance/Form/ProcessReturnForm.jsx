import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../../zustand/AuthUsers"

export default function ProcessReturnForm({
  isOpen,
  onClose,
  onSave,
  maintenance,
 
}) {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    serial: "",
    fecha: "",
    cantidad: "",
    nombre: "",
    detalle: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        serial: "",
        fecha: maintenance?.fecha || "",
        cantidad: "",
        nombre: "",
        detalle: "",
      });
      setErrors({});
      setLoading(false);
    }
  }, [isOpen, maintenance]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.serial.trim()) {
      newErrors.serial = "El serial es obligatorio";
    } else if (formData.serial.trim().length < 3) {
      newErrors.serial = "El serial es muy corto";
    }

    if (!formData.fecha) {
      newErrors.fecha = "La fecha es obligatoria";
    } else if (new Date(formData.fecha) > new Date()) {
      newErrors.fecha = "La fecha no puede ser futura";
    }

    if (!formData.cantidad) {
      newErrors.cantidad = "La cantidad es obligatoria";
    } else if (Number(formData.cantidad) <= 0) {
      newErrors.cantidad = "Debe ser mayor a 0";
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "Mínimo 3 caracteres";
    }

    if (formData.detalle.length > 300) {
      newErrors.detalle = "Máximo 300 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Revisa los campos del formulario");
      return;
    }

    setLoading(true);

    try {
      await onSave?.({
        serial: formData.serial,
        fecha: formData.fecha,
        cantidad: Number(formData.cantidad),
        nombre: formData.nombre,
        detalle: formData.detalle,


        insertador:
        `${user?.nombres || ""} ${user?.apellidos || ""}`.trim() ||
        "DESCONOCIDO",
        mecanico_id: maintenance?.id,
      });

      toast.success("Devolución registrada correctamente ✔");

      onClose?.();
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar devolución ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative dark:bg-gray-800">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded-lg hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4 text-center dark:text-gray-200">
          Realizar Devolución
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 dark:text-gray-300">

        
          <div>
            <label className="block font-medium mb-1">Serial</label>
            <input
              name="serial"
              value={formData.serial}
              onChange={handleChange}
              className="p-2 border rounded w-full dark:bg-gray-200/40"
            />
            {errors.serial && <p className="text-red-500 text-xs">{errors.serial}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="p-2 border rounded w-full dark:bg-gray-200/40"
            />
            {errors.fecha && <p className="text-red-500 text-xs">{errors.fecha}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="p-2 border rounded w-full dark:bg-gray-200/40"
            />
            {errors.cantidad && <p className="text-red-500 text-xs">{errors.cantidad}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="p-2 border rounded w-full dark:bg-gray-200/40"
            />
            {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
          </div>

          
          <div>
            <label className="block font-medium mb-1">Detalle</label>
            <textarea
              name="detalle"
              value={formData.detalle}
              onChange={handleChange}
              className="p-2 border rounded w-full dark:bg-gray-200/40"
            />
            {errors.detalle && <p className="text-red-500 text-xs">{errors.detalle}</p>}
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className={`mt-3 px-4 py-2 rounded text-white transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-800"
            }`}
          >
            {loading ? "Guardando..." : "Registrar"}
          </button>

        </form>
      </div>
    </div>
  );
}