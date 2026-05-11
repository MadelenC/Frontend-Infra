import { View, Text } from "@react-pdf/renderer";
import { styles } from "../../common";

export default function RoleTravelSignaturePDF() {
  return (
    <View style={styles.signature}>

      <Text>
        ______________________________
      </Text>

      <Text>
        Lic. Marcelo Raul Guzmán Camacho
      </Text>

      <Text>
        ENCARGADO DE AUTOMOTORES
      </Text>

      <Text
        style={{
          marginTop: 10,
          fontSize: 8,
        }}
      >
        Sistema Web Departamento de Infraestructura U.A.T.F.
      </Text>

    </View>
  );
}