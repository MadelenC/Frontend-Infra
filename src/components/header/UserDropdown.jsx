import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../zustand/AuthUsers";


export default function UserDropdown() {
  const navigate = useNavigate();
  const { user, logout } = useUserStore(); // obtenemos user y logout del store
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={toggleDropdown}
        style={{
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        {/* Mostramos  nombre si existen, sino un placeholder */}
        <span>{user ? `${user.nombres || "Usuario"} ${user.apellidos}` : "Usuario"}</span>
      </button>

      {isOpen && (
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: "8px 0",
            marginTop: "4px",
            minWidth: "150px",
            zIndex: 1000,
          }}
        >
          <p style={{ padding: "8px 12px", margin: 0, cursor: "default" }}>
            Perfil
          </p>
          <p
            style={{
              padding: "8px 12px",
              margin: 0,
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => {
              logout(); // limpiar sesión
              setIsOpen(false); // cerrar dropdown
              navigate("/signin"); // redirigir a signin
            }}
          >
            Cerrar sesión
          </p>
        </div>
      )}
    </div>
  );
}
