/**
 * Componente para mostrar un ítem de libro en listas
 *
 * @module components/books/BookItem
 */
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import Layout from "../constants/layout";

/**
 * Componente para mostrar un ítem de libro en listas
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.item - Datos del libro
 * @param {string} props.item.id - ID del libro
 * @param {string} props.item.title - Título del libro
 * @param {Array<string>} props.item.authors - Autores del libro
 * @param {string} props.item.thumbnail - URL de la imagen de portada
 * @param {Object} props.navigation - Objeto de navegación
 * @returns {JSX.Element} - Componente de ítem de libro
 */
const BookItem = ({ item, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("BookView", { volumeId: item.id })}>
    <View style={styles.itemContainer}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      ) : (
        <View style={[styles.thumbnail, styles.placeholder]} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        {item.authors.length > 0 && (
          <Text style={styles.authors} numberOfLines={1}>
            {item.authors.join(", ")}
          </Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

/**
 * Estilos para el componente BookItem
 */
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginBottom: Layout.SPACING.M,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingBottom: Layout.SPACING.M
  },
  thumbnail: {
    width: 50,
    height: 75,
    borderRadius: Layout.BORDER_RADIUS.S,
    backgroundColor: Colors.PLACEHOLDER
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    flex: 1,
    marginLeft: Layout.SPACING.M,
    justifyContent: "center"
  },
  title: {
    fontSize: Layout.FONT_SIZE.L,
    fontWeight: Layout.FONT_WEIGHT.BOLD
  },
  authors: {
    fontSize: Layout.FONT_SIZE.M,
    color: Colors.TEXT_SECONDARY,
    marginTop: Layout.SPACING.XS
  }
});

export default BookItem;
