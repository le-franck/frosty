import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { RepositoryLightModel } from '../model/repository_light';
import RepositoryLine from './RepositoryLine';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS_THEME, STORAGE_KEY } from '../utils/constants'
import { getRepos } from '../logic/dataFetch';


const RepositoryLines = ({ initialRepositories, starredRepositories, navigation, route }: { initialRepositories: RepositoryLightModel[], starredRepositories: string[], navigation: any, route: any }) => {

    const [_starredRepositories, setStarredRepositories] = useState<string[]>(starredRepositories);
    const [_repositories, setRepositories] = useState<RepositoryLightModel[]>(initialRepositories);
    const [_loading, setLoading] = useState<boolean>(false);

    const endOfList = () => {
        if (!_loading) {
            setLoading(true);
            getRepos(_repositories, setRepositories);
            setTimeout(() => {
                //to show the loader
                setLoading(false);
            }, 1000);
        }
    }

    const footer = () => {
        return _loading ? <ActivityIndicator style={{ flexGrow: 1 }} size="large" color={COLORS_THEME.info} /> : <View></View>
    }

    const saveData = async (id: string) => {
        try {
            const starredRepositories = await AsyncStorage.getItem(STORAGE_KEY);
            let starredRepositoriesParsed = [];
            if (starredRepositories)
                starredRepositoriesParsed = JSON.parse(starredRepositories);

            const index = starredRepositoriesParsed.indexOf(id);
            if (index > -1) {
                starredRepositoriesParsed.splice(index, 1);
            } else {
                starredRepositoriesParsed.push(id);
            }
            setStarredRepositories(starredRepositoriesParsed);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(starredRepositoriesParsed));
        } catch (e) {
            console.log('There was an error saving the product');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>{_repositories.length}</Text>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={_repositories}
                renderItem={({ item }: { item: RepositoryLightModel }) => <RepositoryLine repository={item} isStarred={_starredRepositories.includes(item.id)} toggleIsStarred={saveData} navigation={navigation} route={route} />}
                ListFooterComponent={() => footer()}
                ListFooterComponentStyle={styles.loader}
                keyExtractor={(item: { id: string; }) => item.id + ''}
                onEndReachedThreshold={0.01}
                onEndReached={info => {
                    endOfList();
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: COLORS_THEME.bg_secondary,

    },
    loader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        marginTop: 16,
        marginBottom: 16,

    }
});


export default RepositoryLines;