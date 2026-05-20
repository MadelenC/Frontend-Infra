import {
  View,
  Text,
  Image,
} from "@react-pdf/renderer";

import { styles } from "../../common";

import logoUATF
from "../../assets/logouatf.png";

export default function RoleTravelHeaderPDF({
  date,
}) {

  return (

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom: 10,
      }}
    >

     
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >

        <Text style={styles.subtitle}>
          UNIVERSIDAD AUTÓNOMA TOMÁS FRÍAS
        </Text>

        <Text style={styles.subtitle}>
          DEPARTAMENTO DE INFRAESTRUCTURA
        </Text>

        <Text style={styles.subtitle}>
          SECCIÓN AUTOMOTORES
        </Text>

        <Text style={styles.title}>
          ROL DE VIAJES
        </Text>

        <Text style={styles.center}>
          {date}
        </Text>

      </View>

     
      <Image
        src={logoUATF}
        style={{
          width: 55,
          height: 55,
        }}
      />

    </View>
  );
}