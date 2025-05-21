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
import authService from '../services/login';
import { AuthContext } from '../context/AuthContext';
import asyncStorage from "../services/asyncStorage";

export default function RegisterLoginScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esLogin, setEsLogin] = useState(false);

  const { setAuthData } = useContext(AuthContext);


  const HandleLogin = () => {
      //TODO: Llamar al backend (o al servicio de autenticacion elegido) para obtener el token
      authService.login(email, password)
      .then((authData) => {
          asyncStorage.storeData("authData", authData)
          setAuthData(authData)
          console.log("Auth data desde registerLoggin handlelogin: ", typeof authData, authData)
      })
      .catch((error) => {
          alert(error)
      })

  }

  const HandleRegister = () => {
    if (email && password && username) {
      authService.register(username, email, password)
        .then((authData) => {
          setAuthData(authData);
          alert(`Bienvenido ${username}`);
        })
        .catch(() => {
          Alert.alert('', 'Error al registrar. Por favor, inténtelo de nuevo.');
          console.log("En registerLoggin");
        });
    } else {
      Alert.alert('', 'Por favor, complete todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>BookBox</Text>
        {esLogin && (
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          {!esLogin ? (
            <TouchableOpacity style={styles.button} onPress={HandleLogin}>
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={HandleRegister}>
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setEsLogin(!esLogin)}
          >
            <Text style={styles.secondaryButtonText}>
              {esLogin ? "Ya tengo cuenta" : "Registrarse"}
            </Text>
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
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 40,
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
    shadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
