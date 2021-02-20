import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Button, Text } from 'react-native';
import RepositoryLines from './RepositoryLines';
import RepositoryView from './Repository';
import { COLORS_THEME, STORAGE_KEY } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { RepositoryLightModel } from '../model/repository_light';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Response {
    incomplete_results: boolean;
    items: RepositoryLightModel[];
    total_count: number;
}

const Stack = createStackNavigator();

const RepositoryNavigator = () => {

    const [_loading, setLoading] = useState<boolean>(false);
    const [_repositories, setRepositories] = useState<RepositoryLightModel[]>([]);
    const [_starredRepositories, setStarredRepositories] = useState<string[]>([]);


    useEffect(() => {
        getRepos();
        readData();
    }, [])


    //had to move this here because Typescript does not let me cancel asynch function in a useEffect return () => false 
    const readData = async () => {
        try {
            const starredRepositories = await AsyncStorage.getItem(STORAGE_KEY);
            let starredRepositoriesParsed = [];
            if (starredRepositories)
                starredRepositoriesParsed = JSON.parse(starredRepositories);
            setStarredRepositories(starredRepositoriesParsed);

        } catch (e) {
            alert(e);
        }
    }

    const getRepos = () => {
        setLoading(true);


        const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
            .toISOString()
            .split('T')[0];
        const page = Math.ceil(_repositories.length / 24) + 1;

        fetch('https://api.github.com/search/repositories?q=created:>' + lastMonth + '&sort=stars&order=desc&per_page=24&page=' + page, {
            'headers': {
                'Authorization': "token 66ef3f80be2e4f109bfbb55831bb0e88006281b1"
            }
        })
            .then(response => response.json())
            .then((responseJson: Response) => {

                if (responseJson.items) {
                    const res: RepositoryLightModel[] = responseJson.items.map(({
                        id,
                        name,
                        description,
                        stargazers_count,
                        owner
                    }) => {

                        return ({
                            id,
                            name,
                            description,
                            stargazers_count,
                            owner: {
                                login: owner.login,
                            }
                        })
                    });
                    setRepositories([..._repositories, ...res]);
                }
            })
            .catch(error => console.log(error));

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }


    const endOfList = () => {
        if (!_loading) {
            getRepos();
        }
    }

    const Repositories = ({ navigation }: any) => {
        console.log((navigation));

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}></View>
                    <Image source={require('../img/GitHub-Mark-Light-120px-plus.png')} style={styles.headerImage} />
                    <View style={styles.headerRight}></View>
                </View>
                {_repositories && <RepositoryLines repositories={_repositories} fetchMore={() => endOfList()} isLoading={_loading} starredRepositories={_starredRepositories} navigation={navigation}></RepositoryLines>}
            </View>);
    }

    const Repository = ({ route, navigation }: { route: any, navigation: any }) => {
        console.log(navigation);

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