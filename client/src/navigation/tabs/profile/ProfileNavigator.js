import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../../screens/profile/ProfileScreen";
import ReadBooksScreen from "../../../screens/profile/ReadBooksScreen";
import WishlistScreen from "../../../screens/profile/WishlistScreen";
import ListsNavigation from "./list/ListsNavigator";
import SettingsNavigation from "./SettingsNavigator";
import ReadBooksNavigation from "./ReadBooksNavigator";
import WishlistNavigation from "./WishlistNavigator";
import AddReview from "../../../screens/reviews/AddReviewScreen";
import EditReview from "../../../screens/reviews/EditReviewScreen";
import Reviews from "../../../screens/reviews/ReviewsListScreen"

const ProfileNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsNavigation" component={SettingsNavigation} />
      <Stack.Screen name="ReadBooks" component={ReadBooksNavigation} />
      <Stack.Screen name="ListsNavigation" component={ListsNavigation} />
      <Stack.Screen name="WishlistBooks" component={WishlistNavigation} />
            <Stack.Screen 
        name="AddReview" 
        component={AddReview}
      />
      <Stack.Screen 
        name="EditReview" 
        component={EditReview}
      />
      <Stack.Screen 
        name="Reviews" 
        component={Reviews}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;