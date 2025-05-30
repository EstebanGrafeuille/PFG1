import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import ProfileStats from "../../components/ProfileStats";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileGraphic from "../../components/ProfileGraphic";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "../../services/asyncStorage";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProfileInfoEditable from "../../components/ProfileInfoEditable";

export default function EditProfileScreen() {
  const { setAuthData } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.clearAll();
    setAuthData(null);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.profileScreen}>
      <ProfileHeader headerTitle="SETTINGS" />
      <View style={styles.goBackContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.goBackContainerExtra}>
            <View style={styles.buttonContainer}>
                <Image source={require("../../../assets/img/back-icon-grey.png")} style={styles.goBack}/>
            </View>
        </Pressable>
        <Text style={styles.infoText}>Press each field to edit it...</Text>
        <View style={{width: 28}}></View>
      </View>
      <ProfileInfoEditable />
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
  goBackContainer: {
    height: 20,
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  goBackContainerExtra: {
  },
  goBack: {
    height: 28,
    width: 28
  },
  infoText: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: 15,
    paddingRight: 10,
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
  logoutButton: {
    marginTop: 50,
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
