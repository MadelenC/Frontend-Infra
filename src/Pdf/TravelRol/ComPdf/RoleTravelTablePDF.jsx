import { View, Text } from "@react-pdf/renderer";

import { styles } from "../../common";

import RoleTravelRowPDF
from "./RoleTravelRowPDF";

export default function RoleTravelTablePDF({
  travels,
}) {
  return (
    <View style={styles.table}>

      {/* HEADER */}

      <View style={styles.row}>

        <Text
          style={[
            styles.cell,
            styles.headerCell,
            { width: "5%" }
          ]}
        >
          N°
        </Text>

        <Text
          style={[
            styles.cell,
            styles.headerCell,
            { width: "25%" }
          ]}
        >
          Chofer
        </Text>

        <Text
          style={[
            styles.cell,
            styles.headerCell,
            { width: "15%" }
          ]}
        >
          Ciudad A
        </Text>

        <Text
          style={[
            styles.cell,
            styles.headerCell,
            { width: "15%" }
          ]}
        >
          Provincia B
        </Text>

        <Text
          style={[
            styles.cell,
            styles.headerCell,
            { width: "15%" }
          ]}
        >
          Frontera C
        </Text>

        <Text
          style={[
            styles.cell,
            styles.headerCell,
            { width: "15%" }
          ]}
        >
          Fecha
        </Text>

        <Text
          style={[
            styles.cell,
            styles.headerCell,
            { width: "10%" }
          ]}
        >
          #
        </Text>

      </View>


      {travels.map((item) => (
        <RoleTravelRowPDF
          key={item.id}
          item={item}
        />
      ))}

    </View>
  );
}