import { 
  View, 
  Text, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateUserProfile, updateUserImage } from "../services/userService";
import * as ImagePicker from 'expo-image-picker';
import { profileStyles } from "../styles/ProfileStyles";

export default function ProfileInfoEditable() {
  const { authData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Estados para edición
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userName, setUserName] = useState(authData?.user?.username || "");
  
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState("");
  
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Usar id en lugar de _id ya que el backend devuelve id
      const userId = authData?.user?.id || authData?.user?._id;
      if (!userId) {
        console.log("No se encontró ID de usuario en authData:", authData);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        console.log("Obteniendo perfil con ID:", userId);
        const userData = await getUserProfile(userId);
        
        setUserName(userData.username || authData?.user?.username);
        setDescription(userData.biography || "");
        setProfileImage(userData.image || null);
        
        console.log("Perfil cargado correctamente:", userData);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        setError("No se pudo cargar la información del perfil");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [authData]);

  const handleUpdateUsername = async () => {
    if (!userName.trim()) {
      Alert.alert("Error", "El nombre de usuario no puede estar vacío");
      return;
    }
    
    // Usar id en lugar de _id ya que el backend devuelve id
    const userId = authData?.user?.id || authData?.user?._id;
    if (!userId) {
      console.error("No se puede identificar al usuario para actualizar nombre:", authData);
      Alert.alert("Error", "No se puede identificar al usuario");
      return;
    }
    
    try {
      setIsSaving(true);
      setError(null);
      
      console.log("Actualizando nombre de usuario con ID:", userId);
      const updatedUser = await updateUserProfile(userId, { 
        username: userName 
      });
      
      console.log("Usuario actualizado:", updatedUser);
      
      // Actualizar el contexto de autenticación si es necesario
      if (updatedUser && authData) {
        const newAuthData = {
          ...authData,
          user: {
            ...authData.user,
            username: updatedUser.username
          }
        };
        // Si tienes una función para actualizar el contexto de autenticación, úsala aquí
        // Por ejemplo: updateAuthContext(newAuthData);
      }
      
      Alert.alert("Éxito", "Nombre de usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar nombre de usuario:", error);
      setError("No se pudo actualizar el nombre de usuario");
      Alert.alert("Error", error.message || "No se pudo actualizar el nombre de usuario");
    } finally {
      setIsSaving(false);
      setIsEditingUser(false);
    }
  };

  const handleUpdateDescription = async () => {
    // Usar id en lugar de _id ya que el backend devuelve id
    const userId = authData?.user?.id || authData?.user?._id;
    if (!userId) {
      console.error("No se puede identificar al usuario:", authData);
      Alert.alert("Error", "No se puede identificar al usuario");
      return;
    }
    
    try {
      setIsSaving(true);
      setError(null);
      
      console.log("Actualizando biografía para usuario ID:", userId);
      // Enviamos solo el campo biography sin username ni email
      const updatedUser = await updateUserProfile(userId, { 
        biography: description 
      });
      
      console.log("Biografía actualizada:", updatedUser);
      Alert.alert("Éxito", "Descripción actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar descripción:", error);
      setError("No se pudo actualizar la descripción");
      Alert.alert("Error", error.message || "No se pudo actualizar la descripción");
    } finally {
      setIsSaving(false);
      setIsEditingDescription(false);
    }
  };

  const pickImage = async () => {
    // Usar id en lugar de _id ya que el backend devuelve id
    const userId = authData?.user?.id || authData?.user?._id;
    if (!userId) {
      console.error("No se puede identificar al usuario para actualizar imagen:", authData);
      Alert.alert("Error", "No se puede identificar al usuario");
      return;
    }
    
    // Mostrar opciones al usuario
    Alert.alert(
      "Cambiar imagen de perfil",
      "Elige una opción:",
      [
        {
          text: "Generar avatar automático",
          onPress: async () => {
            try {
              setIsSaving(true);
              setError(null);
              
              const username = authData?.user?.username || "User";
              console.log("Generando avatar para:", username);
              
              const updatedUser = await updateUserImage(userId);
              console.log("Imagen actualizada:", updatedUser);
              setProfileImage(updatedUser.image);
              Alert.alert("Éxito", "Avatar generado correctamente");
            } catch (error) {
              console.error("Error al generar avatar:", error);
              setError("No se pudo generar el avatar");
              Alert.alert("Error", "No se pudo generar el avatar");
            } finally {
              setIsSaving(false);
            }
          }
        },
        {
          text: "Usar imagen personalizada",
          onPress: async () => {
            try {
              const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
              
              if (!permissionResult.granted) {
                Alert.alert("Permiso denegado", "Necesitamos permiso para acceder a tus fotos");
                return;
              }
              
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaType: ["image"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.2, // Reducir calidad para disminuir tamaño
                base64: true,
                exif: false, // No incluir datos EXIF para reducir tamaño
              });
              
              if (!result.canceled && result.assets && result.assets[0]) {
                setIsSaving(true);
                setError(null);
                
                const base64Image = result.assets[0].base64;
                
                if (!base64Image) {
                  Alert.alert("Error", "No se pudo obtener la imagen en formato base64");
                  setIsSaving(false);
                  return;
                }
                
                console.log("Imagen seleccionada y convertida a base64");
                
                try {
                  // Usar una URL externa para imágenes grandes
                  if (base64Image.length > 100000) {
                    console.log("Imagen demasiado grande, usando avatar generado");
                    const username = authData?.user?.username || "User";
                    const randomColor = Math.floor(Math.random()*16777215).toString(16);
                    const avatarUrl = "https://ui-avatars.com/api/?name=" + 
                      encodeURIComponent(username) + 
                      "&background=" + randomColor + "&color=fff&size=200";
                    
                    const updatedUser = await updateUserImage(userId, avatarUrl);
                    console.log("Avatar generado en lugar de imagen grande");
                    setProfileImage(updatedUser.image);
                    Alert.alert("Aviso", "La imagen seleccionada era demasiado grande. Se ha generado un avatar en su lugar.");
                  } else {
                    // Crear una URL de datos con la imagen en base64
                    const dataUrl = `data:image/jpeg;base64,${base64Image}`;
                    
                    const updatedUser = await updateUserImage(userId, dataUrl);
                    console.log("Imagen actualizada:", updatedUser);
                    setProfileImage(updatedUser.image);
                    Alert.alert("Éxito", "Imagen de perfil actualizada correctamente");
                  }
                } catch (error) {
                  console.error("Error al actualizar imagen:", error);
                  setError("No se pudo actualizar la imagen de perfil");
                  Alert.alert("Error", "No se pudo actualizar la imagen de perfil");
                } finally {
                  setIsSaving(false);
                }
              }
            } catch (error) {
              console.error("Error al seleccionar imagen:", error);
              setIsSaving(false);
              Alert.alert("Error", "Ocurrió un problema al seleccionar la imagen");
            }
          }
        },
        {
          text: "Cancelar",
          style: "cancel"
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} disabled={isSaving}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={profileStyles.profileImage}
          />
        ) : (
          <Image
            source={require("../../assets/img/edit-profile-picture.png")}
            resizeMode="contain"
            style={profileStyles.profileImage}
          />
        )}
      </TouchableOpacity>
      
      <View style={profileStyles.usernameRow}>
        {isEditingUser ? (
          <View style={styles.editContainer}>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={styles.usernameInput}
              autoFocus
            />
            <TouchableOpacity 
              onPress={handleUpdateUsername}
              style={profileStyles.saveButton}
              disabled={isSaving}
            >
              <Text style={profileStyles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsEditingUser(true)}>
            <Text style={profileStyles.username}>
              {userName}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.descriptionContainer}>
        {isEditingDescription ? (
          <View style={styles.editContainer}>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.descriptionInput}
              multiline
              numberOfLines={4}
              autoFocus
            />
            <TouchableOpacity 
              onPress={handleUpdateDescription}
              style={profileStyles.saveButton}
              disabled={isSaving}
            >
              <Text style={profileStyles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
            <Text style={profileStyles.bio}>
              {description || "Añade una descripción..."}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {isSaving && (
        <View style={styles.savingOverlay}>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={styles.savingText}>Guardando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "column",
    width: 250,
    marginTop: 30,
    marginBottom: 0,
    justifyContent: "space-between",
    alignItems: "center"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  editContainer: {
    width: '100%',
    alignItems: 'center'
  },
  usernameInput: {
    fontFamily: "Roboto_700Bold",
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    width: 150
  },
  descriptionContainer: {
    width: '100%',
    marginTop: 10
  },
  descriptionInput: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: 12,
    textAlign: "justify",
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    height: 80,
    width: '100%'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  savingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  savingText: {
    color: '#ffffff',
    marginTop: 10,
    fontFamily: "Roboto_500Medium"
  }
};