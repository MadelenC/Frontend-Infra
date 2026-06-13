const meses = [
  "Ene","Feb","Mar","Abr","May","Jun",
  "Jul","Ago","Sep","Oct","Nov","Dic"
];

export const formatChartData = (data = []) => {
  const meses = [
    "Ene","Feb","Mar","Abr","May","Jun",
    "Jul","Ago","Sep","Oct","Nov","Dic"
  ];

  const result = meses.map((m) => ({
    mes: m,
    gasolina: 0,
    diesel: 0,
  }));

  if (!Array.isArray(data)) return result;

  data.forEach((item) => {
    const index = Number(item.mes) - 1;

    if (item.combustible === "Gasolina") {
      result[index].gasolina = Number(item.litros);
    }

    if (item.combustible === "Diesel") {
      result[index].diesel = Number(item.litros);
    }
  });

  return result;
};