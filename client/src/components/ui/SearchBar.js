/**
 * Componente de barra de búsqueda reutilizable
 *
 * @module components/ui/SearchBar
 */
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";
import SearchTypeSelector from "./SearchTypeSelector";

/**
 * Componente de barra de búsqueda reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {string} props.value - Valor actual del input
 * @param {Function} props.onChangeText - Función para manejar cambios en el texto
 * @param {Function} props.onSubmit - Función para manejar el envío del formulario
 * @param {string} [props.placeholder="Buscar libros..."] - Texto de placeholder
 * @param {string} props.searchType - Tipo de búsqueda seleccionado
 * @param {Function} props.onSearchTypeChange - Función para cambiar el tipo de búsqueda
 * @param {Function} props.onFilterPress - Función para abrir el modal de filtros
 * @param {Function} props.onTypeDropdownToggle - Función para notificar cuando el dropdown cambia de estado
 * @returns {JSX.Element} - Componente de barra de búsqueda
 */
const SearchBar = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = "Buscar libros...",
  searchType = "title",
  onSearchTypeChange,
  onFilterPress,
  onTypeDropdownToggle
}) => (
  <View style={styles.container}>
    <View style={styles.searchContainer}>
      <SearchTypeSelector
        selectedType={searchType}
        onSelectType={onSearchTypeChange}
        onDropdownToggle={onTypeDropdownToggle}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
    </View>
    {onFilterPress && (
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Image
          source={require("../../../assets/img/settings-icon.png")}
          style={styles.filterIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    )}
  </View>
);

/**
 * Estilos para el componente SearchBar
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Layout.SPACING.M
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: Layout.BORDER_RADIUS.S,
    height: 40,
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: Layout.SPACING.M
  },
  filterButton: {
    marginLeft: Layout.SPACING.S,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: Layout.BORDER_RADIUS.S
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.TEXT_PRIMARY
  }
});

export default SearchBar;
