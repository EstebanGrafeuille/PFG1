import { View, Text, StyleSheet, Image } from 'react-native';
import ProfileStats from '../../components/ProfileStats';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileGraphic from '../../components/ProfileGraphic';

export default function ProfileScreen() {
  return (
    <View style={styles.profileScreen}>
      <ProfileHeader headerTitle="SETTINGS" />
      <ProfileInfo />
      <ProfileGraphic />
      <ProfileStats />
    </View>
  );
}

function ProfileInfo(){
  return (
    <View style={{flexDirection: "column", height: 180, width: 200, marginTop: 30, marginBottom: 0, justifyContent: "space-between", alignItems: "center"}}>
      <Image source={require("../../../assets/img/profile-picture-sample.png")}
        resizeMode="contain" style={{height: 100, width: 100}} />
        <View style={{flexDirection: "row", height: 20, justifyContent:"center", alignItems: "space-between"}}>
          <Text style={{fontFamily: "Roboto_700Bold", fontSize: 15, paddingRight: 10}}>juan_smith_420</Text>
          <Image source={require("../../../assets/img/edit-icon.png")}
            resizeMode="contain" style={{height: 18, width: 18}}/>
        </View>
        <Text style={{fontFamily: "Roboto_200ExtraLight", fontSize: 12, textAlign: "justify"}}>
          I'm a 32 year old who enjoys reading classic novels and Argentinian politics like gaturro and many others.
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileScreen: {
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  text: {
    fontFamily: 'Roboto_200ExtraLight',
    fontSize: 18,
    color: '#333',
  },
});