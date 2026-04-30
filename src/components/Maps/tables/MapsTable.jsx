import { useEffect, useState } from "react";
import SearchBar from "../search/SearchBar";
import TableMaps from "./TableMaps";
import Pagination from "./Paginations";
import { useMapsStore } from "../../../zustand/useMapsStore";
import ModalMap from "./ModalMap";

export default function MapsTable() {
  const {
    maps,
    totalPages,
    fetchMaps,
    loading,
    error,
    page,
    setPage,
  } = useMapsStore();

  const [modalItem, setModalItem] = useState(null);
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");

  useEffect(() => {
    fetchMaps();
  }, [page]);

 
  const filteredMaps = maps.filter((m) =>
    (
      (m.titulo || "").toLowerCase().includes(search.toLowerCase()) ||
      (m.destino || "").toLowerCase().includes(search.toLowerCase())
    ) &&
    (estadoFilter === "" || m.estado === estadoFilter)
  );

  if (loading)
    return <div className="p-4 text-center">Cargando mapas...</div>;

  if (error)
    return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white dark:bg-white/[0.03] p-4 rounded-xl shadow">

      {/* SEARCH */}
      <div className="mb-4 w-64">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </div>
      {/* TABLE */}
      <TableMaps data={filteredMaps} openModal={setModalItem} />

      {/* PAGINATION */}
      {maps.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      )}

      {/* MODAL */}
      {modalItem && (
        <ModalMap
          lat={modalItem.lat}
          lng={modalItem.lng}
          destino={modalItem.destino}
          onClose={() => setModalItem(null)}
        />
      )}
    </div>
  );
}