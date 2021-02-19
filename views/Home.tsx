import React from 'react';
import { StyleSheet, Image, View, Button, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS_THEME } from '../constants/colors';

const Home = () => {

    const clearAppData = async function () {
        try {
            const keys = await AsyncStorage.getAllKeys();
            console.log("Keys", keys);
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error('Error clearing app data.');
        }
    }
    console.log(Platform.OS);


    return (
        <View style={styles.container}>
            <Image source={require('../img/GitHub_Logo_White.png')} style={{ width: 90, height: 40 }} />
            <Button title={"clearStorage"} onPress={clearAppData}></Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS_THEME.bg_primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;