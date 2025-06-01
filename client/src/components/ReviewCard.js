import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ReviewCard = ({ review, isOwnReview, onEdit, onDelete }) => {
  return (
    <View style={[styles.card, isOwnReview && styles.ownReview]}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/img/profile-picture-sample.png")}
          style={styles.avatar}
        />
        <Text style={styles.username}>{review.user?.username || "Anónimo"}</Text>
      </View>

      <Text style={styles.comment}>{review.comment}</Text>

      {isOwnReview && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(review)} style={styles.button}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(review)} style={[styles.button, styles.deleteButton]}>
            <Text style={[styles.buttonText, styles.deleteText]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2
  },
  ownReview: {
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "#fffbe6"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10
  },
  username: {
    fontWeight: "bold",
    fontSize: 14
  },
  comment: {
    fontSize: 14,
    color: "#333"
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
    gap: 10
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#e0e0e0"
  },
  buttonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333"
  },
  deleteButton: {
    backgroundColor: "#ffcccc"
  },
  deleteText: {
    color: "#cc0000"
  }
});

export default ReviewCard;




