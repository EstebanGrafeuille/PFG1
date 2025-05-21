import { View, Text, StyleSheet, Button, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateListScreen(){

    const navigation = useNavigation();

    return(
        <View style={styles.createListScreen}>
            <Text>Create List Screen</Text>
            <Button title="Go Back" onPress={() => navigation.navigate('ListsBooksScreen')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    createListScreen: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})