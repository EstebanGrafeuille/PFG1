import { View, Text, Button, StyleSheet } from 'react-native';

export default function RegisterLoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login / Registro</Text>
      <Button title="Ir al Home" onPress={() => navigation.navigate('MainApp', { screen: 'HomeScreen' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }
});