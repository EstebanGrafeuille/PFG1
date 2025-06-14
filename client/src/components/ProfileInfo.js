import { View, Text, Image, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { profileStyles } from "../styles/ProfileStyles";

export default function ProfileInfo({ userProfileData, isLoading }) {
  const { authData } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    username: authData?.user?.username || "User",
    biography: "",
    image: ""
  });
  const [error, setError] = useState(null);

  // Actualizar el perfil cuando cambian los datos proporcionados por el padre
  useEffect(() => {
    if (userProfileData) {
      setUserProfile({
        username: userProfileData.username || authData?.user?.username,
        biography: userProfileData.biography || "",
        image: userProfileData.image || ""
      });
      setError(null);
    }
  }, [userProfileData, authData]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={profileStyles.profileInfo}>
      {userProfile.image ? (
        <Image
          source={{ uri: userProfile.image }}
          resizeMode="cover"
          style={profileStyles.profileImage}
        />
      ) : (
        <Image
          source={require("../../assets/img/profile-picture-sample.png")}
          resizeMode="contain"
          style={profileStyles.profileImage}
        />
      )}
      <View style={profileStyles.usernameRow}>
        <Text style={profileStyles.username}>{userProfile.username}</Text>
      </View>
      <Text style={profileStyles.bio}>
        {userProfile.biography || "This user hasn’t added a bio yet."}
      </Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10
  }
};
