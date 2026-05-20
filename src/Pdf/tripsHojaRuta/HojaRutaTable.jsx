import React from "react";

import {
  View,
  Text,
} from "@react-pdf/renderer";

export default function HojaRutaTable({
  data,
}) {

  return (

    <View
      style={{
        marginTop: 10,
      }}
    >


      <View
        style={{
          marginBottom: 10,
        }}
      >

        <Text
          style={{
            fontSize: 8,
          }}
        >
          <Text style={{
            fontWeight: "bold",
          }}>
            Objetivo:
          </Text>

          {" "}

          {data?.objetivo}

        </Text>

      </View>

    
      {/* TABLA CONDUCTORES */}
   

      <View
        style={{
          border: 1,
          marginBottom: 10,
        }}
      >



        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#ddd",
            borderBottom: 1,
          }}
        >

          <Text style={{
            width: "10%",
            borderRight: 1,
            padding: 4,
            fontSize: 8,
          }}>
            Nro.
          </Text>

          <Text style={{
            width: "70%",
            borderRight: 1,
            padding: 4,
            fontSize: 8,
          }}>
            Nombre del conductor
          </Text>

          <Text style={{
            width: "20%",
            padding: 4,
            fontSize: 8,
          }}>
            Celular
          </Text>

        </View>



        {
          data?.conductores?.map((c, index) => (

            <View
              key={index}
              style={{
                flexDirection: "row",
                borderBottom: 1,
              }}
            >

              <Text style={{
                width: "10%",
                borderRight: 1,
                padding: 4,
                fontSize: 8,
              }}>
                {c.nro}
              </Text>

              <Text style={{
                width: "70%",
                borderRight: 1,
                padding: 4,
                fontSize: 8,
              }}>
                {c.nombreCompleto}
              </Text>

              <Text style={{
                width: "20%",
                padding: 4,
                fontSize: 8,
              }}>
                {c.celular}
              </Text>

            </View>

          ))
        }

      </View>

    
      {/* FECHAS */}
     

      <View
        style={{
          border: 1,
          marginBottom: 15,
        }}
      >

        <View
          style={{
            flexDirection: "row",
            borderBottom: 1,
          }}
        >

          <Text style={{
            width: "25%",
            borderRight: 1,
            padding: 4,
            fontSize: 8,
          }}>
            Fecha Partida:
            {" "}
            {data?.fecha_salida}
          </Text>

          <Text style={{
            width: "25%",
            borderRight: 1,
            padding: 4,
            fontSize: 8,
          }}>
            Hora Partida:
            {" "}
            {data?.hora_salida}
          </Text>

          <Text style={{
            width: "25%",
            borderRight: 1,
            padding: 4,
            fontSize: 8,
          }}>
            Fecha Retorno:
            {" "}
            {data?.fecha_retorno}
          </Text>

          <Text style={{
            width: "25%",
            padding: 4,
            fontSize: 8,
          }}>
            Hora Retorno:
            {" "}
            {data?.hora_llegada}
          </Text>

        </View>

      </View>


      {/* TABLA RUTAS */}
      

      <View
        style={{
          border: 1,
        }}
      >

        {/* HEADER */}

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#ddd",
            borderBottom: 1,
          }}
        >

          <Text style={{
            width: "10%",
            borderRight: 1,
            padding: 4,
            fontSize: 7,
          }}>
            Dpto. Partida
          </Text>

          <Text style={{
            width: "15%",
            borderRight: 1,
            padding: 4,
            fontSize: 7,
          }}>
            Origen
          </Text>

          <Text style={{
            width: "40%",
            borderRight: 1,
            padding: 4,
            fontSize: 7,
          }}>
            Ruta
          </Text>

          <Text style={{
            width: "10%",
            borderRight: 1,
            padding: 4,
            fontSize: 7,
          }}>
            Dpto. Destino
          </Text>

          <Text style={{
            width: "15%",
            borderRight: 1,
            padding: 4,
            fontSize: 7,
          }}>
            Destino
          </Text>

          <Text style={{
            width: "10%",
            padding: 4,
            fontSize: 7,
          }}>
            Tiempo
          </Text>

        </View>

    

        {
          data?.rutas?.map((ruta, index) => (

            <View
              key={index}
              style={{
                flexDirection: "row",
                borderBottom: 1,
              }}
            >

              <Text style={{
                width: "10%",
                borderRight: 1,
                padding: 4,
                fontSize: 7,
              }}>
                {ruta.departamento_inicio}
              </Text>

              <Text style={{
                width: "15%",
                borderRight: 1,
                padding: 4,
                fontSize: 7,
              }}>
                {ruta.origen}
              </Text>

              <Text style={{
                width: "40%",
                borderRight: 1,
                padding: 4,
                fontSize: 7,
              }}>
                {ruta.ruta_texto}
              </Text>

              <Text style={{
                width: "10%",
                borderRight: 1,
                padding: 4,
                fontSize: 7,
              }}>
                {ruta.departamento_destino}
              </Text>

              <Text style={{
                width: "15%",
                borderRight: 1,
                padding: 4,
                fontSize: 7,
              }}>
                {ruta.destino}
              </Text>

              <Text style={{
                width: "10%",
                padding: 4,
                fontSize: 7,
              }}>
                {ruta.tiempo}
              </Text>

            </View>

          ))
        }

      </View>


<View
  style={{
    border: 1,
    marginTop: 20,
    marginBottom: 20,
  }}
>

  <View
    style={{
      flexDirection: "row",
      backgroundColor: "#ddd",
      borderBottom: 1,
    }}
  >

    <Text style={{
      width: "10%",
      borderRight: 1,
      padding: 4,
      fontSize: 8,
    }}>
      Nro.
    </Text>

    <Text style={{
      width: "70%",
      borderRight: 1,
      padding: 4,
      fontSize: 8,
    }}>
      Nombre del encargado de viaje
    </Text>

    <Text style={{
      width: "20%",
      padding: 4,
      fontSize: 8,
    }}>
      Celular
    </Text>

  </View>

  {
    data?.encargados?.map((e, index) => (

      <View
        key={index}
        style={{
          flexDirection: "row",
          borderBottom: 1,
        }}
      >

        <Text style={{
          width: "10%",
          borderRight: 1,
          padding: 4,
          fontSize: 8,
        }}>
          {e.nro}
        </Text>

        <Text style={{
          width: "70%",
          borderRight: 1,
          padding: 4,
          fontSize: 8,
        }}>
          {e.nombreCompleto}
        </Text>

        <Text style={{
          width: "20%",
          padding: 4,
          fontSize: 8,
        }}>
          {e.celular}
        </Text>

      </View>

    ))
  }

</View>


{/* INFORME */}

<View
  style={{
    border: 1,
    padding: 10,
    minHeight: 90,
    marginBottom: 25,
  }}
>

  <Text
    style={{
      fontSize: 8,
      fontWeight: "bold",
      marginBottom: 15,
    }}
  >
    Informe del encargado de viaje:
  </Text>

  <Text>
    ....................................................................................................................
  </Text>

  <Text style={{ marginTop: 15 }}>
    ....................................................................................................................
  </Text>

  <Text style={{ marginTop: 15 }}>
    ....................................................................................................................
  </Text>

  <View
    style={{
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 20,
    }}
  >

    <Text style={{ marginRight: 20 }}>
      Hora de Partida: ........................
    </Text>

    <Text>
      Hora de Llegada: ........................
    </Text>

  </View>

</View>




    </View>

  );

}