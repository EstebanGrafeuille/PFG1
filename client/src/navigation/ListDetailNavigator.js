import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListDetailScreen from "../screens/profile/lists/ListDetailScreen";
import EditListScreen from "../screens/profile/lists/EditListScreen";

const Stack = createNativeStackNavigator();

export default function ListDetailNavigation() {
  return (
    <Stack.Navigator initialRouteName="ListDetailScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ListDetailScreen"
        component={ListDetailScreen}
        options={{
          title: "My Lists"
        }}
      />
      <Stack.Screen
        name="EditListScreen"
        component={EditListScreen}
        options={{ title: "Create New List" }}
      />
    </Stack.Navigator>
  );
}
