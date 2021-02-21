import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { RepositoryLightModel } from '../model/repository_light';
import RepositoryLine from './RepositoryLine';
import AsyncStorage from '@react-native-community/async-storage';
import { COLORS_THEME, STORAGE_KEY } from '../utils/constants'
import { getRepos } from '../logic/dataFetch';
import { RepositoryLocalModel } from '../model/repository_local';
import _ from 'lodash';
import RepositoryStarredLine from './RepositoryStarredLine';

const RepositoryStarredLines = ({ starredRepositories, navigation, route }: { starredRepositories: RepositoryLocalModel[], navigation: any, route: any }) => {

    const [_starredRepositories, setStarredRepositories] = useState<RepositoryLocalModel[]>(starredRepositories);


    const saveData = async (repo: RepositoryLocalModel) => {
        try {
            const starredRepositories = await AsyncStorage.getItem(STORAGE_KEY);
            let starredRepositoriesParsed: RepositoryLocalModel[] = [];
            if (starredRepositories)
                starredRepositoriesParsed = JSON.parse(starredRepositories);

            // const index = starredRepositoriesParsed.indexOf(id);
            const alreadySaved: (RepositoryLocalModel | undefined) = _.find(starredRepositoriesParsed, ["id", repo.id]);
            if (alreadySaved) {
                _.remove(starredRepositoriesParsed, alreadySaved);
            } else {
                starredRepositoriesParsed.push(repo);
            }
            setStarredRepositories(starredRepositoriesParsed);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(starredRepositoriesParsed));
        } catch (e) {
            console.log('There was an error saving the product');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={_starredRepositories}
                renderItem={({ item }: { item: RepositoryLocalModel }) => <RepositoryStarredLine repository={item} toggleIsStarred={saveData} navigation={navigation} route={route} />}
                keyExtractor={(item: { id: string; }) => item.id + ''}

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


export default RepositoryStarredLines;