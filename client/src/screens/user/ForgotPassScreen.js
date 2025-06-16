import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { useState } from "react";
import authService from "../../services/login";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassScreen() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [haveCode, setHaveCode] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const HandleForgotPass = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrors({ email: "Email is required" });
      return;
    }

    setErrors({});

    authService
      .forgotPassword(trimmedEmail)
      .then(() => {
        Alert.alert("Code sent", "Check your email inbox");
        setHaveCode(true);
      })
      .catch((error) => {
        if (error?.errors) {
          setErrors(error.errors);
        } else {
          Alert.alert("Error", error.message || "Failed to send the code");
        }
      });
  };

  const HandleResetPass = () => {
    const trimmedEmail = email.trim();
    const trimmedCode = code.trim();
    const trimmedPassword = password.trim();

    const fieldErrors = {};
    if (!trimmedEmail) fieldErrors.email = "Email is required";
    if (!trimmedCode) fieldErrors.code = "Code is required";
    if (!trimmedPassword) fieldErrors.password = "Password is required";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    authService
      .resetPassword(trimmedEmail, trimmedCode, trimmedPassword)
      .then(() => {
        Alert.alert("Password updated", "You can now log in");
        setHaveCode(false);
        setPassword("");
        setCode("");
        navigation.navigate("RegisterLogin");
      })
      .catch((error) => {
        if (error.errors) {
          setErrors(error.errors);
        } else {
          Alert.alert("Error", error.message || "Failed to change the password");
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

          {haveCode ? (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Code"
                  value={code}
                  onChangeText={setCode}
                  placeholderTextColor="#999"
                />
                {errors.code && <Text style={styles.errorText}>{errors.code}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="New password"
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#999"
                  secureTextEntry
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>
                Please enter your registered email so we can send you a verification code
              </Text>
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
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
              </View>
            </>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={haveCode ? HandleResetPass : HandleForgotPass}
            >
              <Text style={styles.buttonText}>
                {haveCode ? "Change password" : "Send to email"}
              </Text>
            </TouchableOpacity>

            {haveCode && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                  setCode("");
                  setPassword("");
                  setErrors({});
                  setHaveCode(false);
                }}
              >
                <Text style={styles.secondaryButtonText}>Request code again</Text>
              </TouchableOpacity>
            )}
          </View>
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
  inputContainer: {
    marginBottom: 20
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
  },
  errorText: {
    color: "red",
    fontSize: 14,
    paddingHorizontal: 15
  }
});
