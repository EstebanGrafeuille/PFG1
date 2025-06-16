import React, { useState, useCallback, useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  RefreshControl
} from "react-native";
import ProfileHeader from "../../components/ProfileHeader";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "../../services/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import ProfileInfoEditable from "../../components/ProfileInfoEditable";
import { profileStyles } from "../../styles/ProfileStyles";

export default function EditProfileScreen() {
  const { setAuthData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.clearAll();
    setAuthData(null);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Forzar recarga de componentes
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={profileStyles.scroll}
          contentContainerStyle={profileStyles.profileScreen}
          keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <ProfileHeader headerTitle="EDIT PROFILE" />
          <View style={profileStyles.goBackContainer}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={profileStyles.goBackContainerExtra}
            >
              <View style={styles.buttonContainer}>
                <Image
                  source={require("../../../assets/img/back-icon-grey.png")}
                  style={profileStyles.goBack}
                />
              </View>
            </Pressable>
            <Text style={profileStyles.infoText}>Tap a field to make changes</Text>
            <View style={{ width: 28 }}></View>
          </View>

          <ProfileInfoEditable key={refreshing ? "refresh" : "normal"} />

          <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
            <Text style={profileStyles.logoutText}>Sign out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  buttonContainer: {
    width: 28,
    height: 28
  }
});
