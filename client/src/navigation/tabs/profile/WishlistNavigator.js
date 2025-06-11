import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WishlistScreen from '../../../screens/profile/WishlistScreen';
import EditListScreen from '../../../screens/profile/lists/EditListScreen';
import DetailBook from '../../../screens/searchScreens/DetailBookScreen';
import { useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function WishlistNavigation() {

  const route = useRoute();
  //const { listTitle } = route.params;

  return (
    <Stack.Navigator initialRouteName="WishlistScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="WishlistScreen"
        component={WishlistScreen}
        initialParams={{ WishlistScreen }}
        options={{ title: 'My Lists' }}
      />
      <Stack.Screen
        name="BookView"
        component={DetailBook}
      />
    </Stack.Navigator>
  );
}
