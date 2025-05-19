// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function RegisterLoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text>Login / Registro</Text>
//       <Button title="Ir al Home" onPress={() => navigation.navigate('MainApp', { screen: 'HomeScreen' })} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5'
//   }
// });

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
import authService from '../services/login'
import {AuthContext} from '../context/AuthContext'
import asyncStorage from "../services/asyncStorage";

export default function RegisterLoginScreen() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [esLogin, setEsLogin] = useState(false);


  const { setAuthData } = useContext(AuthContext)

 

  // const HandleLogin = () => {
  //     //TODO: Llamar al backend (o al servicio de autenticacion elegido) para obtener el token
  //     authService.login(email, password)
  //     .then((authData) => {
  //         setAuthData(authData)
  //         console.log("Auth data desde registerLoggin handlelogin: ", typeof authData, authData)
  //     })
  //     .catch((error) => {
  //         alert(error)
  //     })

  // }



const HandleLogin = async () => {
  const fakeUser = {
    name: "Tester",
    email: email || "tester@mail.com",
    token: "faketoken12345"
  };

  try {
    await asyncStorage.storeData("authData", fakeUser); 
    setAuthData(fakeUser); 
    console.log("Login simulado:", fakeUser);
  } catch (error) {
    console.log("Error guardando en AsyncStorage:", error);
  }
};



  const HandleRegister = () => {
    if (email && password && nombre) {
      authService.register(email, password, nombre)
        .then((authData) => {
          setAuthData(authData);
          alert(`Bienvenido ${nombre}`);
        })
        .catch(() => {
          Alert.alert('','Error al registrar. Por favor, inténtelo de nuevo.');
          console.log("En registerLoggin")
        });
    } else {
      Alert.alert('','Por favor, complete todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenido</Text>
          {esLogin && (
            <TextInput
              style={styles.input}
              placeholder="Ingrese su nombre"
              value={nombre}
              onChangeText={setNombre}
              placeholderTextColor={"#ccc"}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Ingrese su email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={"#ccc"}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese su contraseña"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={"#ccc"}
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            {!esLogin ? (
              <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.registerButton} onPress={HandleRegister}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
              </TouchableOpacity> 

            )}
            {!esLogin ? (
              <TouchableOpacity style={styles.registerButton} onPress={() => setEsLogin(true)}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity> 
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => setEsLogin(false)}>
                <Text style={styles.buttonText}>Ya tengo cuenta</Text>
              </TouchableOpacity> 
            )}
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
