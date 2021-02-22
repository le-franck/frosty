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
import { RepositoryLocalModel } from '../model/repository_local';
import RepositoryStarredLines from './RepositoryStarredLines';

const RepositoriesStarredWrapper = ({ route, navigation }: { route: any, navigation: any }) => {

    const [_starredRepositories, setStarredRepositories] = useState<RepositoryLocalModel[]>([]);

    useEffect(() => {
        readData();
    }, [])


    //had to move this here because Typescript does not let me cancel asynch function in a useEffect return () => false 
    const readData = async () => {
        try {
            const starredRepositories = await AsyncStorage.getItem(STORAGE_KEY);

            let starredRepositoriesParsed: RepositoryLocalModel[] = [];
            if (starredRepositories)
                starredRepositoriesParsed = JSON.parse(starredRepositories);
            setStarredRepositories(starredRepositoriesParsed);

        } catch (e) {
            console.error("error in the local storage")
        }
    }

    return (
        <View style={styles.container}>
            {_starredRepositories.length > 0 ?
                <RepositoryStarredLines starredRepositories={_starredRepositories} refetch={readData} navigation={navigation} route={route} />
                : <ActivityIndicator style={{ flexGrow: 1, backgroundColor: COLORS_THEME.bg_secondary }} size="large" color={COLORS_THEME.info} />

            }
        </View>);



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

export default RepositoriesStarredWrapper;