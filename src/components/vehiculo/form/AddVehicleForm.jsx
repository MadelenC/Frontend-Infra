import React, { useState } from "react";

export default function AddVehicleForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    asignadoA: "",
    placa: "",
    color: "",
    motor: "",
    chasis: "",
    cilindrada: "",
    pasajeros: "",
    kilometraje: "",
    estado: "",
    tipoGeneral: "",
    marca: "",
    modelo: "",
    tipoEspecifico: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevo vehículo:", formData);
    onSubmit?.(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20  pt-9">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl p-4 overflow-y-auto max-h-[75vh] relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Nuevo Vehículo</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
          <Input label="Asignado a" name="asignadoA" placeholder="Ejm. nombre del chofer" onChange={handleChange} />
          <Input label="Placa" name="placa" placeholder="Ejm. 3027-TRL" onChange={handleChange} />
          <Input label="Color" name="color" placeholder="Ejm. Blanco" onChange={handleChange} />

          <Input label="Motor" name="motor" placeholder="Serie del motor" onChange={handleChange} />
          <Input label="Chasis" name="chasis" placeholder="Serie del Chasis" onChange={handleChange} />
          <Input label="Cilindrada" name="cilindrada" placeholder="Ejm. 3000" onChange={handleChange} />

          <Input label="Pasajeros" name="pasajeros" placeholder="Ejm. 50" onChange={handleChange} />
          <Input label="Kilometraje" name="kilometraje" placeholder="Ejm. 22015" onChange={handleChange} />
          <Select label="Estado" name="estado" onChange={handleChange} options={["", "Óptimo", "Mantenimiento", "Desuso"]} />

          <Input label="Tipo general" name="tipoGeneral" placeholder="Ejm. Vagoneta" onChange={handleChange} />
          <Input label="Marca" name="marca" placeholder="Ejm. Toyota" onChange={handleChange} />
          <Input label="Modelo" name="modelo" placeholder="Ejm. 2002" onChange={handleChange} />

          <Input label="Tipo específico" name="tipoEspecifico" placeholder="Ejm. Patrol" onChange={handleChange} />
          <div></div>
          <div></div>

          {/* Botón */}
          <div className="md:col-span-3 flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Registrar
            </button>
          </div>
        </form>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}

function Input({ label, name, placeholder, onChange }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="h-9 px-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
      />
    </div>
  );
}

function Select({ label, name, onChange, options }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        onChange={onChange}
        className="h-9 px-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? "Seleccione estado" : opt}
          </option>
        ))}
      </select>
    </div>
  );
}


