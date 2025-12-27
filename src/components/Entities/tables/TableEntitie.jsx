import React, { useState, useEffect } from "react";
import { useEntidadStore } from "../../../zustand/useEntidadStore";
import EntitieRow from "./EntitieRow";
import Pagination from "./pagination";
import SearchBar from "../search/SearchBar";
import EntitieFormPanel from "../form/EntitieFormPanel";

export default function TableEntitie() {
  const { entidades = [], loading, error, fetchEntidades } = useEntidadStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [openPanel, setOpenPanel] = useState(false);
  const [entitieToEdit, setEntitieToEdit] = useState(null);

  useEffect(() => {
    fetchEntidades();
  }, [fetchEntidades]);

  const handleEdit = (entitie) => {
    setEntitieToEdit(entitie);
    setOpenPanel(true);
  };

  const filteredEntidades = (entidades || []).filter((e) => {
    const term = search.toLowerCase();
    return (
      e?.facultad?.toLowerCase().includes(term) ||
      e?.carrera?.toLowerCase().includes(term) ||
      e?.materia?.toLowerCase().includes(term) ||
      e?.sigla?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredEntidades.length / limit);
  const currentEntidades = filteredEntidades.slice(
    (page - 1) * limit,
    page * limit
  );

  if (loading)
    return <div className="p-6 text-center">Cargando entidades...</div>;

  if (error)
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-md p-4">
      {/* Botón crear */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEntitieToEdit(null);
            setOpenPanel(true);
          }}
          className="border border-blue-500 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
        >
          + Registrar Nueva Entidad
        </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              {["ID", "Facultad", "Carrera", "Materia", "Sigla", "Acciones"].map(
                (head) => (
                  <th key={head} className="px-4 py-3 text-left">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {currentEntidades.length > 0 ? (
              currentEntidades.map((entitie) => (
                <EntitieRow
                  key={entitie.id}
                  entitie={entitie}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No se encontraron entidades
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />

      <EntitieFormPanel
        open={openPanel}
        entitie={entitieToEdit}
        onClose={() => {
          setOpenPanel(false);
          setEntitieToEdit(null);
        }}
      />
    </div>
  );
}





