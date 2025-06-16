import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditListScreen from '../../../../screens/profile/lists/EditListScreen';
import ListDetailScreen from '../../../../screens/profile/lists/ListDetailScreen';
import DetailBook from '../../../../screens/searchScreens/DetailBookScreen';



const Stack = createNativeStackNavigator();

export default function ListDetailNavigation() {

  const route = useRoute();
  const { listTitle } = route.params;

  return (
    <Stack.Navigator initialRouteName="ListDetailScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ListDetailScreen"
        component={ListDetailScreen}
        initialParams={{ listTitle }}
        options={{ title: 'My Lists' }}
      />
      <Stack.Screen
        name="EditListScreen"
        component={EditListScreen}
        initialParams={{ listTitle }}
        options={{ title: 'Edit List' }}
      />
      <Stack.Screen
        name="BookView"
        component={DetailBook}
      />      <Stack.Screen
        name="AllLists"
        component={require('./NavigationHelpers').getListsNavigationComponent()}
      />

    </Stack.Navigator>
  );
}
