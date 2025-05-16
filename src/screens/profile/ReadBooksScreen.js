import { View, Text } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';

export default function ReadBooksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProfileHeader />
      <Text>Los Libros que leiste</Text>
    </View>
  );
}