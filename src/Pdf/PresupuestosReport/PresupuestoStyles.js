import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({

  page: {
    padding: 20,
    fontSize: 8,
    fontFamily: "Helvetica",
    top: 15,
  },

  header: {
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 3,
    fontSize: 8,
  },

  center: {
    textAlign: "center",
  },

  bold: {
    fontWeight: "bold",
  },

  rutasContainer: {
  width: "100%",
},

rutaColumn: {
  flex: 2.2,
  borderWidth: 1,
  borderColor: "#000",
  paddingVertical: 3,
  paddingHorizontal: 4,
  justifyContent: "center",
},

kmColumn: {
  flex: 0.8,
  borderWidth: 1,
  borderColor: "#000",
  justifyContent: "center",
  alignItems: "center",
},

  rutaText: {
    fontSize: 7,
  },

  kmText: {
    fontSize: 7,
    textAlign: "center",
  },

  firmaContainer: {
    marginTop: 40,
    alignItems: "center",
  },




/* PRESUPUESTO */


presupuestoRow: {
  flexDirection: "row",
  width: "100%",
},



colCant: {
  flex: 0.7,  
  borderWidth: 1,
  borderColor: "#000",
  padding: 3,
  justifyContent: "center",
},

colUnidad: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#000",
  padding: 3,
  justifyContent: "center",
},

colDescripcion: {
  flex: 3.5,
  borderWidth: 1,
  borderColor: "#000",
  padding: 3,
  justifyContent: "center",
},

colPU: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#000",
  padding: 3,
  justifyContent: "center",
},

colTotal: {
  flex: 1.2,
  borderWidth: 1,
  borderColor: "#000",
  padding: 3,
  justifyContent: "center",
},

headerText: {
  fontSize: 7,
  fontWeight: "bold",
  textAlign: "center",
},

bodyCenter: {
  fontSize: 7,
  textAlign: "center",
},

bodyLeft: {
  fontSize: 7,
  textAlign: "left",
},

bodyRight: {
  fontSize: 7,
  textAlign: "right",
},
});