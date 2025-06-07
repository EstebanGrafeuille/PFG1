import { StyleSheet } from "react-native";
import Colors from "../constants/colors";
import Layout from "../constants/layout";

export const profileStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND
  },
  scroll: {
    flex: 1
  },
  profileScreen: {
    alignItems: "center",
    paddingBottom: Layout.SPACING.XL,
    backgroundColor: Colors.BACKGROUND
  },
  editIconExtraContainer: {
    height: 0,
    width: 330,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  editIconContainer: {
    marginTop: Layout.SPACING.L,
    height: Layout.SPACING.M,
    width: Layout.SPACING.M
  },
  editIcon: {
    height: "100%",
    width: "100%"
  },
  goBackContainer: {
    height: Layout.SPACING.L,
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Layout.SPACING.M
  },
  goBackContainerExtra: {},
  goBack: {
    height: Layout.SPACING.M,
    width: Layout.SPACING.M
  },
  infoText: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: Layout.FONT_SIZE.M,
    paddingRight: Layout.SPACING.S
  },
  profileInfo: {
    flexDirection: "column",
    height: 180,
    width: 200,
    marginTop: Layout.SPACING.L,
    justifyContent: "space-between",
    alignItems: "center"
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: Layout.BORDER_RADIUS.ROUND
  },
  usernameRow: {
    flexDirection: "row",
    height: Layout.SPACING.L,
    justifyContent: "center",
    alignItems: "center"
  },
  username: {
    fontFamily: "Roboto_700Bold",
    fontSize: Layout.FONT_SIZE.M,
    paddingRight: Layout.SPACING.S
  },
  bio: {
    fontFamily: "Roboto_200ExtraLight",
    fontSize: Layout.FONT_SIZE.S,
    textAlign: "justify"
  },
  logoutButton: {
    marginTop: Layout.SPACING.L,
    backgroundColor: Colors.ERROR,
    paddingHorizontal: Layout.SPACING.L,
    paddingVertical: Layout.SPACING.M,
    borderRadius: Layout.BORDER_RADIUS.M,
    marginBottom: Layout.SPACING.XXL
  },
  logoutText: {
    color: Colors.WHITE,
    fontSize: Layout.FONT_SIZE.L,
    fontFamily: "Roboto_700Bold"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Layout.SPACING.M
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: Layout.SPACING.S,
    paddingHorizontal: Layout.SPACING.L,
    borderRadius: Layout.BORDER_RADIUS.S,
    marginHorizontal: Layout.SPACING.S
  },
  cancelButton: {
    backgroundColor: Colors.ERROR,
    paddingVertical: Layout.SPACING.S,
    paddingHorizontal: Layout.SPACING.L,
    borderRadius: Layout.BORDER_RADIUS.S,
    marginHorizontal: Layout.SPACING.S
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "Roboto_500Medium",
    fontSize: Layout.FONT_SIZE.S,
    textAlign: "center"
  }
});
