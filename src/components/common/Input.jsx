import React from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  readOnly,
  error,
  colSpan = 1,
  className = "",
}) {
  return (
    <div className={`col-span-${colSpan}`}>
      <label className="block text-sm font-medium dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        min={type === "number" ? "0" : undefined}
        maxLength={label === "Nota" ? 300 : undefined}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={(e) => onBlur?.(e.target.value)}
        readOnly={readOnly}
        className={`border p-2 rounded w-full dark:bg-gray-200/40 dark:border-gray-200 dark:text-gray-200 ${
          readOnly ? "bg-gray-100" : ""
        } ${error ? "border-red-500" : ""} ${className}`}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}