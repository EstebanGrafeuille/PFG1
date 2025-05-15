import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const screens = [
    { name: 'HomeScreen', label: 'HomeScreen' },
    { name: 'ProfileScreen', label: 'ProfileScreen' },
  ];

  return (
    <View style={styles.footer}>
      {screens.map((screen) => {
        const isActive = route.name === screen.name;
        return (
          <TouchableOpacity
            key={screen.name}
            style={[
              styles.tab,
              isActive && styles.activeTab
            ]}
            onPress={() => navigation.navigate(screen.name)}
          >
            <Text style={isActive ? styles.activeText : styles.inactiveText}>
              {screen.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  tab: {
    padding: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
  },
  activeText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#666',
  },
});

export default Footer;
