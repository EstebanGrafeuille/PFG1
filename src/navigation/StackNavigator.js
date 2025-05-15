import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterLoginScreen from '../screens/RegisterLoginScren'
import HomeScreen from '../screens/HomeScreen'
import TabNavigation from "./TabNavigator";

const StackNavigation = () => {

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RegisterLogin" component={RegisterLoginScreen} />
            <Stack.Screen name="MainApp" component={TabNavigation} />
        </Stack.Navigator>
    )
}

export default StackNavigation

/*
<Stack.Navigator>
            <Stack.Screen
            name="RegisterLogin"
            component={RegisterLoginScreen}
            options={
                {headerShown:false}
            }
            />
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={
                {headerShown:false}
            }
            />
        </Stack.Navigator>
*/