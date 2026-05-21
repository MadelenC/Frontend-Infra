// src/Pdf/RequestPdf/styles/requestPdfStyles.js

import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({

  // =========================
  // PAGE
  // =========================
  page: {
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 25,
    fontFamily: "Helvetica",
    fontSize: 9,
    backgroundColor: "#f9fafb",
  },

  // =========================
  // CONTENEDOR PRINCIPAL
  // =========================
  container: {
    border: 0.8,
    borderColor: "#d1d5db",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },

  // =========================
  // HEADER
  // =========================
  topHeader: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2937",
    borderBottom: 0.8,
    borderColor: "#d1d5db",
  },

  miniTitle: {
    fontSize: 7,
    color: "#e5e7eb",
    marginBottom: 3,
    textAlign: "center",
  },

  title: {
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#ffffff",
    textAlign: "center",
  },

  // =========================
  // FILAS
  // =========================
  row: {
    flexDirection: "row",
    width: "100%",
  },

  rowLight: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f9fafb",
  },

  rowWhite: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#ffffff",
  },

  // =========================
  // CELDAS
  // =========================
  cell: {
    borderRight: 0.5,
    borderBottom: 0.5,
    borderColor: "#d1d5db",
    padding: 6,
    justifyContent: "center",
    flex: 1,
  },

  lastCell: {
    borderBottom: 0.5,
    borderColor: "#d1d5db",
    padding: 6,
    justifyContent: "center",
    flex: 1,
  },

  // =========================
  // LABELS Y VALORES
  // =========================
  label: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#6b7280",
    marginBottom: 2,
    textTransform: "uppercase",
  },

  value: {
    fontSize: 8.5,
    color: "#111827",
    lineHeight: 1.4,
  },

  // =========================
  // TABLAS
  // =========================
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    borderBottom: 0.8,
    borderColor: "#d1d5db",
    paddingVertical: 4,
  },

  tableTitle: {
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },

  tableText: {
    fontSize: 8,
    textAlign: "center",
    color: "#374151",
  },

  // =========================
  // PÁRRAFOS / OBSERVACIONES
  // =========================
  paragraphBox: {
    borderBottom: 0.5,
    borderColor: "#d1d5db",
    padding: 8,
    minHeight: 55,
    backgroundColor: "#fcfcfc",
  },

  paragraphTitle: {
    fontSize: 8,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#374151",
    textTransform: "uppercase",
  },

  paragraphText: {
    fontSize: 8,
    textAlign: "justify",
    color: "#111827",
    lineHeight: 1.5,
  },

  // =========================
  // CAMPOS RELLENABLES
  // =========================
  filledValue: {
    fontSize: 8,
    marginTop: 2,
    paddingVertical: 3,
    paddingHorizontal: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    color: "#111827",
  },

  filledBox: {
    backgroundColor: "#f9fafb",
  },

  darkFilled: {
    backgroundColor: "#e5e7eb",
  },

  // =========================
  // FIRMAS
  // =========================
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    paddingHorizontal: 10,
  },

  signBox: {
    width: "30%",
    alignItems: "center",
  },

  signLine: {
    borderTop: 0.8,
    borderColor: "#9ca3af",
    width: "85%",
    marginBottom: 6,
  },

  signText: {
    fontSize: 8,
    textAlign: "center",
    color: "#111827",
    marginBottom: 2,
  },

  signDate: {
    fontSize: 7,
    textAlign: "center",
    color: "#6b7280",
    marginTop: 2,
  },

});