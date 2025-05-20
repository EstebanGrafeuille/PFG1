import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListDetailScreen(){

    const navigation = useNavigation();

    return(
        <View style={styles.listDetailScreen}>
            <Text>Detail List Screen</Text>
            <Button title="Go Back" onPress={() => navigation.navigate('ListsBooksScreen')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    listDetailScreen: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})