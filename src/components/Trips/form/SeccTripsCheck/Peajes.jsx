
import React from "react";
import Section from "../../../common/Section";

import ArrayInput from "../../../common/ArrayInput";

export default function Peajes({
  form,
  handleArrayChange,
  collapsed,
  toggle,
  peajesTotal,
  viaticosCiudadTotal,
  viaticosProvinciaTotal,
  viaticosFronteraTotal,
  mantenimientoTotal,
  garajeTotal,
  totalA,
  formatBs,
}) {
  return (
    <Section
      title="3️⃣ Peajes y viáticos"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-2 gap-4 mt-2 dark:text-gray-300">

        
        <ArrayInput
          title="Peajes ida y vuelta"
         
          array={form.peajes}
          onChange={(i, k, v) =>
            handleArrayChange(
              "peajes",
              i,
              k,
              v
            )
          }
          total={formatBs(peajesTotal)}
        />

       
        <ArrayInput
          title="Viáticos provincia"
          array={form.viaticosProvincia}
          onChange={(i, k, v) =>
            handleArrayChange(
              "viaticosProvincia",
              i,
              k,
              v
            )
          }
          total={formatBs(viaticosProvinciaTotal)}
        />

        
        <ArrayInput
          title="Viáticos frontera"
          array={form.viaticosFrontera}
          onChange={(i, k, v) =>
            handleArrayChange(
              "viaticosFrontera",
              i,
              k,
              v
            )
          }
          total={formatBs(viaticosFronteraTotal)}
        />

        
        <ArrayInput
          title="Viáticos ciudad"
          array={form.viaticosCiudad}
          onChange={(i, k, v) =>
            handleArrayChange(
              "viaticosCiudad",
              i,
              k,
              v
            )
          }
          total={formatBs(
            viaticosCiudadTotal
          )}
        />

      
        <ArrayInput
          title="Mantenimiento vehicular"
          array={form.mantenimiento}
          onChange={(i, k, v) =>
            handleArrayChange(
              "mantenimiento",
              i,
              k,
              v
            )
          }
          total={formatBs(mantenimientoTotal)}
        />

      
        <ArrayInput
          title="Garaje vehicular"
          array={form.garaje}
          onChange={(i, k, v) =>
            handleArrayChange(
              "garaje",
              i,
              k,
              v
            )
          }
          total={formatBs(garajeTotal)}
        />

        
        <div className="col-span-2">
          <label className="font-semibold">
            Total (A)
          </label>

          <input
            readOnly
            value={formatBs(totalA)}
            className="border p-2 rounded w-full text-right bg-yellow-100"
          />
        </div>
      </div>
    </Section>
  );
}

