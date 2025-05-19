import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileGraphic(){
  return(
    <View style={{ flexDirection: "column", height: 120}}>
      <View style={styles.graphicContainer}>
        <View style={[styles.graphBar, {height: 30}]}/>
        <View style={[styles.graphBar, {height: 50}]}/>
        <View style={[styles.graphBar, {height: 37}]}/>
        <View style={[styles.graphBar, {height: 66}]}/>
        <View style={[styles.graphBar, {height: 32}]}/>
      </View>
      <View style={styles.horizontalLine}/>
      <View style={styles.graphTextContainer}>
        <Text style={styles.graphText}>My Ratings</Text>
        <Text style={styles.graphText}>3.6</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    
    graphicContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 220,
        marginBottom: 0,
        marginTop: "auto",
    },

    graphBar: {
        backgroundColor: "#FFCB20",
        width: 5,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        marginTop: "auto",
        marginBottom: 0,
    },

    horizontalLine: {
        height: 2,
        width: 220,
        backgroundColor: "#D9D9D9"
    },

    graphTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 0,
        marginTop: 5,
    },

    graphText: {
        fontFamily: 'Roboto_200ExtraLight',
        fontSize: 12,
    }
})