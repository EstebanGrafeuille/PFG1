import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Pressable
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import reviewService from "../../services/reviewService";
import ReviewCard from "../../components/ReviewCard";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";


export default function ReviewListScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { volumeId } = params;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authData } = useContext(AuthContext);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewService.getReviewsByBook(volumeId);
        setReviews(res.data || []);
      } catch (err) {
        console.error("Error al obtener reseñas:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [volumeId]);

  const handleEdit = (review) => {
    console.log("Editar reseña:", review);
    // Lógica futura para editar
  };

  const handleDelete = (review) => {
    console.log("Eliminar reseña:", review);
    // Lógica futura para eliminar
  };



  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={styles.buttonContainer}>
          <Image
            source={require("../../../assets/img/back-icon-white.png")}
            style={styles.icon}
          />
        </View>
      </Pressable>

      <Text style={styles.title}>Reseñas del libro</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : reviews.length === 0 ? (
        <Text style={styles.emptyText}>Todavía no hay reseñas para este libro.</Text>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ReviewCard
              review={item}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  list: {
    paddingBottom: 20
  },
  reviewCard: {
    padding: 15,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    marginBottom: 10
  },
  reviewer: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5
  },
  comment: {
    fontSize: 15,
    color: "#333"
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#777"
  },
  backButton: {
    marginBottom: 10
  },
  backButtonText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16
  },
  buttonContainer: {
    height: 16,
    width: 16,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20,
  },
    icon: {
    height: "100%",
    width: "100%",

  },
});
