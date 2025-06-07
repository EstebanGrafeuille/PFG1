import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import reviewService from "../../services/reviewService";
import { AuthContext } from "../../context/AuthContext";

const EditReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { volumeId, review } = route.params;

  const { authData } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState(review.comment);
  const [loading, setLoading] = useState(false);

  const handleUpdateReview = async () => {
    if (!reviewText.trim()) {
Alert.alert("Error", "Review cannot be empty");
      return;
    }
    try {
      setLoading(true);
      await reviewService.updateReview(review._id, reviewText, authData.token);
Alert.alert("Done", "Review updated");
      navigation.goBack();
    } catch (error) {
Alert.alert("Error", "Failed to update the review");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    try {
      setLoading(true);
      await reviewService.deleteReview(review._id, authData.token);
Alert.alert("Done", "Review deleted");
      navigation.goBack();
    } catch (error) {
Alert.alert("Error", "Failed to delete the review");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit your review</Text>
      <TextInput
        style={styles.input}
placeholder="Update your thoughts about this book..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        maxLength={200}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.disabled]}
        onPress={handleUpdateReview}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Update review</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton, loading && styles.disabled]}
        onPress={handleDeleteReview}
        disabled={loading}
      >
        <Text style={[styles.buttonText, styles.deleteText]}>Delete review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditReviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    minHeight: 120,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9"
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: { fontWeight: "bold", fontSize: 16, color: "#000" },
  deleteButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff4d4d"
  },
  deleteText: {
    color: "#ff4d4d"
  },
  disabled: {
    opacity: 0.6
  }
});
