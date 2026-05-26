import React from "react";

import {
  Document,
  Page,
  View,
  Text,
} from "@react-pdf/renderer";

export default function ReturnsReportPDF({
  data = [],
}) {

  const fechaActual =
    new Date().toLocaleDateString("es-BO");

  return (

    <Document>

      <Page
        size="A4"
        style={{
          padding: 25,
          fontSize: 8,
        }}
      >

     
        <View
          style={{
            alignItems: "center",
            marginBottom: 15,
          }}
        >

          <Text
            style={{
              fontSize: 11,
              fontWeight: "bold",
            }}
          >
            UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
          </Text>

          <Text
            style={{
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            DEPARTAMENTO DE INFRAESTRUCTURA
          </Text>

          <Text
            style={{
              fontSize: 9,
              fontWeight: "bold",
            }}
          >
            SECCIÓN MECÁNICA AUTOMOTRIZ
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            LISTA DE DEVOLUCIONES
          </Text>

          <Text
            style={{
              marginTop: 4,
              fontSize: 8,
            }}
          >
            {fechaActual}
          </Text>

        </View>

        {/* TABLA */}

        <View
          style={{
            border: 1,
            width: "100%",
          }}
        >

          {/* CABECERA */}

          <View
            style={{
              flexDirection: "row",
              borderBottom: 1,
              backgroundColor: "#d9d9d9",
            }}
          >

            <View style={{ width: "6%", borderRight: 1, padding: 4 }}>
              <Text style={{ fontSize: 7, fontWeight: "bold", textAlign: "center" }}>
                #
              </Text>
            </View>

            <View style={{ width: "14%", borderRight: 1, padding: 4 }}>
              <Text style={{ fontSize: 7, fontWeight: "bold" }}>
                Serial
              </Text>
            </View>

            <View style={{ width: "14%", borderRight: 1, padding: 4 }}>
              <Text style={{ fontSize: 7, fontWeight: "bold" }}>
                Fecha
              </Text>
            </View>

            <View style={{ width: "22%", borderRight: 1, padding: 4 }}>
              <Text style={{ fontSize: 7, fontWeight: "bold" }}>
                Nombre
              </Text>
            </View>

            <View style={{ width: "10%", borderRight: 1, padding: 4 }}>
              <Text style={{ fontSize: 7, fontWeight: "bold", textAlign: "center" }}>
                Cantidad
              </Text>
            </View>

            <View style={{ width: "22%", borderRight: 1, padding: 4 }}>
              <Text style={{ fontSize: 7, fontWeight: "bold" }}>
                Detalle
              </Text>
            </View>

            <View style={{ width: "12%", padding: 4 }}>
              <Text style={{ fontSize: 7, fontWeight: "bold" }}>
                Vehículo
              </Text>
            </View>

          </View>

          {/* FILAS */}

          {
            data.map((item, index) => (

              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  borderBottom: 1,
                }}
              >

                <View style={{ width: "6%", borderRight: 1, padding: 4 }}>
                  <Text style={{ fontSize: 7, textAlign: "center" }}>
                    {index + 1}
                  </Text>
                </View>

                <View style={{ width: "14%", borderRight: 1, padding: 4 }}>
                  <Text style={{ fontSize: 7 }}>
                    {item.serial || "-"}
                  </Text>
                </View>

                <View style={{ width: "14%", borderRight: 1, padding: 4 }}>
                  <Text style={{ fontSize: 7 }}>
                    {item.fecha || "-"}
                  </Text>
                </View>

                <View style={{ width: "22%", borderRight: 1, padding: 4 }}>
                  <Text style={{ fontSize: 7 }}>
                    {item.nombre || "-"}
                  </Text>
                </View>

                <View style={{ width: "10%", borderRight: 1, padding: 4 }}>
                  <Text style={{ fontSize: 7, textAlign: "center" }}>
                    {item.cantidad || "-"}
                  </Text>
                </View>

                <View style={{ width: "22%", borderRight: 1, padding: 4 }}>
                  <Text style={{ fontSize: 7 }}>
                    {item.detalle || "-"}
                  </Text>
                </View>

                <View style={{ width: "12%", padding: 4 }}>

              <Text style={{ fontSize: 7 }}>
                {
                  item.mecanico?.solicitud?.vehiculo
                    ? `${item.mecanico.solicitud.vehiculo.tipog} - ${item.mecanico.solicitud.vehiculo.placa}`
                    : "-"
                }
              </Text>

            </View>

              </View>

            ))
          }

        </View>



        <View
          style={{
            marginTop: 25,
            alignItems: "center",
          }}
        >

          <Text
            style={{
              fontSize: 8,
            }}
          >
            Sr. TUS. DIEGO ARMANDO CONDORI MACHACA
          </Text>

          <Text
            style={{
              marginTop: 4,
              fontSize: 7,
            }}
          >
            Sistema Web Departamento de Infraestructura U.A.T.F.
          </Text>

        </View>

      </Page>

    </Document>

  );

}