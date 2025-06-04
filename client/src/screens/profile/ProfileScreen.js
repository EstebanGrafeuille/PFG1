import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable
} from "react-native";
import ProfileStats from "../../components/ProfileStats";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileGraphic from "../../components/ProfileGraphic";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "../../services/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import ProfileInfo from "../../components/ProfileInfo";

export default function ProfileScreen() {
  const { setAuthData } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.clearAll();
    setAuthData(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.profileScreen}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileHeader headerTitle="SETTINGS" />
        <View style={styles.editIconExtraContainer}>
          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.editIconContainer}
          >
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  scroll: {
    flex: 1
  },
  profileScreen: {
    alignItems: "center",
    paddingBottom: 40,
    backgroundColor: "#f5f5f5"
  },
  editIconExtraContainer: {
    height: 0,
    width: 330,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  editIconContainer: {
    marginTop: 30,
    height: 28,
    width: 28
  },
  editIcon: {
    height: "100%",
    width: "100%"
  },
  bio: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: 12,
    textAlign: "justify"
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
