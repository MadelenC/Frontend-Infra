import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaEye, FaEllipsisV, FaTrash, FaBroom } from "react-icons/fa";
import AddExceptionForm from "../form/Excep/AddExceptionForm";

export default function TravelRow({ entitie }) {
  const [openExcepciones, setOpenExcepciones] = useState(false);
  const [openOperaciones, setOpenOperaciones] = useState(false);
  const [openAddExceptionForm, setOpenAddExceptionForm] = useState(false);

  const refExcepciones = useRef(null);
  const refOperaciones = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refExcepciones.current && !refExcepciones.current.contains(event.target))
        setOpenExcepciones(false);
      if (refOperaciones.current && !refOperaciones.current.contains(event.target))
        setOpenOperaciones(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = () => {
    setOpenAddExceptionForm(true);
    setOpenExcepciones(false);
  };

  const handleView = () => {
    console.log("Ver excepción:", entitie);
    setOpenExcepciones(false);
  };

  const handleMostrar = () => { console.log("Mostrar:", entitie); setOpenOperaciones(false); };
  const handleInsertar = () => { console.log("Insertar:", entitie); setOpenOperaciones(false); };
  const handleLimpiar = () => { console.log("Limpiar:", entitie); setOpenOperaciones(false); };
  const handleEliminar = () => { console.log("Eliminar:", entitie); setOpenOperaciones(false); };

  return (
    <>
      <tr className="transition-colors hover:bg-gray-100">
        <td className="px-3 py-2">{entitie.id}</td>
        <td className="px-3 py-2">{entitie.chofer}</td>
        <td className="px-3 py-2">{entitie.tipoA}</td>
        <td className="px-3 py-2">{entitie.tipoB}</td>
        <td className="px-3 py-2">{entitie.tipoC}</td>
        <td className="px-3 py-2">{entitie.cantidad}</td>

        {/* Excepciones */}
        <td className="text-center relative" ref={refExcepciones}>
          <button
            onClick={() => setOpenExcepciones(!openExcepciones)}
            className="bg-sky-500 text-white text-xs px-2 py-0.5 rounded hover:bg-sky-600"
          >
            Añadir
          </button>
          {openExcepciones && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-28 bg-white border rounded-md shadow-lg z-50">
              <button
                onClick={handleAdd}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-1"
              >
                <FaPlus size={12} /> Añadir
              </button>
              <button
                onClick={handleView}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-1"
              >
                <FaEye size={12} /> Ver
              </button>
            </div>
          )}
        </td>

        <td className="px-3 py-2">{entitie.fecha}</td>

        {/* Operaciones */}
        <td className="text-center relative" ref={refOperaciones}>
          <button
            onClick={() => setOpenOperaciones(!openOperaciones)}
            className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 flex items-center gap-1"
          >
            Opciones <FaEllipsisV size={12} />
          </button>

          {openOperaciones && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 bg-white border rounded-md shadow-lg z-50">
              <button
                onClick={handleMostrar}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2"
              >
                <FaEye /> Mostrar
              </button>
              <button
                onClick={handleInsertar}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2"
              >
                <FaPlus /> Insertar
              </button>
              <button
                onClick={handleLimpiar}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2"
              >
                <FaBroom /> Limpiar
              </button>
              <button
                onClick={handleEliminar}
                className="w-full px-3 py-1.5 text-xs text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* Modal de Insertar Excepción */}
      {openAddExceptionForm && (
        <AddExceptionForm
          travel={entitie}
          onClose={() => setOpenAddExceptionForm(false)}
          onAdd={(data) => console.log("Excepción agregada:", data)}
        />
      )}
    </>
  );
}







