import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const Home = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../img/GitHub_Logo_White.png')} style={{ width: 90, height: 40 }} />
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