import { View, Text, StyleSheet } from 'react-native';

export default function SocialScreen() {
  return (
    <View style={styles.container}>
      <Text>¡Social Screen XD!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  }
});