/**
 * Componente selector de tipo de búsqueda
 *
 * @module components/ui/SearchTypeSelector
 */
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";

/**
 * Componente selector de tipo de búsqueda
 * @param {Object} props - Propiedades del componente
 * @param {string} props.selectedType - Tipo de búsqueda seleccionado
 * @param {Function} props.onSelectType - Función para manejar la selección de tipo
 * @param {Function} props.onDropdownToggle - Función para notificar cuando el dropdown cambia de estado
 * @returns {JSX.Element} - Componente selector de tipo de búsqueda
 */
const SearchTypeSelector = ({ selectedType, onSelectType, onDropdownToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  const searchTypes = [
    { id: "title", label: "Title" },
    { id: "author", label: "Author" }
  ];

  const selectedLabel = searchTypes.find((type) => type.id === selectedType)?.label || "Title";

  useEffect(() => {
    Animated.timing(dropdownHeight, {
      toValue: isOpen ? 80 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();

    // Notificar al componente padre sobre el cambio de estado del dropdown
    if (onDropdownToggle) {
      onDropdownToggle(isOpen);
    }
  }, [isOpen, onDropdownToggle]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (typeId) => {
    onSelectType(typeId);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={toggleDropdown} activeOpacity={0.7}>
        <Text style={styles.selectorText}>{selectedLabel}</Text>
        <Text style={[styles.dropdownIcon, isOpen && styles.dropdownIconOpen]}>▼</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownWrapper}>
          <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
            {searchTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.option, selectedType === type.id && styles.selectedOption]}
                onPress={() => handleSelect(type.id)}
              >
                <Text
                  style={[styles.optionText, selectedType === type.id && styles.selectedOptionText]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: Layout.SPACING.L,
    paddingVertical: Layout.SPACING.S,
    borderRadius: Layout.BORDER_RADIUS.S,
    height: 40,
    minWidth: 80
  },
  selectorText: {
    color: Colors.TEXT_PRIMARY,
    fontWeight: Layout.FONT_WEIGHT.MEDIUM,
    marginRight: Layout.SPACING.S, // Increased from XS to S for more space
    flex: 1 // Added flex to allow text to take available space
  },
  dropdownIcon: {
    fontSize: 10,
    color: Colors.TEXT_PRIMARY,
    transform: [{ rotate: "0deg" }]
  },
  dropdownIconOpen: {
    transform: [{ rotate: "180deg" }]
  },
  dropdownWrapper: {
    position: "absolute",
    top: 42,
    left: 0,
    zIndex: 9999,
    width: "100%",
    elevation: 1000
  },
  dropdown: {
    backgroundColor: Colors.WHITE,
    borderRadius: Layout.BORDER_RADIUS.S,
    width: "100%",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  option: {
    paddingVertical: Layout.SPACING.M,
    paddingHorizontal: Layout.SPACING.M,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER
  },
  selectedOption: {
    backgroundColor: Colors.PRIMARY + "20"
  },
  optionText: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_PRIMARY
  },
  selectedOptionText: {
    fontWeight: Layout.FONT_WEIGHT.BOLD
  }
});

export default SearchTypeSelector;
