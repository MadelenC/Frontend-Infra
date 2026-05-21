import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({

  page: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    fontFamily: "Helvetica",
    fontSize: 10,
  },

  // TITULO PRINCIPAL
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  universityText: {
    fontSize: 8,
    marginBottom: 3,
  },

  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  // SECCIONES
  section: {
    border: 1,
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 4,
    borderBottom: 1,
    backgroundColor: "#eaeaea",
  },

  // TABLAS
  table: {
    width: "100%",
  },

  row: {
    flexDirection: "row",
    width: "100%",
  },

  column: {
    width: "100%",
  },

  // CELDAS
  cell: {
    flex: 1,
    borderRight: 1,
    borderBottom: 1,
    padding: 5,
    minHeight: 28,
    justifyContent: "center",
  },

  cellLast: {
    flex: 1,
    borderBottom: 1,
    padding: 5,
    minHeight: 28,
    justifyContent: "center",
  },

  // TEXTOS
  label: {
    fontSize: 8,
    fontWeight: "bold",
    marginBottom: 2,
  },

  value: {
    fontSize: 9,
  },

  // FIRMAS
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 10,
  },

  signatureBox: {
    width: "30%",
    alignItems: "center",
  },

  signatureLine: {
    borderTop: 1,
    width: "100%",
    marginBottom: 5,
  },

  signatureText: {
    fontSize: 9,
    textAlign: "center",
  },

  // NUEVOS ESTILOS SOLO PARA VIÁTICOS Y COMBUSTIBLE

fuelRow: {
  flexDirection: "row",
  width: "100%",
},

fuelCell: {
  width: "16.66%", // 6 columnas exactas
  borderRight: 1,
  borderBottom: 1,
  padding: 3,
  minHeight: 20,
  justifyContent: "center",
  alignItems: "center",
},

fuelLabel: {
  fontSize: 7,
  fontWeight: "bold",
  marginBottom: 1,
  textAlign: "center",
},

fuelValue: {
  fontSize: 7,
  textAlign: "center",
},

// INFORMES GRANDES
reportBox: {
  borderTop: 1,
  padding: 6,
  minHeight: 30,
  justifyContent: "flex-start",
},

reportLabel: {
  fontSize: 8,
  fontWeight: "bold",
  marginBottom: 4,
},

reportValue: {
  fontSize: 9,
  lineHeight: 1.4,
},

});