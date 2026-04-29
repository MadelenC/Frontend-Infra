import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditRepaymentForm({
  isOpen,
  onClose,
  onSave,
  maintenance,
}) {
  const [formData, setFormData] = useState({
    serial: "",
    fecha: "",
    cantidad: "",
    nombre: "",
    detalle: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Cargar datos cuando abre (modo editar)
  useEffect(() => {
    if (isOpen) {
      setFormData({
        serial: maintenance?.serial || "",
        fecha: maintenance?.fecha || "",
        cantidad: maintenance?.cantidad || "",
        nombre: maintenance?.nombre || "",
        detalle: maintenance?.detalle || "",
      });
    }
  }, [isOpen, maintenance]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!formData.serial) return "Serial requerido";
    if (!formData.nombre) return "Nombre requerido";
    if (!formData.fecha) return "Fecha requerida";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      await onSave?.({
        ...formData,
        mecanico_id: maintenance?.id, 
      });

      toast.success(
        maintenance ? "Editado correctamente ✔" : "Creado correctamente ✔"
      );

      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-label="Cerrar formulario"
                >
                X
                </button>
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          {maintenance ? "Editar devolución" : "Nueva devolución"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">


           <label className="w-24 text-left text-gray-700 dark:text-gray-300">Serial:</label>
          <input
            name="serial"
            value={formData.serial}
            onChange={handleChange}
            placeholder="Serial"
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
            <label className="w-24 text-left text-gray-700 dark:text-gray-300">Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
            <label className="w-24 text-left text-gray-700 dark:text-gray-300"> Cantidad:</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        <label className="w-24 text-left text-gray-700 dark:text-gray-300">Nombre:</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
            <label className="w-24 text-left text-gray-700 dark:text-gray-300">Detalle:</label>
          <textarea
            name="detalle"
            value={formData.detalle}
            onChange={handleChange}
            placeholder="Detalle"
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-2 rounded text-white transition ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

        </form>

       <button
        onClick={async () => {
            try {
            await onDelete?.(maintenance?.id); 
            toast.success("Eliminado correctamente ✔");
            onClose?.(); 
            } catch (error) {
            console.error(error);
            toast.error("Error al eliminar ❌");
            }
        }}
        className="mt-3 text-white w-full bg-red-500 hover:bg-red-600 p-2 rounded"
        >
        ELIMINAR
        </button>

      </div>
    </div>
  );
}