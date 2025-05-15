import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigator';
import TabNavigation from './src/navigation/TabNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
  
 /*
 return(
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
 );
 */
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
