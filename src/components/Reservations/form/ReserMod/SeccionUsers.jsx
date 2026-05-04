import Select from "react-select";
import React from "react";

function SeccionUsuarios({
  formData,
  setFormData,
  choferes = [],
  vehiculos = [],
  encargados = [],
  errors = {},
}) {
const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: document.documentElement.classList.contains("dark")
      ? "rgba(229, 231, 235, 0.4)" 
      : "#ffffff",
    borderColor: document.documentElement.classList.contains("dark")
      ? "#e5e7eb"
      : "#d1d5db",
    color: "#1f2937",
    boxShadow: "none",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: document.documentElement.classList.contains("dark")
      ? "#4b5563" 
      : "#ffffff",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "rgba(156,163,175,0.3)" 
      : "transparent",
    color: document.documentElement.classList.contains("dark")
      ? "#e5e7eb" 
      : "#111827",
    cursor: "pointer",
  }),

  singleValue: (base) => ({
    ...base,
    color: document.documentElement.classList.contains("dark")
      ? "#e5e7eb" 
      : "#111827",
  }),

  placeholder: (base) => ({
    ...base,
    color: document.documentElement.classList.contains("dark")
      ? "#d1d5db" 
      : "#6b7280",
  }),
};
  const handleSelectChange = (name, selected) => {
    setFormData((f) => ({
      ...f,
      [name]: selected ? selected.map((s) => s.value) : []
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border grid grid-cols-3 gap-4 dark:bg-gray-800 dark:border-gray-700">

     
      <div>
        <label className="text-sm font-semibold">Choferes</label>

        <Select
          isMulti
          options={(choferes ?? []).map(c => ({
            value: c.id,
            label: `${c.nombres} ${c.apellidos}`
          }))}
          value={(choferes ?? [])
            .filter(c => (formData?.chofer ?? []).includes(c.id))
            .map(c => ({
              value: c.id,
              label: `${c.nombres} ${c.apellidos}`
            }))
          }
          onChange={(selected) => handleSelectChange("chofer", selected)}
           styles={customSelectStyles}
        />

        {errors?.chofer && (
          <p className="text-red-500 text-xs">{errors.chofer}</p>
        )}
      </div>

      
      <div>
        <label className="text-sm font-semibold">Vehículos</label>

        <Select
          isMulti
          options={(vehiculos ?? []).map(v => ({
            value: v.id,
            label: `${v.tipog} ${v.placa}`
          }))}
          value={(vehiculos ?? [])
            .filter(v => (formData?.vehiculo ?? []).includes(v.id))
            .map(v => ({
              value: v.id,
              label: `${v.tipog} ${v.placa}`
            }))
          }
          onChange={(selected) => handleSelectChange("vehiculo", selected)}
           styles={customSelectStyles}
        />

        {errors?.vehiculo && (
          <p className="text-red-500 text-xs">{errors.vehiculo}</p>
        )}
      </div>

      
      <div>
        <label className="text-sm font-semibold">Encargados</label>

        <Select
          isMulti
          options={(encargados ?? []).map(u => ({
            value: u.id,
            label: `${u.nombres} ${u.apellidos}`
          }))}
          value={(encargados ?? [])
            .filter(u => (formData?.encargado ?? []).includes(u.id))
            .map(u => ({
              value: u.id,
              label: `${u.nombres} ${u.apellidos}`
            }))
          }
          onChange={(selected) => handleSelectChange("encargado", selected)}
           styles={customSelectStyles}
        />

        {errors?.encargado && (
          <p className="text-red-500 text-xs">{errors.encargado}</p>
        )}
      </div>

    </div>
  );
}


export default React.memo(SeccionUsuarios);