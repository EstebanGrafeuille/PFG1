import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateListScreen from "../../../../screens/profile/lists/CreateListScreen";
import ListsBooksScreen from "../../../../screens/profile/lists/ListsBooksScreen";


const Stack = createNativeStackNavigator();

export default function ListsNavigation() {
  return (
    <Stack.Navigator initialRouteName="ListsBooksScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ListsBooksScreen"
        component={ListsBooksScreen}
        options={{
          title: "My Lists"
        }}
      />
      <Stack.Screen
        name="CreateListScreen"
        component={CreateListScreen}
        options={{ title: "Create New List" }}
      />      <Stack.Screen
        name="ListDetailNavigation"
        component={require('./NavigationHelpers').getListDetailNavigationComponent()}
        options={({ route }) => ({ title: route.params?.listTitle || "List Detail" })}
      />
    </Stack.Navigator>
  );
}

/*
initialRouteName="ListsBooksScreen"
      screenOptions={{headerShown: false}}
      */
