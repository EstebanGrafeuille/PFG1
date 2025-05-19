import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigator';
import { useFonts, Roboto_400Regular, Roboto_700Bold, Roboto_900Black, Roboto_200ExtraLight, Roboto_200ExtraLight_Italic } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading'; 
import { BooksProvider } from './src/context/BooksContext';

export default function App() {
   const [fontsLoaded] = useFonts({
    Roboto_200ExtraLight,
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
    Roboto_200ExtraLight_Italic,
  });
  /*
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  */

  return (
    <BooksProvider>
      <NavigationContainer>
        <StackNavigation/>
        <StatusBar style="auto" />
      </NavigationContainer>
    </BooksProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});