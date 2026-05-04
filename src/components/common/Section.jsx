import React from "react";

export default function Section({
  title,
  children,
  collapsed,
  toggle,
}) {
  return (
    <div className="border rounded p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <h3 className="font-semibold text-lg dark:text-gray-300">
          {title}
        </h3>

        <span className="dark:text-gray-300 dark:hover:text-gray-700">
          {collapsed ? "+" : "-"}
        </span>
      </div>

      {!collapsed && (
        <div className="mt-2">{children}</div>
      )}
    </div>
  );
}