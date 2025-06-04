import { View, Text, StyleSheet } from "react-native";

export default function AddBookScreen() {
  return (
    <View style={styles.container}>
      <Text>Proximamente...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  }
});
