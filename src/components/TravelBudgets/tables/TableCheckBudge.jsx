import React, { useEffect, useState } from "react";

import CheckBudgetTable from "./CheckBudgetTable";
import CheckBudgetSearch from "../search/SearchBar";
import Pagination from "./Pagination";
import CheckBudgetForm from "../form/CheckBudgetForm";

import { useTravelBudgetsStore } from "../../../zustand/useTravelBudgetsStore";
import { useUserStore } from "../../../zustand/userStore";
import { useVehicleStore } from "../../../zustand/useVehicleStore";

export default function TableCheckBudget() {

  const {
    budgets,
    fetchBudgets,
    loading,
    error,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
  } = useTravelBudgetsStore();

  const {
    fetchAllChoferes,
    fetchAllEncargados,
  } = useUserStore();

  const {
    fetchAllVehicles,
  } = useVehicleStore();

  
  const [searchLocal, setSearchLocal] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const [choferes, setChoferes] = useState([]);
  const [encargados, setEncargados] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);


  useEffect(() => {
    fetchBudgets();
  }, [page]);

  
  useEffect(() => {
    const loadData = async () => {

      const drivers = await fetchAllChoferes();
      const managers = await fetchAllEncargados();
      const allVehicles = await fetchAllVehicles();

      setChoferes(drivers);
      setEncargados(managers);
      setVehiculos(allVehicles);
    };

    loadData();

  }, []);

  useEffect(() => {
  const delay = setTimeout(() => {
    setSearch(searchLocal); 
    setPage(1);
  }, 400);

  return () => clearTimeout(delay);
}, [searchLocal]);

 

  // ENRIQUECER DATOS
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

  // LOADING
  if (loading) {
    return (
      <div className="p-4 text-center">
        Cargando presupuestos...
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md p-4">

      {/* SEARCH */}
      <div className="h-10 w-64 mb-4">
        <CheckBudgetSearch
          search={searchLocal}
          setSearch={setSearchLocal}
        />
      </div>

      {/* TABLE */}
      <CheckBudgetTable
        budgets={enrichedBudgets}
        onEdit={(budget) => {
          setSelectedBudget(budget);
          setOpenForm(true);
        }}
      />

      {/* PAGINATION */}
      {budgets.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      )}

      {/* MODAL */}
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