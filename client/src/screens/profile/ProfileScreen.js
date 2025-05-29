import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ProfileStats from "../../components/ProfileStats";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileGraphic from "../../components/ProfileGraphic";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "../../services/asyncStorage";

export default function ProfileScreen() {
  const { setAuthData } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.clearAll();
    setAuthData(null);
  };

  return (
    <View style={styles.profileScreen}>
      <ProfileHeader headerTitle="SETTINGS" />
      <ProfileInfo />
      <ProfileGraphic />
      <ProfileStats />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProfileInfo() {
  return (
    <View
      style={{
        flexDirection: "column",
        height: 180,
        width: 200,
        marginTop: 30,
        marginBottom: 0,
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Image
        source={require("../../../assets/img/profile-picture-sample.png")}
        resizeMode="contain"
        style={{ height: 100, width: 100 }}
      />
      <View
        style={{
          flexDirection: "row",
          height: 20,
          justifyContent: "center",
          alignItems: "space-between"
        }}
      >
        <Text style={{ fontFamily: "Roboto_700Bold", fontSize: 15, paddingRight: 10 }}>
          juan_smith_420
        </Text>
        <Image
          source={require("../../../assets/img/edit-icon.png")}
          resizeMode="contain"
          style={{ height: 18, width: 18 }}
        />
      </View>
      <Text style={{ fontFamily: "Roboto_200ExtraLight", fontSize: 12, textAlign: "justify" }}>
        I'm a 32 year old who enjoys reading classic novels and Argentinian politics like gaturro
        and many others.
      </Text>
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
  editIcon: {
    height: 18,
    width: 18
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
