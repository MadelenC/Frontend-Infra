export const calcularKmTotal = (destinos = [], kmAdicional = 0) => {
  const totalDestinos = destinos.reduce((acc, d) => {
    return acc + (parseFloat(d.km) || 0);
  }, 0);

  return totalDestinos + (parseFloat(kmAdicional) || 0);
};