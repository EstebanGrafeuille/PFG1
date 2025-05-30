/**
 * Componentes de indicadores de carga reutilizables
 *
 * @module components/ui/LoadingIndicator
 */
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";

// Comentario para desarrolladores:
// TODO: Cuando se complete la migración, actualizar las importaciones a:
// import Colors from '../../constants/colors';
// import Layout from '../../constants/layout';

/**
 * Componente de indicador de carga reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {string} [props.size='large'] - Tamaño del indicador ('small' o 'large')
 * @param {boolean} [props.fullScreen=false] - Si debe ocupar toda la pantalla
 * @returns {JSX.Element} - Componente de indicador de carga
 */
export const LoadingIndicator = ({ size = "large", fullScreen = false }) => (
  <View style={[styles.container, fullScreen && styles.fullScreen]}>
    <ActivityIndicator size={size} color={Colors.PRIMARY} />
  </View>
);

/**
 * Componente de indicador de carga para el footer de listas
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.loading - Si está cargando
 * @returns {JSX.Element|null} - Componente de indicador de carga o null
 */
export const LoadingFooter = ({ loading }) =>
  loading ? <ActivityIndicator style={styles.footer} size="small" color={Colors.PRIMARY} /> : null;

/**
 * Estilos para los componentes de indicadores de carga
 */
const styles = StyleSheet.create({
  container: {
    padding: Layout.SPACING.M
  },
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    marginVertical: Layout.SPACING.M
  }
});

export default {
  LoadingIndicator,
  LoadingFooter
};
