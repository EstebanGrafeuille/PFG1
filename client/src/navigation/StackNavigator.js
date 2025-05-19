// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import RegisterLoginScreen from '../screens/RegisterLoginScren'
// import TabNavigation from "./TabNavigator";

// const StackNavigation = () => {

//     const Stack = createNativeStackNavigator()
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="RegisterLogin" component={RegisterLoginScreen} />
//             <Stack.Screen name="MainApp" component={TabNavigation} />
//         </Stack.Navigator>
//     )
// }

// export default StackNavigation

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterLoginScreen from "../screens/RegisterLoginScren";
import TabNavigation from "./TabNavigator";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { authData } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authData ? (
        <Stack.Screen name="MainApp" component={TabNavigation} />
      ) : (
        <Stack.Screen name="RegisterLogin" component={RegisterLoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
