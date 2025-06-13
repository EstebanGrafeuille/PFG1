import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListsBooksScreen from "../../../../screens/profile/lists/ListsBooksScreen";
import CreateListScreen from "../../../../screens/profile/lists/CreateListScreen";
import ListDetailScreen from "../../../../screens/profile/lists/ListDetailScreen";
import ListDetailNavigation from "./ListDetailNavigator";


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
      />
      <Stack.Screen
        name="ListDetailNavigation"
        component={ListDetailNavigation}
        options={({ route }) => ({ title: route.params?.listTitle || "List Detail" })}
      />
    </Stack.Navigator>
  );
}

/*
initialRouteName="ListsBooksScreen"
      screenOptions={{headerShown: false}}
      */
