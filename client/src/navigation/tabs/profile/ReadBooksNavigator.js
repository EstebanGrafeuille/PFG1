import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReadBooksScreen from '../../../screens/profile/ReadBooksScreen';
import EditListScreen from '../../../screens/profile/lists/EditListScreen';
import DetailBook from '../../../screens/searchScreens/DetailBookScreen';
import { useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function ReadBooksNavigation() {

  const route = useRoute();
  //const { listTitle } = route.params;

  return (
    <Stack.Navigator initialRouteName="ReadBooksScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReadBooksScreen"
        component={ReadBooksScreen}
        initialParams={{ ReadBooksScreen }}
        options={{ title: 'My Lists' }}
      />
      {/* <Stack.Screen
        name="EditListScreen"
        component={EditListScreen}
        initialParams={{ listTitle }}
        options={{ title: 'Edit List' }}
      /> */}
      <Stack.Screen
        name="BookView"
        component={DetailBook}
      />
    </Stack.Navigator>
  );
}
