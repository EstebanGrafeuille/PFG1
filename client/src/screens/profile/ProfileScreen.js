import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Alert } from "react-native";
import ProfileStats from "../../components/ProfileStats";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileGraphic from "../../components/ProfileGraphic";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "../../services/asyncStorage";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProfileInfo from "../../components/ProfileInfo";

export default function ProfileScreen() {
  const { setAuthData } = useContext(AuthContext);
  
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.clearAll();
    setAuthData(null);
  };

  return (
    <View style={styles.profileScreen}>
      <ProfileHeader headerTitle="SETTINGS" />
      <View style={styles.editIconExtraContainer}>
        <Pressable onPress={() => navigation.navigate("EditProfile")}
          style={styles.editIconContainer}>
            <Image
              source={require("../../../assets/img/settings-icon.png")}
              resizeMode="contain"
              style={styles.editIcon}
            />
        </Pressable>
      </View>
      <ProfileInfo />
      <ProfileGraphic />
      <ProfileStats />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileScreen: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 40
  },
  profileInfo: {
    flexDirection: "column",
    height: 180,
    width: 200,
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center"
  },
  profileImage: {
    height: 100,
    width: 100
  },
  usernameRow: {
    flexDirection: "row",
    height: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  username: {
    fontFamily: "Roboto_700Bold",
    fontSize: 15,
    paddingRight: 10
  },
  editIconExtraContainer: {
    height: 0,
    width: 330,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editIconContainer: {
    marginTop: 30,
    height: 28,
    width: 28,
  },
  editIcon: {
    height: "100%",
    width: "100%",
  },
  bio: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: 12,
    textAlign: "justify"
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#d9534f",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto_700Bold"
  }
});
