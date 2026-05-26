import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function JobReportSection({
  item,
}) {

  const accesorios =
    item.accesorios?.map(
      (a) => a.solicitud1
    ).join(", ") || "-";

  return (

    <View
      style={{
        border: 1,
        marginBottom: 8,
      }}
    >

      {/* HEADER */}

      <View
        style={{
          borderBottom: 1,
          paddingVertical: 3,
          alignItems: "center",
        }}
      >

        <Text
          style={{
            fontSize: 9,
            fontWeight: "bold",
          }}
        >
          "U.A.T.F." DEPTO. DE INFRAESTRUCTURA
        </Text>

        <Text
          style={{
            fontSize: 9,
            fontWeight: "bold",
          }}
        >
          SOLICITUD DE TRABAJO INTERNO
        </Text>

        <Text
          style={{
            fontSize: 7,
          }}
        >
          Mecánica Automotriz
        </Text>

      </View>

      {/* SISTEMA */}

      <View
        style={{
          alignItems: "center",
          marginTop: 2,
          marginBottom: 4,
        }}
      >

        <Text
          style={{
            fontSize: 6,
          }}
        >
          Sistema Web Departamento de Infraestructura U.A.T.F.
        </Text>

      </View>

      {/* CUERPO */}

      <View
        style={{
          paddingHorizontal: 6,
          paddingBottom: 6,
        }}
      >

        {/* FILA 1 */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Solicitante:
            </Text>{" "}
            {item.chofer || "-"}
          </Text>

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Fecha:
            </Text>{" "}
            {item.fecha || "-"}
          </Text>

         <Text style={{ fontSize: 7 }}>
          <Text style={{ fontWeight: "bold" }}>
            Km:
          </Text>{" "}
          {item.vehiculo?.modelos?.[0]?.kilometraje || "-"}
        </Text>

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Sol.M#:
            </Text>{" "}
            {item.id || "-"}
          </Text>

        </View>

        {/* FILA 2 */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Movilidad:
            </Text>{" "}
            {item.vehiculo?.tipog || "-"}
          </Text>

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Placa:
            </Text>{" "}
            {item.vehiculo?.placa || "-"}
          </Text>

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Recepción:
            </Text>{" "}
            P/....../....../......
          </Text>

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Hora:
            </Text>{" "}
            ......:......
          </Text>

        </View>

        {/* ACCESORIOS */}

        <View
          style={{
            marginBottom: 4,
          }}
        >

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Accesorios:
            </Text>{" "}
            {accesorios}
          </Text>

        </View>

        {/* DESCRIPCION */}

        <View
          style={{
            minHeight: 28,
          }}
        >

          <Text style={{ fontSize: 7 }}>
            <Text style={{ fontWeight: "bold" }}>
              Descripción del trabajo a realizar:
            </Text>{" "}
            {item.descripsoli || "-"}
          </Text>

        </View>

      </View>

      {/* FIRMAS */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 18,
          paddingBottom: 8,
          marginTop: 10,
        }}
      >

        {/* IZQUIERDA */}

        <View
          style={{
            alignItems: "center",
            width: "40%",
          }}
        >

          <Text
            style={{
              fontSize: 7,
            }}
          >
            ____________________
          </Text>

          <Text
            style={{
              fontSize: 6,
              marginTop: 2,
            }}
          >
            Lic. Carlos F. Mamani Arroyo
          </Text>

          <Text
            style={{
              fontSize: 6,
            }}
          >
            Enc. Automotores
          </Text>

        </View>

        {/* DERECHA */}

        <View
          style={{
            alignItems: "center",
            width: "40%",
          }}
        >

          <Text
            style={{
              fontSize: 7,
            }}
          >
            ____________________
          </Text>

          <Text
            style={{
              fontSize: 6,
              marginTop: 2,
            }}
          >
            Ing. Roger F. Barahona Telchi
          </Text>

          <Text
            style={{
              fontSize: 6,
            }}
          >
            JEFATURA DINF. a.i
          </Text>

        </View>

      </View>

    </View>

  );

}