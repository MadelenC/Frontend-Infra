
import React from "react";
import Input from "./Input";

export default function ArrayInput({
  title,
  array,
  onChange,
  total,
}) {
  return (
    <div className="border p-2 rounded space-y-2">
      <h4 className="font-semibold dark:text-gray-300">
        {title}
      </h4>

      {array.map((item, i) => (
        <div key={i} className="flex gap-2">

          {Object.keys(item).map((key) => {
            let label = "";

            if (title.includes("Peajes")) {
              if (key === "nro")
                label = "Nro. Peajes";

              if (key === "precio")
                label = "Precio";
            }

            if (title.includes("ciudad")) {
              if (key === "dias")
                label = "Nro. días";

              if (key === "precio")
                label = "Precio día";
            }

            return (
              <Input
                key={key}
                label={label}
                type="number"
                value={item[key] || ""}
                onChange={(v) =>
                  onChange(i, key, v)
                }
              />
            );
          })}
        </div>
      ))}

      <div>
        <label className="font-semibold dark:text-gray-300">
          Total
        </label>

        <input
          readOnly
          value={total}
          className="border p-2 rounded w-full text-right bg-yellow-100"
        />
      </div>
    </div>
  );
}

