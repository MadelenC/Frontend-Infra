export const buildDetalles = (item) => {

  return [

    {
      cantidad:
        item.cantidad1 || "0",

      unidad:
        "Litros",

      descripcion:
        "Combustible",

      precio:
        item.precio1 || "0",

      total:
        item.total1C || "0",
    },

    {
      cantidad:
        item.cantidad2 || "0",

      unidad:
        "Día",

      descripcion:
        "Viáticos Ciudad",

      precio:
        item.precio2 || "0",

      total:
        item.total2VC || "0",
    },

    {
      cantidad:
        item.cantidad3 || "0",

      unidad:
        "Día",

      descripcion:
        "Viáticos Provincia",

      precio:
        item.precio3 || "0",

      total:
        item.total3VP || "0",
    },

    {
      cantidad:
        item.cantidad4 || "0",

      unidad:
        "Día",

      descripcion:
        "Viáticos Frontera",

      precio:
        item.precio4 || "0",

      total:
        item.total4VF || "0",
    },

    {
      cantidad:
        item.cantidad5 || "0",

      unidad:
        "Global",

      descripcion:
        "Peajes ida y vuelta",

      precio:
        item.precio5 || "0",

      total:
        item.total5P || "0",
    },

    {
      cantidad:
        item.cantidad6 || "0",

      unidad:
        "Global",

      descripcion:
        "Mantenimiento / Lavado / Fumigado / Parchado de Llanta",

      precio:
        item.precio6 || "0",

      total:
        item.total6M || "0",
    },

    {
      cantidad:
        item.cantidad7 || "0",

      unidad:
        "Global",

      descripcion:
        "Garaje",

      precio:
        item.precio7 || "0",

      total:
        item.total7G || "0",
      
    },

  ];

};