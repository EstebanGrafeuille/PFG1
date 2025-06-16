/**
 * Pantalla de detalles de libro
 * Muestra información detallada sobre un libro específico
 *
 * @module screens/searchScreens/DetailBookScreen
 */
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import RenderHtml from "react-native-render-html";
import { LoadingIndicator } from "../../components/ui/LoadingIndicator";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";
import { AuthContext } from "../../context/AuthContext";
import { useBooks } from "../../context/BooksContext";
import useBookDetails from "../../hooks/useBookDetails";
import reviewService from "../../services/reviewService";
import userBookService from "../../services/userBook";
import styles from "../../styles/DetailBookScreenStyles";
import { formatDate, getLanguageName } from "../../utils/helpers";

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
    // Solo ejecutar si tenemos un ID de usuario y un volumeId
    if (authData?.user?.id && volumeId) {
      console.log("Inicializando datos del libro...");
      const initialize = async () => {
        try {
          await fetchListas();
          await fetchUserReview();
          await checkIfInRead();
          await checkIfInWishlist();
          console.log("Inicialización completada");
        } catch (error) {
          console.error("Error al inicializar los datos:", error);
        }
      };

      initialize();
    }
  }, [authData?.user?.id, volumeId]);

  const fetchListas = async () => {
    try {
      const userBook = await userBookService.getListas(authData.user.id, authData.token);
      setListas((userBook[0] && userBook[0].listasUser) || []);
    } catch (error) {
      console.error("Error al obtener listas:", error.message);
    }
  };

  // Asegurar que options siempre sea un array
  const options = Array.isArray(listas) ? listas : [];

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
  // Normalizar y validar la estructura de datos del libro
  const normalizeBookInfo = (bookDetails) => {
    if (!bookDetails || !bookDetails.volumeInfo) {
      return {
        volumeInfo: {
          title: 'Título no disponible',
          authors: [],
          publishedDate: null,
          description: '',
          categories: [],
          pageCount: 0,
          language: '',
          imageLinks: {}
        }
      };
    }

    const info = bookDetails.volumeInfo;

    // Asegurar que siempre tenemos un objeto volumeInfo completo
    return {
      ...bookDetails,
      volumeInfo: {
        ...info,        title: info.title || 'Título no disponible',
        authors: Array.isArray(info.authors) ? info.authors : [],
        categories: Array.isArray(info.categories) ? info.categories : [],
        description: info.description || '',
        publishedDate: info.publishedDate || null,
        pageCount: info.pageCount || 0,
        language: info.language || '',
        imageLinks: info.imageLinks || {},
        industryIdentifiers: Array.isArray(info.industryIdentifiers) ? info.industryIdentifiers : []
      }
    };
  };

  // Normalizar datos del libro
  const normalizedDetails = normalizeBookInfo(details);
  const info = normalizedDetails.volumeInfo;

  //Preparar objeto de libro para guardar en listas
  const bookData = {
    id: normalizedDetails.id,
    title: info.title,
    authors: info.authors, // Ya normalizado como array
    thumbnail: info.imageLinks?.thumbnail,
    publishedDate: info.publishedDate
  };
  console.log("libro ID: " + bookData.id);
  // Manejar añadir libro a lista
  const handleAddBook = async (listName) => {
    console.log(`handleAddBook llamado con lista: ${listName}`);
    console.log(`Estado actual - isInRead: ${isInRead}, isInWishlist: ${isInWishlist}`);

    try {
      // Validar que tenemos los datos necesarios
      if (!bookData || !bookData.id) {
        console.error("Error: ID del libro no disponible");
        return;
      }      // Lógica para alternar el estado
      if (listName === "Read" && isInRead) {
        console.log("El libro ya está en Read, eliminándolo...");
        await handleRemoveBook("Read");
      }
      else if (listName === "Reading" && isInWishlist) {
        console.log("El libro ya está en Reading, eliminándolo...");
        await handleRemoveBook("Reading");
      }
      else {
        // Agregar a la lista - asegurar que usamos la lista correcta con mayúsculas/minúsculas
        let listaCorrecta = listName;
        if (listName.toLowerCase() === "read") listaCorrecta = "Read";
        if (listName.toLowerCase() === "reading") listaCorrecta = "Reading";
        if (listName.toLowerCase() === "favorites") listaCorrecta = "Favorites";

        console.log(`Agregando libro ID=${bookData.id} a la lista ${listaCorrecta}`);
        await userBookService.addToLista(
          authData.user.id,
          listaCorrecta,
          bookData.id,
          authData.token
        );
        console.log(`Libro agregado exitosamente a ${listName}`);
      }

      // Actualizar estados después de la operación
      console.log("Actualizando estados...");
      await checkIfInRead();
      await checkIfInWishlist();
      console.log(`Estados actualizados - isInRead: ${isInRead}, isInWishlist: ${isInWishlist}`);

    } catch (error) {
      console.error(`Error en handleAddBook para ${listName}:`, error.message);
    }
  };

// Manejar eliminar libro de lista
    const handleRemoveBook = async (list) => {
      try {
        // Normalizar el nombre de la lista (asegurar mayúsculas/minúsculas correctas)
        let listaCorrecta = list;
        if (list.toLowerCase() === "read") listaCorrecta = "Read";
        if (list.toLowerCase() === "reading") listaCorrecta = "Reading";
        if (list.toLowerCase() === "favorites") listaCorrecta = "Favorites";

        console.log(`Eliminando libro de la lista ${listaCorrecta}`);
        await userBookService.removeFromLista(authData.user.id, listaCorrecta, bookData.id, authData.token);
        await checkIfInRead();
        await checkIfInWishlist();
      } catch (error) {
        console.error("Error al eliminar de lista: ", error.message);
      }
    };  async function checkIfInRead() {
    try {
      console.log("Verificando si el libro está en la lista Read...");
      // Asegurarse de que haya un ID de libro disponible
      if (!volumeId) {
        console.warn("No hay ID de libro disponible para verificar Read");
        return false;
      }
      const inList = await userBookService.isInLista(authData.user.id, "Read", volumeId, authData.token);
      console.log("Resultado: ", inList);
      setIsInRead(inList);
      return inList;
    } catch (error) {
      console.error("Error verificando si el libro está en la lista Read:", error.message);
      return false;
    }
  };

  async function checkIfInWishlist() {
    try {
      console.log("Verificando si el libro está en la lista Reading...");
      // Asegurarse de que haya un ID de libro disponible
      if (!volumeId) {
        console.warn("No hay ID de libro disponible para verificar Reading");
        return false;
      }
      const inList = await userBookService.isInLista(authData.user.id, "Reading", volumeId, authData.token);
      console.log("Resultado: ", inList);
      setIsInWishlist(inList);
      return inList;
    } catch (error) {
      console.error("Error verificando si el libro está en la lista Reading:", error.message);
      return false;
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
                {Array.isArray(info.authors) && info.authors.length > 0 && (
                  <Text style={styles.authors}>{info.authors.join(", ")}</Text>
                )}
              </View>
              {info.publishedDate && (
                <Text style={styles.publishedDate}>{formatDate(info.publishedDate)}</Text>
              )}
              {Array.isArray(info.categories) && info.categories.length > 0 && (
                <View style={styles.categoriesContainer}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{info.categories[0]}</Text>
                  </View>
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
            >              <Pressable
                style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
                onPress={() => setVisible(false)}
              >
                <View style={styles.popup}>
                  <Pressable onPress={() => setVisible(false)} style={styles.closeButton}>
                    <Text>×</Text>
                  </Pressable>
                  {Array.isArray(options) && options.length > 2 ?
                    options.slice(2).map((opt, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          handleAddBook(opt);
                          setVisible(false);
                        }}
                      >
                        <Text style={styles.option}>{opt}</Text>
                      </TouchableOpacity>
                    ))
                  : <Text style={styles.option}>No hay listas disponibles</Text>}
                </View>              </Pressable>
            </Modal>
            <Pressable
              onPress={() => {
                console.log('Botón Next presionado, agregando a lista "Reading"');
                handleAddBook("Reading");
              }}
              style={styles.rowItemContainer}>
              <View style={styles.reviewstButtonContainer}>
                {isInWishlist ? (
                  <Image
                  source={require("../../../assets/img/wishlist-icon-active.png")}
                  style={styles.listIcon}
                />
                ) : (
                  <Image
                  source={require("../../../assets/img/wishlist-icon.png")}
                  style={styles.listIcon}
                />
                )}
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
                </TouchableOpacity>              </View>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            {info.description && typeof info.description === 'string' ? (
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
                {Array.isArray(info.industryIdentifiers)
                  ? (info.industryIdentifiers.find((id) => id.type === "ISBN_13")?.identifier ||
                     info.industryIdentifiers.find((id) => id.type === "ISBN_10")?.identifier ||
                     "No disponible")
                  : "No disponible"}
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
