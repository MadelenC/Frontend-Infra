// styles/boletaStyles.js

import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({

  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  container: {
    width: "100%",
  },

  headerText: {
  fontSize: 10,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 2,
  letterSpacing: 0.5,
},
headerContainer: {
  alignItems: "center",
  marginBottom: 10,
  paddingBottom: 6,
  borderBottom: "1 solid #000",
},


  title: {
  fontSize: 14,
  fontWeight: "bold",
  textAlign: "center",
  marginTop: 6,
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: 1,
},
subHeaderText: {
  fontSize: 9,
  textAlign: "center",
  marginBottom: 2,
},

  box: {
    border: "1 solid black",
    padding: 5,
    marginTop: 4,
  },

  rowText: {
    fontSize: 9,
    marginBottom: 4,
  },

  bold: {
    fontWeight: "bold",
  },

  timesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  reportTitle: {
    fontSize: 10,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },

  reportBox: {
    border: "1 solid black",
    height: 120,
    padding: 5,
  },

  dottedLine: {
    borderBottom: "1 dotted black",
    marginBottom: 15,
  },

  firmaLine: {
    width: 120,
    borderBottom: "1 solid black",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 3,
  },

  firmaText: {
    textAlign: "center",
    fontSize: 9,
    fontWeight: "bold",
  },

  fecha: {
    marginTop: 10,
    fontSize: 9,
  },

  footer: {
    marginTop: 40,
    alignItems: "center",
  },

  footerName: {
    fontSize: 9,
    fontWeight: "bold",
  },

  footerCargo: {
    fontSize: 9,
    fontWeight: "bold",
  },

});