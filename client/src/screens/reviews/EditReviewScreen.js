import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import reviewService from "../../services/reviewService"; // 👈 usamos el service correcto
import { AuthContext } from "../../context/AuthContext";

const EditReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { volumeId, review } = route.params;

  const { authData } = useContext(AuthContext);
  const [reviewText, setReviewText] = useState(review.comment);
  const [loading, setLoading] = useState(false);

  const handleUpdateReview = async () => {
    try {
      setLoading(true);
      await reviewService.update(review._id, authData.user.id, { comment: reviewText });
      Alert.alert("Listo", "Reseña actualizada");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la reseña");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    try {
      setLoading(true);
      await reviewService.remove(review._id, authData.user.id);
      Alert.alert("Listo", "Reseña eliminada");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar la reseña");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TextInput
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          placeholder="Editá tu reseña..."
          numberOfLines={6}
          style={styles.textInput}
        />
        <Button title="Actualizar Reseña" onPress={handleUpdateReview} disabled={loading} />
        <Button title="Eliminar Reseña" onPress={handleDeleteReview} color="red" disabled={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    padding: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: "top"
  }
});
