import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Button, Text, ActivityIndicator } from 'react-native';
import RepositoryLines from './RepositoryLines';
import RepositoryView from './Repository';
import { COLORS_THEME, STORAGE_KEY } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getRepos } from '../logic/dataFetch';
import { RepositoryLightModel } from '../model/repository_light';
import RepositoriesWrapper from './RepositoriesWrapper';
import RepositoriesStarredWrapper from './RepositoriesStarredWrapper';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const RepositoryNavigator = () => {

    const Repository = ({ route, navigation }: { route: any, navigation: any }) => {

    }

    return (
        //headerMode={"none"} to not show the header with the name of the scree
        <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Repositories" component={RepositoriesWrapper} />
            <Stack.Screen name="Saved" component={RepositoriesStarredWrapper} />
            <Stack.Screen name="Repository" component={Repository} />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: 'stretch',
        justifyContent: "flex-start",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: COLORS_THEME.border_primary,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: COLORS_THEME.bg_primary,
        color: COLORS_THEME.info,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
    },
    headerButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 8
    },
    headerImage: {
        width: 32,
        height: 32,
    },
    headerText: {
        color: COLORS_THEME.info,
        fontSize: 18,
        marginLeft: 8,
    }
});

export default RepositoryNavigator;