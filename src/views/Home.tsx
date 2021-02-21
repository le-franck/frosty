import React from 'react';
import { StyleSheet, Image, View, Button, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS_THEME } from '../utils/constants';

const Home = () => {

    return (
        <View style={styles.container}>
            <Image source={require('../img/GitHub_Logo_White.png')} style={{ width: 90, height: 40 }} />
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