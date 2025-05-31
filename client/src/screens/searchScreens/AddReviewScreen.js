import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import reviewService from "../../services/reviewService";
import { AuthContext } from "../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddReviewScreen() {
  const [reviewText, setReviewText] = useState("");
  const navigation = useNavigation();
  const { params } = useRoute();
  const { volumeId } = params;
  const { authData } = useContext(AuthContext);

  const handleAddReview = async () => {
    if (!reviewText.trim()) {
      Alert.alert("Error", "La reseña no puede estar vacía.");
      return;
    }

    try {
      await reviewService.addReview(volumeId, reviewText, authData.token);
      Alert.alert("Reseña guardada", "Gracias por tu opinión.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar la reseña.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Escribí tu reseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribí algo sobre este libro..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        maxLength={200}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddReview}>
        <Text style={styles.buttonText}>Enviar reseña</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
  buttonText: { fontWeight: "bold", fontSize: 16, color: "#000" }
});
