import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Image
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import reviewService from "../../services/reviewService";
import ReviewCard from "../../components/ReviewCard";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
              <Image
                source={require("../../../assets/img/back-icon-grey.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
          <Text style={styles.title}>Book reviews</Text>
          <View style={styles.rightSection} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" />
        ) : reviews.length === 0 ? (
          <Text style={styles.emptyText}>There are no reviews for this book yet.</Text>
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ReviewCard review={item} isOwnReview={item.user?._id === authData?.user?._id} />
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingTop: 10
  },
  leftSection: {
    width: 50,
    alignItems: "flex-start",
    paddingLeft: 10
  },
  rightSection: {
    width: 50
  },
  backButton: {
    padding: 8
  },
  icon: {
    height: 16,
    width: 16
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  },
  listContent: {
    paddingBottom: 70
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
  backButtonText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16
  }
});
