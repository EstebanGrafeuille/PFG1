import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileStats() {
  return (
    <View style={styles.profileStatsContainer}>
      <View style={styles.horizontalLine}/>
      <View style={styles.profileStatRow}>
        <Text style={styles.statText}>Books Read</Text>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>28</Text><Image source={require("../../assets/img/next-icon.png")} style={{height: 18, width: 18}} />
        </View>
      </View>
      <View style={styles.horizontalLine}/>
      <View style={styles.profileStatRow}>
        <Text style={styles.statText}>My Reviews</Text>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>8</Text><Image source={require("../../assets/img/next-icon.png")} style={{height: 18, width: 18}} />
        </View>
      </View>
      <View style={styles.horizontalLine}/>
      <View style={styles.profileStatRow}>
        <Text style={styles.statText}>Lists</Text>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>3</Text><Image source={require("../../assets/img/next-icon.png")} style={{height: 18, width: 18}} />
        </View>
      </View>
      <View style={styles.horizontalLine}/>
      <View style={styles.profileStatRow}>
        <Text style={styles.statText}>Friends</Text>
        <View style={styles.statRight}>
          <Text style={styles.statValue}>6</Text><Image source={require("../../assets/img/next-icon.png")} style={{height: 18, width: 18}} />
        </View>
      </View>
      <View style={styles.horizontalLine}/>
    </View>
  );
}

const styles = StyleSheet.create({
  
  profileStatsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: "auto",
    height: 150,
    width: 380,
  },

  profileStatRow: {
    flexDirection: "row",
    width: 380,
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },

  statRight: {
    flexDirection: "row",
  },

  statText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
  },

  statValue: {
    fontFamily: 'Roboto_200ExtraLight',
    fontSize: 15,
  },

  horizontalLine: {
    height: 1,
    backgroundColor: "#D9D9D9"
  },

})
