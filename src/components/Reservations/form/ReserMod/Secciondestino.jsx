import React, { useMemo, useCallback, useRef, useEffect } from "react";

function SeccionDestinos({
  formData,
  setFormData,
  destinos = [],
  searchDestino,
  setSearchDestino,
  openDestinoIndex,
  setOpenDestinoIndex,
  errors = {},
  setErrors
}) {
  const listaDestinos = formData?.destinos ?? [];
  const containerRef = useRef(null);


  const seleccionarDestino = useCallback((i, dest) => {
    const nuevos = [...listaDestinos];

      nuevos[i] = {
      id: dest.id,
      nombre: `(${dest.departamentoInicio}) ${dest.origen} → ${dest.destino}`,
      km: dest.distancia || ""
    };

    setFormData(prev => ({ ...prev, destinos: nuevos }));
    setOpenDestinoIndex(null);
    setSearchDestino("");


    if (setErrors) {
      if (!dest.nombre) {
        setErrors(prev => ({
          ...prev,
          [`destino_nombre_${i}`]: "Seleccione un destino"
        }));
      } else {
        setErrors(prev => {
          const copy = { ...prev };
          delete copy[`destino_nombre_${i}`];
          return copy;
        });
      }
    }
  }, [listaDestinos, setFormData, setOpenDestinoIndex, setSearchDestino, setErrors]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDestinoIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenDestinoIndex]);


    const agregarDestino = () => {
    setFormData(prev => ({
      ...prev,
      destinos: [
        ...(prev.destinos ?? []),
        { id: "", nombre: "", km: "" }
      ]
    }));
  };

  const eliminarDestino = (index) => {
    setFormData(prev => ({
      ...prev,
      destinos: prev.destinos.filter((_, i) => i !== index)
    }));
    if (setErrors) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[`destino_nombre_${index}`];
        delete copy[`destino_km_${index}`];
        return copy;
      });
    }
  };


  const destinosFiltrados = useMemo(() => {
    if (!searchDestino) return destinos.slice(0, 50);

    const texto = searchDestino.toLowerCase();
    return destinos
      .filter(dest => {
        const label = `${dest.departamentoInicio} ${dest.origen} ${dest.destino}`;
        return label.toLowerCase().includes(texto);
      })
      .slice(0, 50);
  }, [searchDestino, destinos]);


  const totalKm = useMemo(() => {
    const kmDestinos = listaDestinos.reduce(
      (acc, d) => acc + Number(d.km || 0),
      0
    );
    return kmDestinos + Number(formData.kmAdicional || 0);
  }, [listaDestinos, formData.kmAdicional]);

  return (
    <div
      ref={containerRef}
      className="bg-white p-4 rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700"
    >
      <h3 className="text-md font-semibold mb-3 border-b pb-1">Destinos</h3>

      {listaDestinos.map((d, i) => {
        const isOpen = openDestinoIndex === i;

        return (
          <div key={i} className="flex gap-2 items-start mb-2 relative">
            {/* INPUT DESTINO */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar destino..."
                value={isOpen ? searchDestino : d.nombre || ""}
                onClick={() => {
                  setOpenDestinoIndex(i);
                  setSearchDestino("");
                }}
                onChange={(e) => {
                  setSearchDestino(e.target.value);
                  setOpenDestinoIndex(i);
                }}
                onBlur={() => {
                  // Validar al perder foco
                  if (setErrors && !d.nombre) {
                    setErrors(prev => ({
                      ...prev,
                      [`destino_nombre_${i}`]: "Seleccione un destino"
                    }));
                  }
                }}
                className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200"
              />

              {/* DROPDOWN */}
              {isOpen && (
                <div className="absolute z-50 bg-white border w-full max-h-40 overflow-auto shadow rounded-md dark:bg-gray-700">
                  {destinosFiltrados.map((dest, idx) => (
                    <div
                      key={idx}
                      onClick={() => seleccionarDestino(i, dest)}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      ({dest.departamentoInicio}) {dest.origen} → {dest.destino}
                    </div>
                  ))}
                </div>
              )}

              {/* Error destino */}
              {errors[`destino_nombre_${i}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`destino_nombre_${i}`]}
                </p>
              )}
            </div>

            {/* KM */}
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="Km"
                value={d.km}
                onChange={(e) => {
                  const nuevos = [...listaDestinos];
                  nuevos[i].km = e.target.value;
                  setFormData(prev => ({ ...prev, destinos: nuevos }));

                  // Validar al cambiar
                  if (setErrors) {
                    if (!e.target.value || Number(e.target.value) <= 0) {
                      setErrors(prev => ({
                        ...prev,
                        [`destino_km_${i}`]: "Km inválido"
                      }));
                    } else {
                      setErrors(prev => {
                        const copy = { ...prev };
                        delete copy[`destino_km_${i}`];
                        return copy;
                      });
                    }
                  }
                }}
              className="w-20 border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 dark:text-white"
              />
              {errors[`destino_km_${i}`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`destino_km_${i}`]}
                </p>
              )}
            </div>

            {/* ELIMINAR DESTINO */}
            <button
              type="button"
              onClick={() => eliminarDestino(i)}
              className="text-red-500 text-sm px-2 mt-1"
            >
              X
            </button>
          </div>
        );
      })}

      {/* AGREGAR DESTINO */}
      <button
        type="button"
        onClick={agregarDestino}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
      >
        + Añadir destino
      </button>

      {/* KM ADICIONAL + TOTAL KM */}
      <div className="mt-4 grid grid-cols-2 gap-3 items-end">
        <div>
          <label className="text-sm font-semibold">Km adicional</label>
          <input
            type="number"
            value={formData.kmAdicional || ""}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, kmAdicional: e.target.value }))
            }
            className="w-full border px-3 py-1.5 rounded text-sm dark:bg-gray-200/40 dark:border-gray-200 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Total Km</label>
          <div className="w-full border px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-600 text-center font-bold text-blue-700 dark:text-white">
            {totalKm}
          </div>
        </div>
      </div>

      {/* Error mínimo 2 destinos */}
      {errors.destinos && (
        <p className="text-red-500 text-xs mt-1">{errors.destinos}</p>
      )}
    </div>
  );
}

export default React.memo(SeccionDestinos);