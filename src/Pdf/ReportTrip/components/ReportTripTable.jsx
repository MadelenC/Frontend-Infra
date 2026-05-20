import React from "react";
import { View, Text } from "@react-pdf/renderer";
import styles from "../styles/reportTripStyles";

export default function ReportTripTable({ trip }) {
  return (
    <View>

      {/* ================= DATOS GENERALES ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>DATOS GENERALES</Text>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>CONDUCTOR:</Text>
          <Text style={styles.cellValue}>
            {trip?.chofer?.nombres} {trip?.chofer?.apellidos}
          </Text>

          <Text style={styles.cellLabel}>VEHÍCULO:</Text>
          <Text style={styles.cellValue}>
            {trip?.vehiculo?.tipog} {trip?.vehiculo?.placa}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>RESPONSABLE:</Text>
          <Text style={styles.cellValue}>
            {trip?.encargado?.nombres} {trip?.encargado?.apellidos}
          </Text>

          <Text style={styles.cellLabel}>ENTIDAD:</Text>
          <Text style={styles.cellValue}>
            {trip?.entidad}
          </Text>
        </View>
      </View>

      {/* ================= VIAJE ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>DATOS DEL VIAJE</Text>

        <View style={styles.row3}>
          <Text style={styles.cellLabel}>PASAJEROS:</Text>
          <Text style={styles.cellValue}>{trip?.pasajeros}</Text>

          <Text style={styles.cellLabel}>RECORRIDO TOTAL:</Text>
          <Text style={styles.cellValue}>{trip?.kmtotal} km</Text>

          <Text style={styles.cellLabel}>DÍAS:</Text>
          <Text style={styles.cellValue}>{trip?.dias}</Text>
        </View>
      </View>

      {/* ================= PARTIDA ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>DATOS DE PARTIDA</Text>

        <View style={styles.row3}>
          <Text style={styles.cellLabel}>FECHA:</Text>
          <Text style={styles.cellValue}>{trip?.fechapartida}</Text>

          <Text style={styles.cellLabel}>KILOMETRAJE:</Text>
          <Text style={styles.cellValue}>{trip?.kilopartida}</Text>

          <Text style={styles.cellLabel}>HORA:</Text>
          <Text style={styles.cellValue}>{trip?.tiempopartida}</Text>
        </View>
      </View>

      {/* ================= LLEGADA ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>DATOS DE LLEGADA</Text>

        <View style={styles.row3}>
          <Text style={styles.cellLabel}>FECHA:</Text>
          <Text style={styles.cellValue}>{trip?.fechallegada}</Text>

          <Text style={styles.cellLabel}>KILOMETRAJE:</Text>
          <Text style={styles.cellValue}>{trip?.kilollegada}</Text>

          <Text style={styles.cellLabel}>HORA:</Text>
          <Text style={styles.cellValue}>{trip?.tiempollegada}</Text>
        </View>
      </View>

      {/* ================= VIATICOS ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>VIÁTICOS</Text>

        <View style={styles.row3}>
          <Text style={styles.cellLabel}>CIUDAD:</Text>
          <Text style={styles.cellValue}>{trip?.viaticoa}</Text>

          <Text style={styles.cellLabel}>PROVINCIA:</Text>
          <Text style={styles.cellValue}>{trip?.viaticob}</Text>

          <Text style={styles.cellLabel}>FRONTERA:</Text>
          <Text style={styles.cellValue}>{trip?.viaticoc}</Text>
        </View>
      </View>

      {/* ================= COMBUSTIBLE ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>
          RECARGUE Y COMPRA DE COMBUSTIBLE
        </Text>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>RECARGUE 1:</Text>
          <Text style={styles.cellValue}>{trip?.recargue1} Lts</Text>

          <Text style={styles.cellLabel}>COMPRA 1:</Text>
          <Text style={styles.cellValue}>{trip?.compra1} Bs</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>RECARGUE 2:</Text>
          <Text style={styles.cellValue}>{trip?.recargue2} Lts</Text>

          <Text style={styles.cellLabel}>COMPRA 2:</Text>
          <Text style={styles.cellValue}>{trip?.compra2} Bs</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>RECARGUE 3:</Text>
          <Text style={styles.cellValue}>{trip?.recargue3} Lts</Text>

          <Text style={styles.cellLabel}>COMPRA 3:</Text>
          <Text style={styles.cellValue}>{trip?.compra3} Bs</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>TOTAL:</Text>
          <Text style={styles.cellValue}>
            {trip?.combustotalu} Lts - {trip?.combustotalco} Bs
          </Text>
        </View>
      </View>

      {/* ================= PEAJES ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>PEAJES E IMPREVISTOS</Text>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>DESCRIPCIÓN:</Text>
          <Text style={styles.cellValue}>{trip?.descripe}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.cellLabel}>PEAJES:</Text>
          <Text style={styles.cellValue}>{trip?.montope} Bs</Text>

          <Text style={styles.cellLabel}>IMPREVISTOS:</Text>
          <Text style={styles.cellValue}>{trip?.montoim} Bs</Text>

          <Text style={styles.cellLabel}>TOTAL:</Text>
          <Text style={styles.cellValue}>{trip?.totalpeim} Bs</Text>
        </View>
      </View>

      {/* ================= INFORME ================= */}
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>INFORME DE LA DELEGACIÓN</Text>
        <Text style={styles.text}>{trip?.delegacion}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>INFORME TÉCNICO VEHICULAR</Text>
        <Text style={styles.text}>{trip?.descripmante}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>RECOMENDACIÓN</Text>
        <Text style={styles.text}>{trip?.recomendacion}</Text>
      </View>

    </View>
  );
}