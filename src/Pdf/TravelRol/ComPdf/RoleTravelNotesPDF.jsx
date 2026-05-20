import { View, Text } from "@react-pdf/renderer";
import { styles } from "../../common";

export default function RoleTravelNotesPDF() {
  return (
    <View style={styles.notes}>

      <Text>
        NOTA:
      </Text>

      <Text>
        A) El orden de los choferes se muestra según la antigüedad laboral.
      </Text>

      <Text>
        B) La nueva designación de un viaje se realiza según:
        la antigüedad, el turno disponible del tipo de viaje
        y la disponibilidad del chofer.
      </Text>

      <Text>
        C) La fecha muestra la última modificación o designación
        que se realizó en el rol de viajes.
      </Text>

      <Text>
        D) El # muestra el número de viajes realizados
        de cada chofer.
      </Text>

    </View>
  );
}