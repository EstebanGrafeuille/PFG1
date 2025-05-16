import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet } from 'react-native';
import RegisterLoginScreen from '../screens/RegisterLoginScren';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AddBookScreen from '../screens/AddBookScreen';
import SearchScreen from '../screens/SearchScreen';
import SocialScreen from '../screens/SocialScreen';
import ProfileNavigation from "./ProfileNavigator";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarPosition: 'bottom',
                tabBarStyle: {
                    backgroundColor: "#FFCB20",
                    position: 'absolute',
                    height: 60,
                }
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
                        <Image source={require("../../assets/img/home-icon-1.png")}
                            resizeMode="contain" style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]} />
                    </View>
                )
            }}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
                        <Image source={require("../../assets/img/search-icon.png")}
                            resizeMode="contain" style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]} />
                    </View>
                )
            }}/>
            <Tab.Screen name="AddBookScreen" component={AddBookScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
                        <Image source={require("../../assets/img/bookmark-icon.png")}
                            resizeMode="contain" style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]} />
                    </View>
                )
            }}/>
            <Tab.Screen name="SocialScreen" component={SocialScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
                        <Image source={require("../../assets/img/heart-icon.png")}
                            resizeMode="contain" style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]} />
                    </View>
                )
            }}/>
            <Tab.Screen name="SETTINGS" component={ProfileNavigation} options={{
                tabBarIcon: ({focused}) => (
                    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
                        <Image source={require("../../assets/img/profile-icon.png")}
                        resizeMode="contain" style={[styles.tabIconStyle, focused && styles.tabIconStyleFocused]} />
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}

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
    alignItems: 'center',
    paddingTop: 10,
  },

  tabIconContainerFocused: {
    backgroundColor: "#FFFFFF",
    height: 80,
    width: 45,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  }
});

export default TabNavigation