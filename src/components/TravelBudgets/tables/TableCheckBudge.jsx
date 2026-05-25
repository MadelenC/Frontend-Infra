import React, { useEffect, useState } from "react";

import CheckBudgetTable from "./CheckBudgetTable";
import CheckBudgetSearch from "../search/SearchBar";
import Pagination from "./Pagination";
import CheckBudgetForm from "../form/CheckBudgetForm";

import { useTravelBudgetsStore } from "../../../zustand/useTravelBudgetsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";
import { useDebounce } from "../../../hooks/useDebounce";

export default function TableCheckBudget() {

  const {
    budgets,
    fetchBudgets,
    loading,
    error,
    page,
    setPage,
    totalPages,
  } = useTravelBudgetsStore();

  const { fetchAllChoferes, fetchAllEncargados,} = useUserStore();
  const { fetchAllVehicles } = useVehicleStore();

  
  const [searchLocal, setSearchLocal] = useState("");
   const debouncedSearch = useDebounce(searchLocal, 400);

  const [openForm, setOpenForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const [choferes, setChoferes] = useState([]);
  const [encargados, setEncargados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  
useEffect(() => {
  if (!openForm) return;

  const loadData = async () => {
    const drivers = await fetchAllChoferes();
    const managers = await fetchAllEncargados();
    const allVehicles = await fetchAllVehicles();

    setChoferes(drivers);
    setEncargados(managers);
    setVehiculos(allVehicles);
  };

  loadData();
}, [openForm]);

 useEffect(() => {
  fetchBudgets(page, debouncedSearch);
}, [page, debouncedSearch]);

useEffect(() => {
  setPage(1);
}, [debouncedSearch]);

  const enrichedBudgets = (budgets || []).map((b) => {
    return {
      ...b,

      choferNombre: b.chofer
        ? `${b.chofer.nombres} ${b.chofer.apellidos}`
        : "Sin chofer",

      vehiculoNombre: b.vehiculo
        ? `${b.vehiculo.tipog} - ${b.vehiculo.placa}`
        : "Sin vehículo",
    };
  });

  {loading && (
  <div className="text-sm text-gray-500 animate-pulse mb-2">
    Buscando...
  </div>
)}

 
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      <div className="h-10 w-64 mb-4">
        <CheckBudgetSearch
          search={searchLocal}
          setSearch={setSearchLocal}
        />
      </div>

    
      <CheckBudgetTable
        budgets={enrichedBudgets}
        onEdit={(budget) => {
          setSelectedBudget(budget);
          setOpenForm(true);
        }}
      />

      {budgets.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      )}

  
      {openForm && (
        <CheckBudgetForm
          data={selectedBudget}
          onClose={() => setOpenForm(false)}
          choferes={choferes}
          encargados={encargados}
          vehiculos={vehiculos}
        />
      )}
    </div>
  );
}