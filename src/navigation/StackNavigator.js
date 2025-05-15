import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterLoginScreen from '../screens/RegisterLoginScren'
import HomeScreen from '../screens/HomeScreen'


const StackNavigation = () => {
    
    const Stack = createNativeStackNavigator()
    return (
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
    )
}

export default StackNavigation