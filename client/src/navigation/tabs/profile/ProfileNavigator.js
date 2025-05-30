import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../../screens/profile/ProfileScreen";
import ReadBooksScreen from "../../../screens/profile/ReadBooksScreen";
import WishlistScreen from "../../../screens/profile/WishlistScreen";
import ListsNavigation from "./list/ListsNavigator";
import SettingsNavigation from "./SettingsNavigator";

const ProfileNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsNavigation" component={SettingsNavigation} />
      <Stack.Screen name="ReadBooks" component={ReadBooksScreen} />
      <Stack.Screen name="ListsNavigation" component={ListsNavigation} />
      <Stack.Screen name="WishlistBooks" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;