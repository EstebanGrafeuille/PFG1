import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { useState, useEffect, useContext } from "react";
import authService from "../../services/login";
import { AuthContext } from "../../context/AuthContext";
import asyncStorage from "../../services/asyncStorage";
import { useNavigation } from "@react-navigation/native";

export default function RegisterLoginScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esLogin, setEsLogin] = useState(false);
  const [errors, setErrors] = useState({});

  const { setAuthData } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  }, [esLogin]);

  const HandleLogin = () => {
    //TODO: Llamar al backend (o al servicio de autenticacion elegido) para obtener el token
    authService
      .login(email, password)
      .then((authData) => {
        asyncStorage.storeData("authData", authData);
        setAuthData(authData);
        console.log("Auth data desde registerLoggin handlelogin: ", typeof authData, authData);
      })
      .catch((error) => {
        if (error.type === "validation") {
          setErrors(error.errors);
        }
      });
  };

  const HandleRegister = () => {
    setErrors({}); // Limpiar errores anteriores

    authService
      .register(username, email, password)
      .then((authData) => {
        setAuthData(authData);
        alert(`Welcome ${username}`);
      })
      .catch((error) => {
        if (error.type === "validation") {
          setErrors(error.errors);
          console.log("En registerLoggin");
        } else {
          Alert.alert("", error.message || "Error al registrar.");
        }
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Platform.OS !== "web") Keyboard.dismiss();
      }}
      accessible={false}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.content}>
          <Text style={styles.title}>BookBox</Text>
          {esLogin && (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#999"
              />
              {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            </View>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>
          {errors.general && (
            <Text style={[styles.errorText, { textAlign: "center", marginBottom: 10 }]}>
              {errors.general}
            </Text>
          )}
          <View style={styles.buttonContainer}>
            {!esLogin ? (
              <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={HandleRegister}>
                <Text style={styles.buttonText}>Create account</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setEsLogin(!esLogin)}>
              <Text style={styles.secondaryButtonText}>
                {esLogin ? "I already have an account" : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("ForgotPass")}
          >
            <Text style={styles.secondaryButtonText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    marginBottom: 20
  },
  errorText: {
    color: "red",
    fontSize: 14,
    paddingHorizontal: 15
  }
});
