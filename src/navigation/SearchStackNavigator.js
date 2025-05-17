import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/searchScreens/SearchScreen';
import DetailBook from '../screens/searchScreens/DetailBookScreen';

const SearchStack = createNativeStackNavigator();



// Stack de búsqueda con detalle
const SearchStackNavigator = () => (
  <SearchStack.Navigator screenOptions={{ headerShown: true }}>
    <SearchStack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar Libros' }} />
    <SearchStack.Screen
      name="BookView"
      component={DetailBook}
      options={{ title: 'Detalle', headerBackTitle: 'Volver' }}
    />
  </SearchStack.Navigator>
);

export default SearchStackNavigator
