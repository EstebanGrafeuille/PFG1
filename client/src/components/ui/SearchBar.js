/**
 * Componente de barra de búsqueda reutilizable
 * 
 * @module components/ui/SearchBar
 */
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Layout from '../../constants/layout';

// Comentario para desarrolladores:
// TODO: Cuando se complete la migración, actualizar las importaciones a:
// import Colors from '../../constants/colors';
// import Layout from '../../constants/layout';

/**
 * Componente de barra de búsqueda reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor actual del input
 * @param {Function} props.onChangeText - Función para manejar cambios en el texto
 * @param {Function} props.onSubmit - Función para manejar el envío del formulario
 * @param {string} [props.placeholder="Buscar libros..."] - Texto de placeholder
 * @returns {JSX.Element} - Componente de barra de búsqueda
 */
const SearchBar = ({ 
  value, 
  onChangeText, 
  onSubmit,
  placeholder = "Buscar libros..." 
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    returnKeyType="search"
    onSubmitEditing={onSubmit}
  />
);

/**
 * Estilos para el componente SearchBar
 */
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: Layout.BORDER_RADIUS.S,
    paddingHorizontal: Layout.SPACING.M,
    marginBottom: Layout.SPACING.M
  }
});

export default SearchBar;