import React, { useState } from "react";
import { useUserStore } from "../../zustand/userStore";

export default function UserFormPanel({ open, onClose }) {
  const { fetchUsers, users, setPage } = useUserStore();
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const requiredFields =
      formType === "general"
        ? ["nombre", "apellido", "password", "cedula", "celular", "tipo"]
        : ["nombre", "apellido", "celular", "password"];
    if (requiredFields.includes(name) && !value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Este campo es obligatorio" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields =
      formType === "general"
        ? ["nombre", "apellido", "password", "cedula", "celular", "tipo"]
        : ["nombre", "apellido", "celular", "password"];

    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = "Este campo es obligatorio";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Completa los campos obligatorios.");
      return;
    }

    const newUser = {
      id: users.length + 1,
      nombres: formData.nombre || "",
      apellidos: formData.apellido || "",
      cedula: formData.cedula || "",
      celular: formData.celular || "",
      tipo: formType === "encargado" ? "Encargado" : formData.tipo || "Empleado",
      cargo: formData.cargo || "",
      email: formData.email || "",
    };

    users.push(newUser);
    fetchUsers();
    setPage(1);
    setFormData({});
    setErrors({});
    setFormType("");
    onClose();
  };

  const inputBase =
    "p-2 border rounded text-sm focus:outline-none w-full transition-colors";
  const inputError = "border-red-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl relative z-10"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="flex flex-col gap-6 items-center">
          {/* Selector de formulario */}
          {formType === "" && (
            <div className="w-80">
              <h3 className="font-semibold text-gray-700 text-center mb-4">
                Seleccione un Formulario
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 text-sm w-full"
                  onClick={() => setFormType("general")}
                >
                  Registro General
                </button>
                <button
                  className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 text-sm w-full"
                  onClick={() => setFormType("encargado")}
                >
                  Registro de Encargado
                </button>
              </div>
            </div>
          )}

          {/* Formulario Registro General */}
          {formType === "general" && (
            <div className="w-full">
              <form className="flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
                <h3 className="font-bold text-gray-600 text-center">Registro General</h3>

                <div className="grid grid-cols-3 gap-3">
                  {["nombre", "apellido", "password", "cedula", "celular"].map((field, idx) => (
                    <div className="flex flex-col" key={idx}>
                      <label className="text-gray-600 text-xs capitalize">{field}:</label>
                      <input
                        name={field}
                        type={field === "password" ? "password" : "text"}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputBase} ${errors[field] ? inputError : ""}`}
                        placeholder={`Ingrese ${field}`}
                      />
                      {errors[field] && (
                        <span className="text-red-500 text-xs mt-1">{errors[field]}</span>
                      )}
                    </div>
                  ))}

                  <div className="flex flex-col">
                    <label className="text-gray-600 text-xs">Tipo de Usuario:</label>
                    <select
                      name="tipo"
                      value={formData.tipo || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${errors.tipo ? inputError : ""}`}
                    >
                      <option value="">Seleccione un tipo</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Chofer">Chofer</option>
                      <option value="Mecánico">Mecánico</option>
                      <option value="Mensajero">Mensajero</option>
                    </select>
                    {errors.tipo && (
                      <span className="text-red-500 text-xs mt-1">{errors.tipo}</span>
                    )}
                  </div>
                </div>

                {/* Email opcional */}
                <div className="flex justify-center mt-2">
                  <div className="flex flex-col w-64">
                    <label className="text-gray-600 text-xs text-center">
                      E-mail: (Opcional)
                    </label>
                    <input
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className={`${inputBase}`}
                      placeholder="Ingrese un email válido"
                    />
                  </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="button"
                    className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
                    onClick={() => setFormType("")}
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Formulario Registro Encargado */}
          {formType === "encargado" && (
            <div className="w-full">
              <form className="flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
                <h3 className="font-bold text-gray-700 text-center">Registro de Encargado</h3>

                <div className="grid grid-cols-3 gap-3">
                  {["nombre", "apellido", "celular", "password"].map((field, idx) => (
                    <div className="flex flex-col" key={idx}>
                      <label className="text-gray-600 text-xs capitalize">{field}:</label>
                      <input
                        name={field}
                        type={field === "password" ? "password" : "text"}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputBase} ${errors[field] ? inputError : ""}`}
                        placeholder={`Ingrese ${field}`}
                      />
                      {errors[field] && (
                        <span className="text-red-500 text-xs mt-1">{errors[field]}</span>
                      )}
                    </div>
                  ))}

                  {/* Campos opcionales */}
                  {["facultad", "carrera", "materia", "sigla", "cedula", "email"].map(
                    (field, idx) => (
                      <div className="flex flex-col" key={idx}>
                        <label className="text-gray-600 text-xs capitalize">{field}:</label>
                        {field === "facultad" || field === "carrera" ? (
                          <select
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            className={`${inputBase}`}
                          >
                            <option value="">Seleccione {field}</option>
                            <option value={`${field} 1`}>{`${field} 1`}</option>
                            <option value={`${field} 2`}>{`${field} 2`}</option>
                          </select>
                        ) : (
                          <input
                            name={field}
                            value={formData[field] || ""}
                            onChange={handleChange}
                            className={`${inputBase}`}
                            placeholder={`Ingrese ${field}`}
                          />
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="button"
                    className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
                    onClick={() => setFormType("")}
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}














