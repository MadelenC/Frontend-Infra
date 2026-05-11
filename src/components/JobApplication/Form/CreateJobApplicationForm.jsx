import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export default function CreateJobApplicationForm({
  isOpen,
  onClose,
  onSave,
  vehiculos = [],
  accesorios = [],
}) {
  const [formData, setFormData] = useState({
    vehiculo_id: null,
    accesorio_ids: [],
    nuevos_accesorios: [],
    descripcion: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      vehiculo_id: null,
      accesorio_ids: [],
      nuevos_accesorios: [],
      descripcion: "",
    });
  }, [isOpen]);

  const vehiculoOptions = useMemo(
    () =>
      vehiculos.map((v) => ({
        value: v.id,
        label: `${v.tipog || ""} - ${v.placa || ""}`,
      })),
    [vehiculos]
  );

  const accesorioOptions = useMemo(
    () =>
      accesorios.map((a) => ({
        value: a.id,
        label: a.solicitud1,
      })),
    [accesorios]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const desc = formData.descripcion?.trim();

    if (!formData.vehiculo_id) {
      toast.error("Seleccione un vehículo 🚗");
      return;
    }

    if (!desc) {
      toast.error("Ingrese una descripción 📝");
      return;
    }

    const payload = {
      vehiculo_id: Number(formData.vehiculo_id),
      accesorio_ids: formData.accesorio_ids.map(Number),
      nuevos_accesorios: formData.nuevos_accesorios,
      descripsoli: desc,
    };

    console.log("📤 Payload:", payload);

    try {
      setSaving(true);

      const response = await onSave(payload);

      if (!response?.ok) {
        toast.error(response?.error || "Error al guardar ❌");
        return;
      }

      toast.success("Solicitud registrada correctamente ✅");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error del servidor ❌");
    } finally {
      setSaving(false);
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(229, 231, 235, 0.4)",
      borderColor: "#e5e7eb",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#232324",
    }),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-5 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl relative dark:bg-gray-800">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-200"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-700 mt-6 dark:text-gray-200">
          Solicitud de Trabajo
        </h2>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* VEHÍCULO */}
          <div>
            <label className="block mb-1 font-semibold dark:text-gray-200">
              Movilidad
            </label>

            <Select
              styles={selectStyles}
              options={vehiculoOptions}
              value={vehiculoOptions.find(
                (opt) => opt.value === formData.vehiculo_id
              )}
              onChange={(selected) =>
                setFormData((p) => ({
                  ...p,
                  vehiculo_id: selected?.value || null,
                }))
              }
              placeholder="Seleccione vehículo"
            />
          </div>

     
          <div>
            <label className="block mb-1 font-semibold dark:text-gray-200">
              Accesorios
            </label>

            <CreatableSelect
              isMulti
              styles={selectStyles}
              options={accesorioOptions}
              value={[
                ...accesorioOptions.filter((a) =>
                  formData.accesorio_ids.includes(a.value)
                ),
                ...formData.nuevos_accesorios.map((text) => ({
                  value: text,
                  label: text,
                })),
              ]}
              onChange={(selected) => {
                const existing = [];
                const created = [];

                selected?.forEach((item) => {
                  if (item.__isNew__) {
                    created.push(item.value || item.label);
                  } else {
                    existing.push(item.value);
                  }
                });

                setFormData((p) => ({
                  ...p,
                  accesorio_ids: existing,
                  nuevos_accesorios: created,
                }));
              }}
              placeholder="Escribe o selecciona accesorios"
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block mb-1 font-semibold dark:text-gray-200">
              Descripción
            </label>

            <textarea
              value={formData.descripcion}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  descripcion: e.target.value,
                }))
              }
              className="w-full border px-3 py-2 rounded dark:bg-gray-200/40 dark:border-gray-200"
            />
          </div>

          {/* BOTÓN */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-blue-600 text-white rounded-md"
            >
              {saving ? "Guardando..." : "Registrar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}