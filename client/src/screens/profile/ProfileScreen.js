import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  RefreshControl
} from "react-native";
import ProfileStats from "../../components/ProfileStats";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileGraphic from "../../components/ProfileGraphic";
import { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "../../services/asyncStorage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import ProfileInfo from "../../components/ProfileInfo";
import { profileStyles } from "../../styles/ProfileStyles";
import { getUserProfile } from "../../services/userService";

export default function ProfileScreen() {
  const { authData, setAuthData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      // Verificar si hay sesión activa
      const authDataCurrent = await AsyncStorage.getData('authData');
      if (!authDataCurrent || !authDataCurrent.token) {
        console.log("No hay sesión activa en fetchUserProfile");
        setLoading(false);
        return;
      }
      
      const userId = authDataCurrent?.user?.id || authDataCurrent?.user?._id;
      if (!userId) {
        console.log("No se encontró ID de usuario en ProfileScreen");
        setLoading(false);
        return;
      }

      console.log("ProfileScreen: Obteniendo perfil con ID:", userId);
      const userData = await getUserProfile(userId);
      setUserProfileData(userData);
      
      // Guardar en caché
      await AsyncStorage.storeData("userProfileCache", {
        data: userData,
        timestamp: Date.now()
      });
      
      console.log("ProfileScreen: Perfil actualizado y guardado en caché");
    } catch (error) {
      console.error("Error al cargar perfil en ProfileScreen:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Cargar datos cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          // Intentar cargar desde caché primero
          const cachedData = await AsyncStorage.getData("userProfileCache");
          
          // Si hay datos en caché y son recientes (menos de 5 minutos)
          const isCacheValid = cachedData && 
                              cachedData.timestamp && 
                              (Date.now() - cachedData.timestamp < 5 * 60 * 1000);
          
          if (isCacheValid) {
            console.log("ProfileScreen: Usando datos de caché");
            setUserProfileData(cachedData.data);
            setLoading(false);
          }
          
          // Siempre actualizar desde el servidor, incluso si usamos caché inicialmente
          fetchUserProfile();
        } catch (error) {
          console.error("Error al cargar datos de perfil:", error);
          setLoading(false);
        }
      };
      
      loadProfileData();
    }, [fetchUserProfile])
  );

  const handleLogout = async () => {
    // Limpiar todos los datos de AsyncStorage
    await AsyncStorage.clearAll();
    setAuthData(null);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      fetchUserProfile();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setRefreshing(false);
    }
  }, [fetchUserProfile]);

  return (
    <SafeAreaView style={profileStyles.safeArea}>
      <ScrollView
        style={profileStyles.scroll}
        contentContainerStyle={profileStyles.profileScreen}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileHeader headerTitle="PERFIL" />
        <View style={profileStyles.editIconExtraContainer}>
          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={profileStyles.editIconContainer}
          >
            <Image
              source={require("../../../assets/img/settings-icon.png")}
              resizeMode="contain"
              style={profileStyles.editIcon}
            />
          </Pressable>
        </View>
        <ProfileInfo 
          key={refreshing ? "refresh" : "normal"} 
          userProfileData={userProfileData} 
          isLoading={loading} 
        />
        <ProfileGraphic />
        <ProfileStats />
        <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
          <Text style={profileStyles.logoutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}