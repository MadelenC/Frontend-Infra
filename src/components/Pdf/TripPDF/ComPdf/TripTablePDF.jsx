import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

import { styles } from "../../common";

export default function TripsReportTablePDF({
  trips,
}) {

  const totalCombustible = trips.reduce(
    (acc, t) => acc + Number(t.combustible || 0),
    0
  );

  const totalPrecio = trips.reduce(
    (acc, t) => acc + Number(t.precioTotal || 0),
    0
  );

  const totalPasajeros = trips.reduce(
    (acc, t) => acc + Number(t.pasajeros || 0),
    0
  );

  const totalViajes = trips.reduce(
    (acc, t) => acc + Number(t.nroViajes || 0),
    0
  );

  return (

    <View style={styles.table}>

      {/* HEADER */}
      <View style={styles.row}>

        <Text style={[styles.cell, styles.headerCell, { width: "5%" }]}>
          Nro
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "20%" }]}>
          Vehículo
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "18%" }]}>
          Conductor
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "10%" }]}>
          Km Total
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "10%" }]}>
          Combustible
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "8%" }]}>
          Precio
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "12%" }]}>
          Precio Total
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "8%" }]}>
          Pasajeros
        </Text>

        <Text style={[styles.cell, styles.headerCell, { width: "9%" }]}>
          Viajes
        </Text>

      </View>

      {/* FILAS */}
      {trips.map((trip, index) => (

        <View
          key={trip.id}
          style={styles.row}
        >

          <Text style={[styles.cell, { width: "5%" }]}>
            {index + 1}
          </Text>

          <Text style={[styles.cell, { flex: 1.5 }]}>
            {
              trip.vehicleTravels
                ?.map(v => v.vehiculo?.placa)
                .join(", ")
            }
          </Text>

          <Text style={[styles.cell, { flex: 1.5 }]}>
            {
              trip.userTravels
                ?.filter(u => u.user?.tipo === "chofer")
                .map(u =>
                  `${u.user?.nombres || ""} ${u.user?.apellidos || ""}`
                )
                .join(", ")
            }
          </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
          {trip.rutas?.[0]?.total || "0"}
        </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
            {
              trip.presupuestos
                ?.reduce(
                  (acc, p) => acc + Number(p.total1C || 0),
                  0
                )
                .toFixed(2)
            }
          </Text>

          <Text style={[styles.cell, { width: "10%" }]}>
            {
              trip.presupuestos
                ?.reduce(
                  (acc, p) => acc + Number(p.precio1 || 0),
                  0
                )
                .toFixed(2)
            }
          </Text>

          <Text style={[styles.cell, { width: "12%" }]}>
            {trip.precioTotal}
          </Text>

          <Text style={[styles.cell, { width: "8%" }]}>
            {trip.pasajeros}
          </Text>

          <Text style={[styles.cell, { width: "9%" }]}>
            {trip.nroViajes}
          </Text>

        </View>

      ))}

      {/* TOTAL */}
      <View style={styles.row}>

        <Text
          style={[
            styles.cell,
            {
              width: "53%",
              fontWeight: "bold",
            },
          ]}
        >
          TOTAL
        </Text>

        <Text style={[styles.cell, { width: "10%" }]}>
          {totalCombustible}
        </Text>

        <Text style={[styles.cell, { width: "8%" }]}>
          -
        </Text>

        <Text style={[styles.cell, { width: "12%" }]}>
          {totalPrecio.toFixed(2)} Bs.
        </Text>

        <Text style={[styles.cell, { width: "8%" }]}>
          {totalPasajeros}
        </Text>

        <Text style={[styles.cell, { width: "9%" }]}>
          {totalViajes}
        </Text>

      </View>

    </View>
  );
}