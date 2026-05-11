import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({

  page: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,

    fontSize: 9,

    backgroundColor: "#FFFFFF",
  },

  center: {
    textAlign: "center",
  },

  bold: {
    fontWeight: "bold",
  },

  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",

    marginBottom: 2,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 9,

    marginBottom: 1,
  },

  table: {
    width: "100%",

    borderWidth: 1,
    borderColor: "#000",

    marginTop: 10,
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    borderWidth: 1,
    borderColor: "#000",

    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 2,
    paddingRight: 2,

    fontSize: 8,

    textAlign: "center",
  },

  headerCell: {
    backgroundColor: "#E5E7EB",

    fontWeight: "bold",

    fontSize: 8,
  },

  notes: {
    marginTop: 12,

    fontSize: 8,

    lineHeight: 1.4,
  },

  signature: {
    marginTop: 60,

    textAlign: "center",

    fontSize: 8,
  },

});