import { View, Text, StyleSheet } from 'react-native';

export default function ProfileStats() {
  return (
    <View style={styles.profileStats}>
      <Text>¡Book Stats!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileStats: {
    height: 150,
    width: '80%',
    backgroundColor: 'black'
  }
})
