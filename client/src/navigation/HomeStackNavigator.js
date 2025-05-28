import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailBook from "../screens/searchScreens/DetailBookScreen";

const HomeStack = createNativeStackNavigator();

// Stack de Home con detalle de libro
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="BookView" component={DetailBook} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
