import React from "react";
import UserRow from "./UserRow";

export default function UserTable({ users }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
          <tr>
            {["ID", "Nombres", "Apellidos", "Cédula", "Celular", "Tipo", "Cargo", "Acciones"].map((head) => (
              <th
                key={head}
                className="px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-200"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => <UserRow key={`user-${user.id}-${index}`} user={user} />)
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
