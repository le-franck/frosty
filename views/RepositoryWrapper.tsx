import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { RepositoryModel } from '../model/repository';
import { RepositoryLocalModel } from '../model/repository_local';
import { COLORS_THEME, LANGUAGE_COLOR } from '../utils/constants';
import { getRepo } from '../logic/dataFetch';
import Icon from 'react-native-vector-icons/FontAwesome';
import RepositoryView from './Repository';

const RepositoryWrapper = ({ route, navigation }: { route: any, navigation: any }) => {
    const { owner, repo } = route.params;
    return (
        <View style={styles.container}>
            <RepositoryView owner={owner} repo={repo} />
        </View >);
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


export default RepositoryWrapper;