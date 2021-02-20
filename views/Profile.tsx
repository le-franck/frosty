import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS_THEME } from '../utils/constants';

const Profile = () => {

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

export default Profile;