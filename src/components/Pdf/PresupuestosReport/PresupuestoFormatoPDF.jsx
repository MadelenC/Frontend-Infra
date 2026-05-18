import React from "react";
import {
  Document,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "./PresupuestoStyles";

const safe = (v) => {

  if (
    v === null ||
    v === undefined ||
    v === ""
  ) {
    return "-";
  }

  return String(v);

};

export default function PresupuestoPDF({ data }) {

  const item = data;

  if (!item) {
    return (
      <Document>
        <Page size="A4">
          <Text>No hay datos</Text>
        </Page>
      </Document>
    );
  }

        console.log("ITEM =>", item);
        console.log("RUTAS =>", item.rutas);

        const rutas =
          Array.isArray(item.rutas)
            ? item.rutas
            : [];

       

        const detalles = [

          {
            cantidad:
              item.combustible?.cantidad || "-",

            unidad:
              "Litros",

            descripcion:
              "Combustible",

            precio:
              item.combustible?.precio || "-",

            total:
              item.combustible?.total || "-",
          },

          {
            cantidad:
              item.viaticos?.ciudad?.cantidad || "-",

            unidad:
              "Día",

            descripcion:
              "Viático Ciudad",

            precio:
              item.viaticos?.ciudad?.precio || "-",

            total:
              item.viaticos?.ciudad?.total || "0.00",
          },

          {
            cantidad:
              item.viaticos?.provincia?.cantidad || "-",

            unidad:
              "Día",

            descripcion:
              "Viático Provincia",

            precio:
              item.viaticos?.provincia?.precio || "-",

            total:
              item.viaticos?.provincia?.total || "0.00",
          },

          {
            cantidad:
              item.viaticos?.frontera?.cantidad || "-",

            unidad:
              "Día",

            descripcion:
              "Viático Frontera",

            precio:
              item.viaticos?.frontera?.precio || "-",

            total:
              item.viaticos?.frontera?.total || "0.00",
          },

          {
            cantidad:
              item.peajes?.cantidad || "-",

            unidad:
              "Global",

            descripcion:
              "Peajes ida y vuelta",

            precio:
              item.peajes?.precio || "-",

            total:
              item.peajes?.total || "-",
          },

          {
            cantidad:
              item.mantenimiento?.cantidad || "-",

            unidad:
              "Global",

            descripcion:
              "Mantenimiento / Lavado / Fumigado / Parchado de llanta",

            precio:
              item.mantenimiento?.precio || "-",

            total:
              item.mantenimiento?.total || "0.00",
          },

          {
            cantidad:
              item.garaje?.cantidad || "-",

            unidad:
              "Global",

            descripcion:
              "Garaje",

            precio:
              item.garaje?.precio || "-",

            total:
              item.garaje?.total || "0.00",
          },

        ];

        return (
        <Document>
          <Page>


            <View style={styles.header}>

              <Text style={styles.title}>
                PRESUPUESTO DE VIAJE
              </Text>

              

            </View>

            {/* ===================================== */}
            {/* DATOS GENERALES */}
            {/* ===================================== */}

            <View style={styles.box}>

              <Text>
                Viaje N°: {safe(item.viaje?.id)}
              </Text>

              <Text>
                Tipo: {safe(item.viaje?.tipo)}
              </Text>

              <Text>
                Entidad: {safe(item.entidad)}
              </Text>

              <Text>
                Objetivo: {safe(item.viaje?.objetivo)}
              </Text>

              <Text>
                Responsable: {safe(item.responsable)}
              </Text>

              <Text>
                Chofer:
                {" "}
                {
                  item.chofer
                    ? `${safe(item.chofer.nombres)} ${safe(item.chofer.apellidos)}`
                    : "-"
                }
              </Text>

              <Text>
                Encargado:
                {" "}
                {
                  item.encargado
                    ? `${safe(item.encargado.nombres)} ${safe(item.encargado.apellidos)}`
                    : "-"
                }
              </Text>

              <Text>
                Vehículo:
                {" "}
                {
                  item.vehiculos &&
                  item.vehiculos.length > 0
                    ? item.vehiculos
                        .map(v =>
                          `${safe(v.placa)} ${safe(v.color)}`
                        )
                        .join(", ")
                    : "-"
                }
              </Text>

              <Text>
                Pasajeros: {safe(item.viaje?.pasajeros)}
              </Text>

              <Text>
                Días: {safe(item.viaje?.dias)}
              </Text>

              <Text>
                Fecha Salida: {safe(item.viaje?.fecha_inicial)}
              </Text>

              <Text>
                Hora Salida: {safe(item.hora_salida)}
              </Text>

              <Text>
                Fecha Llegada: {safe(item.viaje?.fecha_final)}
              </Text>

              <Text>
                Hora Llegada: {safe(item.hora_llegada)}
              </Text>

            </View>

            {/* ===================================== */}
            {/* RUTAS */}
            {/* ===================================== */}

            <View style={styles.table}>

              <View style={styles.row}>

                <Text style={styles.thRuta}>
                  Ruta
                </Text>

                <Text style={styles.thKm}>
                  KM
                </Text>

              </View>

              {rutas.length > 0 ? (

                rutas.map((r, i) => (

                  <View key={i}>

                    {safe(r.destino_id) !== "-" && (

                      <View style={styles.row}>

                        <Text style={styles.tdRuta}>
                          {safe(r.destino_id)}
                        </Text>

                        <Text style={styles.tdKm}>
                          {safe(r.kilometraje_principal)}
                        </Text>

                      </View>

                    )}

                    {safe(r.dest1) !== "-" && (

                      <View style={styles.row}>

                        <Text style={styles.tdRuta}>
                          {safe(r.dest1)}
                        </Text>

                        <Text style={styles.tdKm}>
                          {safe(r.k1)}
                        </Text>

                      </View>

                    )}

                    {safe(r.dest2) !== "-" && (

                      <View style={styles.row}>

                        <Text style={styles.tdRuta}>
                          {safe(r.dest2)}
                        </Text>

                        <Text style={styles.tdKm}>
                          {safe(r.k2)}
                        </Text>

                      </View>

                    )}

                    {safe(r.dest3) !== "-" && (

                      <View style={styles.row}>

                        <Text style={styles.tdRuta}>
                          {safe(r.dest3)}
                        </Text>

                        <Text style={styles.tdKm}>
                          {safe(r.k3)}
                        </Text>

                      </View>

                    )}

                    {safe(r.dest4) !== "-" && (

                      <View style={styles.row}>

                        <Text style={styles.tdRuta}>
                          {safe(r.dest4)}
                        </Text>

                        <Text style={styles.tdKm}>
                          {safe(r.k4)}
                        </Text>

                      </View>

                    )}

                    {safe(r.dest5) !== "-" && (

                      <View style={styles.row}>

                        <Text style={styles.tdRuta}>
                          {safe(r.dest5)}
                        </Text>

                        <Text style={styles.tdKm}>
                          {safe(r.k5)}
                        </Text>

                      </View>

                    )}

                    <View style={styles.row}>

                      <Text style={styles.tdRuta}>
                        RECORRIDO ADICIONAL
                      </Text>

                      <Text style={styles.tdKm}>
                        {safe(r.adicional)}
                      </Text>

                    </View>

                    <View style={styles.row}>

                      <Text style={styles.tdRuta}>
                        RECORRIDO TOTAL
                      </Text>

                      <Text style={styles.tdKm}>
                        {safe(r.total)}
                      </Text>

                    </View>

                  </View>

                ))

              ) : (

                <View style={styles.row}>

                  <Text style={styles.tdRuta}>
                    SIN RUTAS
                  </Text>

                  <Text style={styles.tdKm}>
                    -
                  </Text>

                </View>

              )}

            </View>

            {/* ===================================== */}
            {/* TABLA PRESUPUESTO */}
            {/* ===================================== */}

            <View style={styles.table}>

              <View style={styles.row}>

                <Text style={styles.thCant}>
                  Cant
                </Text>

                <Text style={styles.thUnidad}>
                  Unidad
                </Text>

                <Text style={styles.thDesc}>
                  Descripción
                </Text>

                <Text style={styles.th}>
                  P/U
                </Text>

                <Text style={styles.th}>
                  Total
                </Text>

              </View>

              {detalles.map((d, i) => (

                <View
                  key={i}
                  style={styles.row}
                >

                  <Text style={styles.tdCant}>
                    {safe(d.cantidad)}
                  </Text>

                  <Text style={styles.tdUnidad}>
                    {safe(d.unidad)}
                  </Text>

                  <Text style={styles.tdDesc}>
                    {safe(d.descripcion)}
                  </Text>

                  <Text style={styles.td}>
                    {safe(d.precio)}
                  </Text>

                  <Text style={styles.td}>
                    {safe(d.total)}
                  </Text>

                </View>

              ))}

            </View>

            {/* ===================================== */}
            {/* TOTALES */}
            {/* ===================================== */}

            <View style={styles.box}>

              <Text>
                TOTAL GENERAL: {safe(item.total_general)}
              </Text>

              <Text>
                DIFERENCIA: {safe(item.diferencia)}
              </Text>

              <Text>
                KM TOTAL:
                {" "}
                {
                  rutas.length > 0
                    ? safe(rutas[0].total)
                    : "-"
                }
              </Text>

            </View>

            {/* ===================================== */}
            {/* OTROS DATOS */}
            {/* ===================================== */}

            <View style={styles.box}>

              <Text>
                Materia: {safe(item.materia)}
              </Text>

              <Text>
                Sigla: {safe(item.sigla)}
              </Text>

              <Text>
                N° Docentes: {safe(item.ndocentes)}
              </Text>

            </View>

            {/* ===================================== */}
            {/* NOTA */}
            {/* ===================================== */}

            <View style={styles.box}>

              <Text>
                NOTA:
              </Text>

              <Text>
                {safe(item.nota)}
              </Text>

            </View>

            {/* ===================================== */}
            {/* FIRMA */}
            {/* ===================================== */}

            <View style={styles.signatureContainer}>

              <Text>
                ________________________
              </Text>

              <Text>
                ENCARGADO DE AUTOMOTORES
              </Text>

            </View>

   </Page>

    </Document>

  );

}
