import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import RepositoryLines from './RepositoryLines';
import { COLORS_THEME } from '../utils/constants';
import { getRepos, readData } from '../logic/dataFetch';
import { RepositoryLightModel } from '../model/repository_light';
import { RepositoryLocalModel } from '../model/repository_local';

const RepositoriesWrapper = ({ route, navigation }: { route: any, navigation: any }) => {

    const [_starredRepositories, setStarredRepositories] = useState<RepositoryLocalModel[]>([]);
    const [_initialRepositories, setInitialRepositories] = useState<RepositoryLightModel[]>([]);
    const [_loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true);
            readData(setStarredRepositories).then(() =>
                setLoading(false)
            );
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        initialDataFetch();
    })

    const initialDataFetch = () => {
        //Need to pre initialise the first in the parent to fetch to not have to render awaited data in the flat list 
        _initialRepositories.length === 0 && getRepos(_initialRepositories, setInitialRepositories);
    }

    return (
        <View style={styles.container}>
            {_initialRepositories.length > 0 && !_loading ?
                <RepositoryLines initialRepositories={_initialRepositories} starredRepositories={_starredRepositories} navigation={navigation} route={route} /> :
                <ActivityIndicator style={{ flexGrow: 1, backgroundColor: COLORS_THEME.bg_secondary }} size="large" color={COLORS_THEME.info} />}
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

export default RepositoriesWrapper;