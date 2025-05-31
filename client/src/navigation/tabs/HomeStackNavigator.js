import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailBook from "../../screens/searchScreens/DetailBookScreen";
import AddReviewScreen from '../../s../../screens/searchScreens/AddReviewScreen'
import ReviewListScreen from "../../screens/searchScreens/ReviewsListScreen";

const HomeStack = createNativeStackNavigator();

// Stack de Home con detalle de libro
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="BookView" component={DetailBook} />
    <HomeStack.Screen name="AddReview" component={AddReviewScreen} />
    <HomeStack.Screen name= "Reviews" component={ReviewListScreen}/>
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
