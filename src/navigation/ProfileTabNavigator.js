import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet } from 'react-native';
import RegisterLoginScreen from '../screens/RegisterLoginScren';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReadBooksScreen from '../screens/ReadBooksScreen'
import ListsBooksScreen from '../screens/ListsBooksScreen'
import WishlistScreen from '../screens/WishlistScreen'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const ProfileTabNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: true,
                tabBarPosition: 'top',
                tabBarStyle: {
                    backgroundColor: "#FFCB20",
                    position: 'absolute',
                    height: 60,
                    width: 150
                }
            }}
        >
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
            <Tab.Screen name="ReadBooksScreen" component={ReadBooksScreen} />
            <Tab.Screen name="ListsBooksScreen" component={ListsBooksScreen} />
            <Tab.Screen name="WishlistScreen" component={WishlistScreen} />
        </Tab.Navigator>
    )
}

export default ProfileTabNavigation