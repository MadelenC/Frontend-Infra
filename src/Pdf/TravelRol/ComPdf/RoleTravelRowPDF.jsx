import { View, Text } from "@react-pdf/renderer";
import { styles } from "../../common";

export default function RoleTravelRowPDF({
  item,
}) {
  return (
    <View style={styles.row}>

      <Text style={[styles.cell, { width: "5%" }]}>
        {item.displayId}
      </Text>

      <Text style={[styles.cell, { width: "25%" }]}>
        {item.chofer}
      </Text>

      <Text style={[styles.cell, { width: "15%" }]}>
        {item.tipoA}
      </Text>

      <Text style={[styles.cell, { width: "15%" }]}>
        {item.tipoB}
      </Text>

      <Text style={[styles.cell, { width: "15%" }]}>
        {item.tipoC}
      </Text>

      <Text style={[styles.cell, { width: "15%" }]}>
        {item.fecha}
      </Text>

      <Text style={[styles.cell, { width: "10%" }]}>
        {item.cantidad}
      </Text>

    </View>
  );
}