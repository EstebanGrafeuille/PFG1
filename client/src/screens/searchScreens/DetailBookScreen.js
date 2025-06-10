/**
 * Pantalla de detalles de libro
 * Muestra información detallada sobre un libro específico
 *
 * @module screens/searchScreens/DetailBookScreen
 */
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Modal,
  useWindowDimensions,
  Button
} from "react-native";
import RenderHtml from "react-native-render-html";
import useBookDetails from "../../hooks/useBookDetails";
import { useState, useContext, useEffect, useCallback } from "react";
import { LoadingIndicator } from "../../components/ui/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/DetailBookScreenStyles";
import { useBooks } from "../../context/BooksContext";
import { formatDate, getLanguageName } from "../../utils/helpers";
import userBookService from "../../services/userBook";
import { AuthContext } from "../../context/AuthContext";
import reviewService from "../../services/reviewService";
import { useFocusEffect } from "@react-navigation/native";
import Layout from "../../constants/layout";
import Colors from "../../constants/colors";

/**
 * Pantalla de detalles de libro
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.route - Objeto de ruta con parámetros
 * @param {Object} props.route.params - Parámetros de la ruta
 * @param {string} props.route.params.volumeId - ID del volumen del libro
 * @returns {JSX.Element} - Componente de pantalla de detalles
 */
const DetailBook = ({ route }) => {
  const { volumeId } = route.params;
  const { details, loading, error } = useBookDetails(volumeId);
  const { addToFavorites, addToReadingList, isFavorite, isInReadingList } = useBooks();

  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const [listas, setListas] = useState([]);
  const { authData } = useContext(AuthContext);

  const [userReview, setUserReview] = useState(null);

  const [isInRead, setIsInRead] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchUserReview();
      fetchListas();
    }, [volumeId])
  );

  const fetchUserReview = async () => {
    try {
      const response = await reviewService.getUserReview(
        authData.user.id,
        volumeId,
        authData.token
      );
      setUserReview(response.data);
    } catch (err) {
      setUserReview(null);
    }
  };

  useEffect(() => {
    fetchListas();
    fetchUserReview();
    checkIfInRead();
  }, []);

  const fetchListas = async () => {
    try {
      const userBook = await userBookService.getListas(authData.user.id, authData.token);
      setListas((userBook[0] && userBook[0].listasUser) || []);
    } catch (error) {
      console.error("Error al obtener listas:", error.message);
    }
  };

  const options = listas;

  const { width } = useWindowDimensions();

  if (loading) {
    return <LoadingIndicator fullScreen />;
  }

  if (error || !details) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "No book details found"}</Text>
      </View>
    );
  }

  const info = details.volumeInfo;

  //Preparar objeto de libro para guardar en listas
  const bookData = {
    id: details.id,
    title: info.title,
    authors: info.authors || [],
    thumbnail: info.imageLinks?.thumbnail,
    publishedDate: info.publishedDate
  };

  console.log("libro ID: " + bookData.id);

  // Manejar añadir a favoritos o lista de lectura
  const handleAddBook = async (listName) => {
    try {
      await userBookService.addToLista(authData.user.id, listName, bookData.id, authData.token);
      checkIfInRead();
    } catch (error) {
      console.error("Error al agregar a lista:", error.message);
    }
  };

  async function checkIfInRead() {
    try {
      const inList = await userBookService.isInLista(authData.user.id, "Read", volumeId, authData.token);
      setIsInRead(inList);
    } catch (error) {
      console.error("Error verificando si el libro está en la lista:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Cabecera con imagen y datos básicos */}
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <View style={styles.buttonContainer}>
              <Image
                source={require("../../../assets/img/back-icon-grey.png")}
                style={styles.icon}
              />
            </View>
          </Pressable>
          <View style={styles.headerInfo}>
            <View style={styles.imageContainer}>
              {info.imageLinks?.thumbnail ? (
                <Image
                  source={{ uri: info.imageLinks.thumbnail }}
                  style={styles.bookCover}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.noImageContainer}>
                  <Text style={styles.noImageText}>
                    {info.title ? info.title.substring(0, 1) : "?"}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.headerRight}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{info.title}</Text>
                {info.authors && <Text style={styles.authors}>{info.authors.join(", ")}</Text>}
              </View>
              {info.publishedDate && (
                <Text style={styles.publishedDate}>{formatDate(info.publishedDate)}</Text>
              )}
              {info.categories && (
                <View style={styles.categoriesContainer}>
                  {info.categories.length > 0 && (
                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>{info.categories[0]}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Sección de descripción */}
        <View style={styles.infoSection}>
          <View style={styles.buttonRow}>
            <Pressable onPress={() => handleAddBook("Read")} style={styles.rowItemContainer}>
              <View style={styles.listButtonContainer}>
                {isInRead ? (
                  <Image
                  source={require("../../../assets/img/read-icon-active.png")}
                  style={styles.listIcon}
                />
                ) : (
                  <Image
                  source={require("../../../assets/img/read-icon.png")}
                  style={styles.listIcon}
                />
                )}
              </View>
              <Text style={styles.iconText}>Read</Text>
            </Pressable>
            <Pressable onPress={() => setVisible(true)} style={styles.rowItemContainer}>
              <View style={styles.listButtonContainer}>
                <Image
                  source={require("../../../assets/img/lists-icon.png")}
                  style={styles.listIcon}
                />
              </View>
              <Text style={styles.iconText}>Lists</Text>
            </Pressable>
            <Modal
              transparent={true}
              visible={visible}
              animationType="fade"
              onRequestClose={() => setVisible(false)}
            >
              <Pressable
                style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
                onPress={() => setVisible(false)}
              >
                <View style={styles.popup}>
                  <Pressable onPress={() => setVisible(false)} style={styles.closeButton}>
                    <Text>×</Text>
                  </Pressable>
                  {options.map((opt, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleAddBook(opt);
                        setVisible(false);
                      }}
                    >
                      <Text style={styles.option}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Pressable>
            </Modal>
            <Pressable
              onPress={() => navigation.navigate("Reviews", { volumeId: details.id })}
              style={styles.rowItemContainer}
            >
              <View style={styles.reviewstButtonContainer}>
                <Image
                  source={require("../../../assets/img/wishlist-icon.png")}
                  style={styles.reviewsIcon}
                />
              </View>
              <Text style={styles.iconText}>Next</Text>
            </Pressable>
          </View>
          <View style={{height: 1, width: "100%", backgroundColor: Colors.BORDER, marginBottom: 20}}></View>
          <View style={styles.reviewContainer}>
              <View style={styles.reviewButtonContainer}>
                <TouchableOpacity 
                  onPress={() =>
                  userReview
                    ? navigation.navigate("EditReview", { volumeId, review: userReview })
                    : navigation.navigate("AddReview", { volumeId: details.id })
                  }
                  style={styles.addReviewBtn}>
                    <Text style={styles.addReviewBtnText}>{userReview ? "Edit review" : "Add review"}</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.reviewButtonContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Reviews", { volumeId: details.id })}
                  style={styles.reviewBtn}>
                    <Text style={styles.reviewBtnText}>Reviews</Text>
                </TouchableOpacity>
              </View>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            {info.description ? (
              <RenderHtml
                contentWidth={width - 40}
                source={{ html: info.description }}
                baseStyle={{
                  fontSize: Layout.FONT_SIZE.M,
                  lineHeight: 20,
                  color: Colors.TEXT_PRIMARY,
                  fontFamily: "Roboto_400Regular"
                }}
              />
            ) : (
              <Text style={styles.noInfo}>No description available</Text>
            )}
            {/* SECCION de DETALLES */}
            <Text style={styles.detailsTitle}>Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Publisher:</Text>
              <Text style={styles.detailValue}>{info.publisher || "Not available"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Pages:</Text>
              <Text style={styles.detailValue}>{info.pageCount || "Not available"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Language:</Text>
              <Text style={styles.detailValue}>
                {getLanguageName(info.language) || "Not available"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ISBN:</Text>
              <Text style={styles.detailValue}>
                {info.industryIdentifiers?.find((id) => id.type === "ISBN_13")?.identifier ||
                  info.industryIdentifiers?.find((id) => id.type === "ISBN_10")?.identifier ||
                  "No disponible"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailBook;
