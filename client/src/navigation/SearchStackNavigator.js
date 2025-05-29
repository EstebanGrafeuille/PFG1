import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/searchScreens/SearchScreen";
import DetailBook from "../screens/searchScreens/DetailBookScreen";

const SearchStack = createNativeStackNavigator();

// Stack de búsqueda con detalle
const SearchStackNavigator = () => (
  <SearchStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchStack.Screen name="Search" component={SearchScreen} />
    <SearchStack.Screen name="BookView" component={DetailBook} />
  </SearchStack.Navigator>
);

export default SearchStackNavigator;
