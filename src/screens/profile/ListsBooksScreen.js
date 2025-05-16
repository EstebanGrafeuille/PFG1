import { View, Text } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';

export default function ListsBooksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProfileHeader />
      <Text>Listas de tus libros</Text>
    </View>
  );
}