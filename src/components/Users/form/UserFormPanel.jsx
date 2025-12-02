import React, { useState } from "react";
import { useUserStore } from "../../../zustand/userStore";
import GeneralForm from "./GeneralForm";
import EncargadoForm from "./EncargadoForm";

export default function UserFormPanel({ open, onClose }) {
  const { fetchUsers, users, setPage } = useUserStore();
  const [formType, setFormType] = useState("");

  if (!open) return null;

  const handleClose = () => {
    setFormType("");
    onClose();
  };

  const handleSubmit = (newUserData) => {
    const newUser = {
      id: users.length + 1,
      ...newUserData,
    };
    users.push(newUser);
    fetchUsers();
    setPage(1);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={handleClose}
      ></div>

      {/* Contenedor del formulario */}
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl relative z-10"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {/* X de cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-4 text-gray-800 hover:text-gray-800 font-bold text-3xl "
        >
          ×
        </button>

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

          {/* import de Formularios */}
          {formType === "general" && (
            <GeneralForm onSubmit={handleSubmit} />
          )}
          {formType === "encargado" && (
            <EncargadoForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
















