import { View, Text } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';

export default function WishlistScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProfileHeader />
      <Text>Wishlist Screen</Text>
    </View>
  );
}