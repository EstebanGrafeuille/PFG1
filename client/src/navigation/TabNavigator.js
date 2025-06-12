import { View, Image, StyleSheet } from "react-native";

import AddBookScreen from "../screens/AddBookScreen";
import SocialScreen from "../screens/SocialScreen";
import ProfileNavigation from "./tabs/profile/ProfileNavigator";
import SearchStackNavigator from "./tabs/SearchStackNavigator";
import HomeStackNavigator from "./tabs/HomeStackNavigator";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarPosition: "bottom",
        tabBarStyle: {
          backgroundColor: "#FFCB20",
          position: "absolute",
          height: 60,
          paddingLeft: 5,
          paddingRight: 5
        }
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
              <Image
                source={require("../../assets/img/home-icon-1.png")}
                resizeMode="contain"
                style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
              <Image
                source={require("../../assets/img/search-icon.png")}
                resizeMode="contain"
                style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]}
              />
            </View>
          )
        }}
      />
      {/* <Tab.Screen
        name="AddBookScreen"
        component={AddBookScreen} // No se renderiza nada
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
              <Image
                source={require("../../assets/img/bookmark-icon.png")}
                resizeMode="contain"
                style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]}
              />
            </View>
          )
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Evita Navegacion
          }
        }}
      /> */}
      <Tab.Screen
        name="SocialScreen"
        component={SocialScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
              <Image
                source={require("../../assets/img/heart-icon.png")}
                resizeMode="contain"
                style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="SETTINGS"
        component={ProfileNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
              <Image
                source={require("../../assets/img/profile-icon.png")}
                resizeMode="contain"
                style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 25,
    height: 25,
    tintColor: "#FFFFFF"
  },
  tabIconStyleFocused: {
    tintColor: "#1D1B20"
  },

  tabIconContainer: {
    alignItems: "center",
    paddingTop: 10
  },

  tabIconContainerFocused: {
    backgroundColor: "#FFFFFF",
    height: 80,
    width: 45,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
});

export default TabNavigation;
