import React from "react";
import Select from "react-select";

export default function DatosViaje({
  formData,
  handleChange,
  choferes = [],
  encargados = [],
  vehiculos = [],
}) {

  const vehiculoOptions = vehiculos.map((v) => ({
    value: v.id,
    label: `${v.tipog} - ${v.placa}`,
  }));

  const choferOptions = choferes.map((c) => ({
    value: c.id,
    label: `${c.nombres} ${c.apellidos}`,
  }));

  const encargadoOptions = encargados.map((e) => ({
    value: e.id,
    label: `${e.nombres} ${e.apellidos}`,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* VEHICULO */}
      <div>
        <label className="block mb-1 font-medium">
          Vehículo
        </label>

        <Select
          options={vehiculoOptions}
          value={
            vehiculoOptions.find(
              (opt) => opt.value === formData.vehiculo
            ) || null
          }
          onChange={(selected) =>
            handleChange({
              target: {
                name: "vehiculo",
                value: selected?.value || "",
              },
            })
          }
          placeholder="Buscar vehículo..."
        />
      </div>

      

      {/* ENCARGADO */}
      <div>
        <label className="block mb-1 font-medium">
          Encargado
        </label>

        <Select
          options={encargadoOptions}
          value={
            encargadoOptions.find(
              (opt) => opt.value === formData.encargado
            ) || null
          }
          onChange={(selected) =>
            handleChange({
              target: {
                name: "encargado",
                value: selected?.value || "",
              },
            })
          }
          placeholder="Buscar encargado..."
        />
      </div>

      <input
        type="date"
        name="fechaPartida"
        value={formData.fechaPartida}
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

      <input
        type="date"
        name="fechaLlegada"
        value={formData.fechaLlegada}
        onChange={handleChange}
        className="border rounded-xl p-3"
      />

       {/* KM PARTIDA */}
      <div>
        <label className="block mb-1 font-medium">
          Kilometraje de Partida
        </label>

        <input
          type="number"
          name="kmPartida"
          placeholder="Inserte el km. de partida"
          value={formData.kmPartida}
          onChange={handleChange}
          className="border rounded-xl p-3 w-full"
        />
      </div>

      {/* KM LLEGADA */}
      <div>
        <label className="block mb-1 font-medium">
          Kilometraje de Llegada
        </label>

        <input
          type="number"
          name="kmLlegada"
          placeholder="Inserte el km. de llegada"
          value={formData.kmLlegada}
          onChange={handleChange}
          className="border rounded-xl p-3 w-full"
        />
      </div>

      {/* HORA PARTIDA */}
      <div>
        <label className="block mb-1 font-medium">
          Hora de Partida
        </label>

        <input
          type="time"
          name="horaPartida"
          value={formData.horaPartida}
          onChange={handleChange}
          className="border rounded-xl p-3 w-full"
        />
      </div>

      {/* HORA LLEGADA */}
      <div>
        <label className="block mb-1 font-medium">
          Hora de Llegada
        </label>

        <input
          type="time"
          name="horaLlegada"
          value={formData.horaLlegada}
          onChange={handleChange}
          className="border rounded-xl p-3 w-full"
        />
      </div>

    </div>
  );
}