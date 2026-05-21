import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({

  page: {
    padding: 18,
    fontSize: 8,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },

  container: {
    width: "100%",
    border: 1,
    borderColor: "#000",
  },

  header: {
    borderBottom: 1,
    borderColor: "#000",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  mini: {
    fontSize: 6,
    textAlign: "center",
  },

  title: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  system: {
    fontSize: 6,
    marginTop: 2,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    borderBottom: 1,
    borderColor: "#000",
    minHeight: 20,
    alignItems: "center",
  },

  cell: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    justifyContent: "center",
  },

  label: {
    fontSize: 7,
    fontWeight: "bold",
  },

  value: {
    fontSize: 7,
  },

  accessories: {
    borderBottom: 1,
    borderColor: "#000",
    padding: 5,
    minHeight: 28,
    justifyContent: "center",
  },

  description: {
    borderBottom: 1,
    borderColor: "#000",
    padding: 5,
    minHeight: 45,
  },

  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
    paddingHorizontal: 12,
  },

  signBox: {
    width: "40%",
    alignItems: "center",
  },

  signLine: {
    borderTop: 1,
    borderColor: "#000",
    width: "100%",
    marginBottom: 4,
    paddingTop: 2,
  },

  signText: {
    fontSize: 7,
    textAlign: "center",
    lineHeight: 1.3,
  },

});