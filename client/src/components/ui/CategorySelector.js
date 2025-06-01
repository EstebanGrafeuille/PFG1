/**
 * Componente selector de categorías de libros
 *
 * @module components/ui/CategorySelector
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";

// Categorías populares de libros
const CATEGORIES = [
  { id: "all", label: "Todas" },
  { id: "fiction", label: "Ficción" },
  { id: "fantasy", label: "Fantasía" },
  { id: "science", label: "Ciencia" },
  { id: "biography", label: "Biografía" },
  { id: "history", label: "Historia" },
  { id: "poetry", label: "Poesía" },
  { id: "romance", label: "Romance" }
];

/**
 * Componente selector de categorías de libros
 * @param {Object} props - Propiedades del componente
 * @param {string} props.selectedCategory - Categoría seleccionada
 * @param {Function} props.onSelectCategory - Función para manejar la selección de categoría
 * @returns {JSX.Element} - Componente selector de categorías
 */
const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => onSelectCategory(category.id)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.SPACING.M,
  },
  scrollContent: {
    paddingRight: Layout.SPACING.L,
  },
  categoryButton: {
    paddingHorizontal: Layout.SPACING.M,
    paddingVertical: Layout.SPACING.S,
    borderRadius: Layout.BORDER_RADIUS.M,
    marginRight: Layout.SPACING.S,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  selectedCategory: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  categoryText: {
    fontSize: Layout.FONT_SIZE.S,
    color: Colors.TEXT_PRIMARY,
  },
  selectedCategoryText: {
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
  }
});

export default CategorySelector;