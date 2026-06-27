export const formatChartData = (data = []) => {
  const meses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];

  const result = meses.map((mes) => ({
    mes,
    gasolina: 0,
    diesel: 0,
    gastoGasolina: 0,
    gastoDiesel: 0,
  }));

  if (!Array.isArray(data)) return result;

  data.forEach((item) => {
    const index = Number(item.mes) - 1;
    const combustible = String(item.combustible || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (index < 0 || index >= result.length) return;

    if (combustible === "gasolina") {
      result[index].gasolina += Number(item.litros || 0);
      result[index].gastoGasolina += Number(item.gasto || 0);
    }

    if (combustible === "diesel") {
      result[index].diesel += Number(item.litros || 0);
      result[index].gastoDiesel += Number(item.gasto || 0);
    }
  });

  return result;
};
