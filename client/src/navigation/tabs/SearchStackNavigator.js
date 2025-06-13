import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../../screens/searchScreens/SearchScreen";
import DetailBook from "../../screens/searchScreens/DetailBookScreen";
import AddReview from "../../screens/reviews/AddReviewScreen";
import EditReview from "../../screens/reviews/EditReviewScreen";
import Reviews from "../../screens/reviews/ReviewsListScreen"

const SearchStack = createNativeStackNavigator();

// Stack de búsqueda con detalle
const SearchStackNavigator = () => (
  <SearchStack.Navigator screenOptions={{ headerShown: false }}>
    <SearchStack.Screen name="Search" component={SearchScreen} />
    <SearchStack.Screen name="BookView" component={DetailBook} />
    <SearchStack.Screen name="AddReview" component={AddReview} />
    <SearchStack.Screen name="EditReview" component={EditReview} />
    <SearchStack.Screen name="Reviews" component={Reviews} />
  </SearchStack.Navigator>
);

export default SearchStackNavigator;
