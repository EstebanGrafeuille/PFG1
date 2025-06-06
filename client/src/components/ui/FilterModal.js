/**
 * Componente modal de filtros para búsqueda de libros
 *
 * @module components/ui/FilterModal
 */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Switch } from "react-native";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";

/**
 * Componente modal de filtros para búsqueda de libros
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.visible - Si el modal es visible
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Object} props.filters - Estado actual de los filtros
 * @param {Function} props.onApplyFilters - Función para aplicar los filtros
 * @returns {JSX.Element} - Componente modal de filtros
 */
const FilterModal = ({ visible, onClose, filters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState({...filters});

  // Actualizar filtros locales cuando cambian los props
  useEffect(() => {
    setLocalFilters({...filters});
  }, [filters, visible]);

  const handleToggleFilter = (key) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filtersContainer}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Availability</Text>
              
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Preview available</Text>
                <Switch
                  value={localFilters.previewAvailable}
                  onValueChange={() => handleToggleFilter('previewAvailable')}
                  trackColor={{ false: Colors.BORDER, true: Colors.PRIMARY }}
                />
              </View>
              
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Free books</Text>
                <Switch
                  value={localFilters.freeEbooks}
                  onValueChange={() => handleToggleFilter('freeEbooks')}
                  trackColor={{ false: Colors.BORDER, true: Colors.PRIMARY }}
                />
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Content</Text>
              
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Only full books</Text>
                <Switch
                  value={localFilters.fullBooks}
                  onValueChange={() => handleToggleFilter('fullBooks')}
                  trackColor={{ false: Colors.BORDER, true: Colors.PRIMARY }}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.button, styles.resetButton]} 
              onPress={() => setLocalFilters({
                previewAvailable: false,
                freeEbooks: false,
                fullBooks: false
              })}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.applyButton]} 
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: Layout.BORDER_RADIUS.L,
    borderTopRightRadius: Layout.BORDER_RADIUS.L,
    paddingTop: Layout.SPACING.L,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Layout.SPACING.L,
    paddingBottom: Layout.SPACING.M,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  title: {
    fontSize: Layout.FONT_SIZE.L,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    color: Colors.TEXT_PRIMARY,
  },
  closeButton: {
    fontSize: Layout.FONT_SIZE.L,
    color: Colors.TEXT_SECONDARY,
    padding: Layout.SPACING.S,
  },
  filtersContainer: {
    maxHeight: 400,
  },
  filterSection: {
    paddingHorizontal: Layout.SPACING.L,
    paddingVertical: Layout.SPACING.M,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  sectionTitle: {
    fontSize: Layout.FONT_SIZE.M,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
    marginBottom: Layout.SPACING.M,
    color: Colors.TEXT_PRIMARY,
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Layout.SPACING.S,
  },
  filterLabel: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_PRIMARY,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Layout.SPACING.L,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
  },
  button: {
    paddingVertical: Layout.SPACING.M,
    paddingHorizontal: Layout.SPACING.L,
    borderRadius: Layout.BORDER_RADIUS.M,
    flex: 1,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    marginRight: Layout.SPACING.M,
  },
  resetButtonText: {
    color: Colors.TEXT_PRIMARY,
    fontWeight: Layout.FONT_WEIGHT.MEDIUM,
  },
  applyButton: {
    backgroundColor: Colors.PRIMARY,
  },
  applyButtonText: {
    color: Colors.TEXT_PRIMARY,
    fontWeight: Layout.FONT_WEIGHT.BOLD,
  },
});

export default FilterModal;