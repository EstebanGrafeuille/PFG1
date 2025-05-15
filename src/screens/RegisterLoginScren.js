import { View, Text, Button } from 'react-native';

export default function RegisterLoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login / Registro</Text>
      <Button title="Ir al Home" onPress={() => navigation.navigate('MainApp', { screen: 'HomeScreen' })} />
    </View>
  );
}
