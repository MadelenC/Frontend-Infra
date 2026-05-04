
import React from "react";
import Section from "../../../common/Section";
import Input from "../../../common/Input";

export default function Transport({
  form,
  setForm,
  collapsed,
  toggle,
  addArrayItem,
  totalB,
  diferencia,
  formatBs,
}) {
  return (
    <Section
      title="4️⃣ Transporte y flete"
      collapsed={collapsed}
      toggle={toggle}
    >
      <div className="grid grid-cols-2 gap-4 mt-2 dark:text-gray-300">

        {/* TRANSPORTE */}
        {form.transporte.map((t, i) => (
          <div
            key={i}
            className="border p-3 rounded space-y-2 relative"
          >
            <Input
              label="Ruta"
              value={t.ruta}
              onChange={(v) => {
                const arr = [
                  ...form.transporte,
                ];

                arr[i].ruta = v;

                setForm((prev) => ({
                  ...prev,
                  transporte: arr,
                }));
              }}
            />

            <Input
              label="Personas"
              type="number"
              value={t.personas}
              onChange={(v) => {
                const arr = [
                  ...form.transporte,
                ];

                arr[i].personas = v;

                setForm((prev) => ({
                  ...prev,
                  transporte: arr,
                }));
              }}
            />

            <Input
              label="Costo"
              type="number"
              value={t.costo}
              onChange={(v) => {
                const arr = [
                  ...form.transporte,
                ];

                arr[i].costo = v;

                setForm((prev) => ({
                  ...prev,
                  transporte: arr,
                }));
              }}
            />

            <Input
              label="Total"
              readOnly
              value={formatBs(
                Number(t.personas || 0) *
                  Number(t.costo || 0)
              )}
            />
          </div>
        ))}

        {/* BOTÓN AGREGAR */}
        <button
          onClick={() =>
            addArrayItem(
              "transporte",
              {
                ruta: "",
                personas: "",
                costo: "",
              }
            )
          }
          className="w-10 h-10 border rounded text-green-600 font-bold"
        >
          +
        </button>

        {/* FLETE */}
        <div className="col-span-2">
          <h4 className="font-semibold mb-2">
            Uso del flete
          </h4>

          {form.flete.map((f, i) => (
            <div
              key={i}
              className="flex gap-2"
            >
              <Input
                label="Vueltas"
                type="number"
                value={f.vueltas}
                onChange={(v) => {
                  const arr = [
                    ...form.flete,
                  ];

                  arr[i].vueltas = v;

                  setForm((prev) => ({
                    ...prev,
                    flete: arr,
                  }));
                }}
              />

              <Input
                label="Costo"
                type="number"
                value={f.costo}
                onChange={(v) => {
                  const arr = [
                    ...form.flete,
                  ];

                  arr[i].costo = v;

                  setForm((prev) => ({
                    ...prev,
                    flete: arr,
                  }));
                }}
              />

              <Input
                label="Total"
                readOnly
                value={formatBs(
                  Number(f.vueltas || 0) *
                    Number(f.costo || 0)
                )}
              />
            </div>
          ))}
        </div>

        {/* TOTAL B */}
        <div className="col-span-2">
          <label className="font-semibold">
            Total (B)
          </label>

          <input
            readOnly
            value={formatBs(totalB)}
            className="border p-2 rounded w-full text-right bg-yellow-100"
          />
        </div>

        {/* DIFERENCIA */}
        <div className="col-span-2">
          <label className="font-semibold">
            Diferencia (A - B)
          </label>

          <input
            readOnly
            value={formatBs(diferencia)}
            className="border p-2 rounded w-full text-right bg-yellow-100"
          />
        </div>
      </div>
    </Section>
  );
}

