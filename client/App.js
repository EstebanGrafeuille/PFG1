import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./src/navigation/StackNavigator";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
  Roboto_200ExtraLight,
  Roboto_200ExtraLight_Italic
} from "@expo-google-fonts/roboto";
import { BooksProvider } from "./src/context/BooksContext";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_200ExtraLight,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
    Roboto_200ExtraLight_Italic
  });

  return (
    <AuthProvider>
      <BooksProvider>
        <NavigationContainer>
          <StackNavigation />
          <StatusBar style="auto" />
        </NavigationContainer>
      </BooksProvider>
    </AuthProvider>
  );
}
