import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({

  page: {
    padding: 18,
    fontSize: 9,
  },

  block: {
    border: 1,
    marginBottom: 6,
  },

  sectionTitle: {
    textAlign: "center",
    fontWeight: "bold",
    borderBottom: 1,
    padding: 4,
  },

  row: {
    flexDirection: "row",
    borderBottom: 1,
  },

  row3: {
    flexDirection: "row",
    borderBottom: 1,
  },

  cellLabel: {
    width: "25%",
    borderRight: 1,
    padding: 4,
    fontWeight: "bold",
  },

  cellValue: {
    width: "25%",
    borderRight: 1,
    padding: 4,
  },

  text: {
    padding: 6,
  },

});