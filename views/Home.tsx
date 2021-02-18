import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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

    return (
        <View style={styles.container}>
            <Image source={require('../img/GitHub_Logo_White.png')} style={{ width: 90, height: 40 }} />
            <Button title={"clearStorage"} onPress={clearAppData}></Button>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#9a9ec9',
        backgroundColor: '#4b56a4',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;