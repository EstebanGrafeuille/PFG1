import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
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
  goBackContainer: {
    height: 20,
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  goBackContainerExtra: {},
  goBack: {
    height: 28,
    width: 28
  },
  infoText: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: 15,
    paddingRight: 10
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
    width: 100,
    borderRadius: 50
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
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 120
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto_700Bold"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5
  },
  buttonText: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 14,
    textAlign: "center"
  }
});
