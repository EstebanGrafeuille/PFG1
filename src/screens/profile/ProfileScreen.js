import { View, Text, StyleSheet } from 'react-native';
import ProfileStats from '../../components/ProfileStats';
import ProfileHeader from '../../components/ProfileHeader';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ProfileHeader />
      <Text style={styles.text}>¡Bienvenido al Profile!</Text>
      <ProfileStats/>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto_200ExtraLight',
    fontSize: 18,
    color: '#333',
  },
});