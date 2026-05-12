import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function SectionCard({
  title,
  children,
  defaultOpen = true,
}) {

  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition"
      >

        <h3 className="font-bold text-lg text-gray-700">
          {title}
        </h3>

        {open ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}

      </button>

      {/* CONTENT */}
      {open && (
        <div className="p-5">
          {children}
        </div>
      )}

    </div>
  );
}