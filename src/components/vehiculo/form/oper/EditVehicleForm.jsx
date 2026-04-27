import React, { useState } from "react";

export default function EditVehicleForm({
  vehicleData,
  onUpdate,
  onDelete,
  onClose,
}) {
  const [formData, setFormData] = useState({
    asignacion: vehicleData.asignacion || "",
    placa: vehicleData.placa || "",
    color: vehicleData.color || "",
    asientos: vehicleData.asientos || "",
    tipog: vehicleData.tipog || "",
    tipoe: vehicleData.tipoe || "",
    estado: vehicleData.estado || "",
    combustible: vehicleData.combustible || "",
    kilometraje: vehicleData.kilometraje || "",
    marca: vehicleData.marca || "",
    modelo: vehicleData.modelo || "",
    motor: vehicleData.motor || "",
    chasis: vehicleData.chasis || "",
    cilindrada: vehicleData.cilindrada || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate?.({ id: vehicleData.id, ...formData });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete?.(vehicleData.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-2xl p-4 overflow-y-auto max-h-[75vh] relative">

       
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-4 pt-7">
          Actualización de datos del Vehículo
        </h2>

      
        <form className="grid grid-cols-1 md:grid-cols-3 gap-3 px-5 pb-5">

          <Input label="Asignación" name="asignacion" value={formData.asignacion} onChange={handleChange} />
          <Input label="Placa" name="placa" value={formData.placa} onChange={handleChange} />
          <Input label="Color" name="color" value={formData.color} onChange={handleChange} />

          <Input label="Asientos" name="asientos" value={formData.asientos} onChange={handleChange} />
          <Input label="Tipo general" name="tipog" value={formData.tipog} onChange={handleChange} />

          <Select
            label="Estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            options={["optimo", "mantenimiento", "desuso"]}
          />

          <Input label="Combustible" name="combustible" value={formData.combustible} onChange={handleChange} />
          <Input label="Kilometraje" name="kilometraje" value={formData.kilometraje} onChange={handleChange} />

          <Input label="Marca" name="marca" value={formData.marca} onChange={handleChange} />
          <Input label="Modelo" name="modelo" value={formData.modelo} onChange={handleChange} />
          <Input label="Tipo específico" name="tipoe" value={formData.tipoe} onChange={handleChange} />

          <Input label="Motor" name="motor" value={formData.motor} onChange={handleChange} />
          <Input label="Chasis" name="chasis" value={formData.chasis} onChange={handleChange} />
          <Input label="Cilindrada" name="cilindrada" value={formData.cilindrada} onChange={handleChange} />

          <div className="md:col-span-3 flex justify-end gap-2 mt-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 text-sm"
            >
              Actualizar
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 text-sm"
            >
              Eliminar
            </button>
          </div>

        </form>

     
       <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold px-3 py-1 rounded hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Cerrar formulario"
        >
          X
        </button>
      </div>
    </div>
  );
}


function Input({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border rounded text-sm w-full transition  dark:bg-gray-200/40 dark:border-gray-200"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-10 w-full px-3 text-sm rounded-md border shadow-sm transition
        bg-white border-gray-300 text-gray-800
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
        dark:bg-gray-200/40 dark:border-gray-200 dark:text-gray-800 "
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="dark:bg-gray-600 dark:text-gray-200">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

