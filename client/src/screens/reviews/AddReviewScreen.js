import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native"; // ✅ AGREGADO: Image
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
      Alert.alert("Oops!", "Please write something before submitting your review.");
      return;
    }

    try {
      await reviewService.addReview(volumeId, reviewText, authData.token);
      Alert.alert("Thank you!", "Your review has been saved.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Oops!", "Something went wrong while saving your review.");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Image source={require("../../../assets/img/back-icon-grey.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Write your review</Text>
        <View style={styles.placeholder} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Share your thoughts about this book..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        maxLength={200}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddReview}>
        <Text style={styles.buttonText}>Send review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  backButton: {
    padding: 5
  },
  icon: {
    height: 16,
    width: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center"
  },
  placeholder: {
    width: 34
  },
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
