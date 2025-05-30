import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useState } from 'react';


export default function ProfileInfoEditable() {

    const [isEditingUser, setIsEditingUser] = useState(false);
    const [userName, setUserName] = useState("juan_smith_420");

    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [description, setDescription] = useState("I'm a 32 year old who enjoys reading classic novels and Argentinian politics like gaturro and many others.");

  return (
    <View
      style={{
        flexDirection: "column",
        height: 230,
        width: 200,
        marginTop: 30,
        marginBottom: 0,
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Image
        source={require("../../assets/img/edit-profile-picture.png")}
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
            <View style={{}}>
                {isEditingUser ? (
                    <TextInput
                    value={userName}
                    onChangeText={setUserName}
                    onBlur={() => setIsEditingUser(false)} // Cuando pierde el foco, vuelve al modo "vista"
                    autoFocus
                    style={{ fontFamily: "Roboto_700Bold", fontSize: 15, paddingRight: 10 }}
                    />
                ) : (
                    <TouchableOpacity onPress={() => setIsEditingUser(true)}>
                    <Text style={{ fontFamily: "Roboto_700Bold", fontSize: 15, paddingRight: 10 }}>
                        {userName}
                    </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
            <View style={{}}>
                {isEditingDescription ? (
                    <TextInput
                    value={description}
                    onChangeText={setDescription}
                    onBlur={() => setIsEditingDescription(false)} // Cuando pierde el foco, vuelve al modo "vista"
                    autoFocus
                    style={{ fontFamily: "Roboto_200ExtraLight", fontSize: 12, textAlign: "justify" }}
                    />
                ) : (
                    <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
                    <Text style={{ fontFamily: "Roboto_200ExtraLight", fontSize: 12, textAlign: "justify" }}>
                        {description}
                    </Text>
                    </TouchableOpacity>
                )}
            </View>
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
  },
  container: { padding: 10 },
});