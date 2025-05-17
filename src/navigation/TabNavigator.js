import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native';
import RegisterLoginScreen from '../screens/RegisterLoginScren'

import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AddBookScreen from '../screens/AddBookScreen'
import SocialScreen from '../screens/SocialScreen'
import SearchStackNavigator from "./SearchStackNavigator";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});

const TabNavigation = () => {

    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 15,
                    height: 15
                }
            }}
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="Search"       component={ SearchStackNavigator } />
            <Tab.Screen name="AddBookScreen" component={AddBookScreen} />
            <Tab.Screen name="SocialScreen" component={SocialScreen} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigation