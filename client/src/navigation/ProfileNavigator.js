import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ListsBooksScreen from "../screens/profile/ListsBooksScreen";
import ReadBooksScreen from "../screens/profile/ReadBooksScreen";
import WishlistScreen from "../screens/profile/WishlistScreen";

const ProfileNavigation = () => {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileSettings" component={ProfileScreen} />
            <Stack.Screen name="ReadBooks" component={ReadBooksScreen} />
            <Stack.Screen name="ListsBooks" component={ListsBooksScreen} />
            <Stack.Screen name="WishlistBooks" component={WishlistScreen} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation


// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Text, Image, StyleSheet } from 'react-native';
// import RegisterLoginScreen from '../screens/RegisterLoginScren';

// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';
// import ReadBooksScreen from '../screens/profile/ReadBooksScreen'
// import ListsBooksScreen from '../screens/profile/ListsBooksScreen'
// import WishlistScreen from '../screens/profile/WishlistScreen'

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// const ProfileTabNavigation = () => {

//     return (
//         <Tab.Navigator
//             screenOptions={{
//                 tabBarShowLabel: true,
//                 tabBarPosition: 'top',
//                 tabBarStyle: {
//                     backgroundColor: "#FFCB20",
//                     position: 'absolute',
//                     height: 60,
//                     width: 150
//                 }
//             }}
//         >
//             <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
//             <Tab.Screen name="ReadBooksScreen" component={ReadBooksScreen} />
//             <Tab.Screen name="ListsBooksScreen" component={ListsBooksScreen} />
//             <Tab.Screen name="WishlistScreen" component={WishlistScreen} />
//         </Tab.Navigator>
//     )
// }

// export default ProfileTabNavigation