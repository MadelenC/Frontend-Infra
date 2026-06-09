import { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

export default function EditJobApplicationForm({
  isOpen,
  onClose,
  onSave,
  vehiculos = [],
  accesorios = [],
  initialData,
}) {
  const [formData, setFormData] = useState({
    vehiculo_id: "",
    accesorio_ids: [],
    descripcion: "",
  });

  const [saving, setSaving] = useState(false);

  // 🔥 CARGAR DATOS AL ABRIR MODAL
  useEffect(() => {
    if (!isOpen || !initialData) return;

    setFormData({
      vehiculo_id: initialData.vehiculo?.id || "",
      accesorio_ids:
        initialData.accesorios?.map((a) => a.id) || [],
      descripcion: initialData.descripcion || "",
    });
  }, [isOpen, initialData]);

  // 🔥 OPTIONS MEMOIZADOS
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

  // 🔥 SUBMIT EDIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const desc = formData.descripcion?.trim();

    if (!formData.vehiculo_id) {
      toast.error("Seleccione un vehículo 🚗");
      return;
    }

    if (!desc) {
      toast.error("Ingrese descripción 📝");
      return;
    }

    const payload = {
      vehiculo_id: Number(formData.vehiculo_id),
      accesorio_ids: formData.accesorio_ids.map(Number),
      descripsoli: desc,
    };

    try {
      setSaving(true);

      const res = await onSave(payload);

      if (!res?.ok) {
        toast.error(res?.error || "Error al actualizar ❌");
        return;
      }

      toast.success("Actualizado correctamente ✅");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Error del servidor ❌");
    } finally {
      setSaving(false);
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "rgba(229,231,235,0.4)",
      borderColor: "#e5e7eb",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#444",
    }),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-xl">

        <h2 className="text-xl font-bold mb-4 text-center">
          Editar Solicitud
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* VEHÍCULO */}
          <div>
            <label className="block mb-1 font-semibold">
              Vehículo
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
                  vehiculo_id: selected?.value || "",
                }))
              }
            />
          </div>

          {/* ACCESORIOS */}
          <div>
            <label className="block mb-1 font-semibold">
              Accesorios
            </label>

            <Select
              isMulti
              styles={selectStyles}
              options={accesorioOptions}
              value={accesorioOptions.filter((a) =>
                formData.accesorio_ids.includes(a.value)
              )}
              onChange={(selected) =>
                setFormData((p) => ({
                  ...p,
                  accesorio_ids: selected
                    ? selected.map((s) => s.value)
                    : [],
                }))
              }
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block mb-1 font-semibold">
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
              className="w-full border rounded p-2"
            />
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {saving ? "Guardando..." : "Actualizar"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}