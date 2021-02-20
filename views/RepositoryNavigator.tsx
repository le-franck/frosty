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

const Stack = createStackNavigator();

const RepositoryNavigator = () => {

    const [_starredRepositories, setStarredRepositories] = useState<string[]>([]);
    const [_initialRepositories, setInitialRepositories] = useState<RepositoryLightModel[]>([]);

    useEffect(() => {
        readData();
        initialDataFetch();
    }, [])

    const initialDataFetch = () => {
        //Need to pre initialise the first in the parent to fetch to not have to render awaited data in the flat list 
        getRepos(_initialRepositories, setInitialRepositories);
    }

    //had to move this here because Typescript does not let me cancel asynch function in a useEffect return () => false 
    const readData = async () => {
        try {
            const starredRepositories = await AsyncStorage.getItem(STORAGE_KEY);
            let starredRepositoriesParsed = [];
            if (starredRepositories)
                starredRepositoriesParsed = JSON.parse(starredRepositories);
            setStarredRepositories(starredRepositoriesParsed);

        } catch (e) {
            console.error("error in the local storage")
        }
    }


    /* const clearStates = () => {
        setRepositories([]);
        setLoading(false);
        if (_repositories.length === 0 && !_loading) {
            getRepos();
        }
    }
 */
    const Repositories = ({ route, navigation }: { route: any, navigation: any }) => {
        console.log("Repositories");

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                    </View>
                    <Image source={require('../img/GitHub-Mark-Light-120px-plus.png')} style={styles.headerImage} />
                    <View style={styles.headerRight}>
                        <TouchableOpacity /* onPress={() => clearStates()} */ style={styles.headerButton}>
                            <Icon
                                name="refresh"
                                size={32}
                                color={COLORS_THEME.info}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {_initialRepositories ?
                    <RepositoryLines initialRepositories={_initialRepositories} starredRepositories={_starredRepositories} navigation={navigation} /> :
                    <ActivityIndicator style={{ flexGrow: 1, backgroundColor: COLORS_THEME.bg_secondary }} size="large" color={COLORS_THEME.info} />}
            </View>);
    }

    const Repository = ({ route, navigation }: { route: any, navigation: any }) => {
        const { owner, repo } = route.params;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                            <Icon
                                name="angle-left"
                                size={32}
                                color={COLORS_THEME.info}
                            />
                            <Text style={styles.headerText}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    <Image source={require('../img/GitHub-Mark-Light-120px-plus.png')} style={styles.headerImage} />
                    <View style={styles.headerRight}></View>
                </View>
                <RepositoryView owner={owner} repo={repo} />
            </View >);
    }

    return (
        //headerMode={"none"} to not show the header with the name of the scree
        <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Repositories" component={Repositories} />
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