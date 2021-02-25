import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLORS_THEME } from '../utils/constants';
import { RepositoryLocalModel } from '../model/repository_local';
import RepositoryStarredLines from './RepositoryStarredLines';
import { readData } from '../logic/dataFetch';

const RepositoriesStarredWrapper = ({ route, navigation }: { route: any, navigation: any }) => {

    const [_starredRepositories, setStarredRepositories] = useState<RepositoryLocalModel[]>([]);
    const [_loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            readData(setStarredRepositories).then(() =>
                setLoading(false)
            );
        });
        return unsubscribe;
    }, [navigation])

    return (
        <View style={styles.container}>
            {_loading ? <ActivityIndicator style={{ flexGrow: 1, backgroundColor: COLORS_THEME.bg_secondary }} size="large" color={COLORS_THEME.info} /> :
                <RepositoryStarredLines starredRepositories={_starredRepositories} refetch={readData} navigation={navigation} route={route} />
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