import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert
} from "react-native";
import { useState, useContext } from "react";
import authService from "../../services/login";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [haveCode, setHaveCode] = useState(false);
  const navigation = useNavigation();

  const HandleForgotPass = () => {
    if (!email) {
      Alert.alert("Error, ingresa un correo elecronico");
    }

    authService
      .forgotPassword(email)
      .then((res) => {
        Alert.alert("Codigo enviado, revisa tu correo electrinico");
        setHaveCode(true);
      })
      .catch((error) => {
        Alert.alert("Error", error.message || "No se pudo enviar el codigo");
      });
  };

  const HandleResetPass = () => {
    if (!email || !username || !password) {
      Alert.alert("Error", "Completá todos los campos");
      return;
    }

    authService
      .resetPassword(email, username, password)
      .then(() => {
        Alert.alert("Contraseña actualizada", "Ya podés iniciar sesión");
        setHaveCode(false); // vuelve a la vista inicial
        setPassword("");
        setUsername("");
        navigation.navigate("RegisterLogin");
      })
      .catch((error) => {
        Alert.alert("Error", error.message || "No se pudo cambiar la contraseña");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>BookBox</Text>
        {haveCode ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Codigo"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Nueva contraseña"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
              secureTextEntry
            />
          </>
        ) : (
          <>
            <Text style={styles.infoText}>
              Por favor ingresa tu correo registrado para que podamos enviarte un codigo de
              verificación
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
          </>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={haveCode ? HandleResetPass : HandleForgotPass}
          >
            <Text style={styles.buttonText}>
              {haveCode ? "Cambiar contraseña" : "Enviar a correo electronico"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => setHaveCode(!haveCode)}>
            <Text style={styles.secondaryButtonText}>{haveCode && "Volver a pedir codigo"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center"
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    justifyContent: "center"
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 40
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  buttonContainer: {
    marginTop: 10
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 12
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 14,
    textDecorationLine: "underline"
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    textAlign: "center"
  }
});
