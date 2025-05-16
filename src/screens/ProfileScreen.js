import { View, Text } from 'react-native';
import ProfileStats from '../components/ProfileStats'

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>¡Bienvenido al Profile!</Text>
      <ProfileStats/>
    </View>
  );
}