import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { RepositoryModel } from '../model/repository';
import { RepositoryLocalModel } from '../model/repository_local';
import { COLORS_THEME, LANGUAGE_COLOR } from '../utils/constants';
import { getRepo } from '../logic/dataFetch';
import Icon from 'react-native-vector-icons/FontAwesome';

const RepositoryView = ({ fullname }: { fullname: string, }) => {
    const [_loading, setLoading] = useState<boolean>(false);
    const [_repository, setRepository] = useState<RepositoryModel | undefined>()

    useEffect(() => {
        setLoading(true);
        getRepo(setRepository, fullname);
        setLoading(false);
    }, [])


    const RepositoryWrapper = () => {
        const {
            id,
            description,
            forks_count,
            homepage,
            language,
            name,
            open_issues_count,
            owner,
            stargazers_count,
            subscribers_count,
            watchers_count,
        } = _repository;

        const { login, avatar_url } = owner;

        return (
            <View style={styles.container}>
                <View style={styles.iconTextWrapper}>
                    <Image
                        style={styles.userPicture}
                        source={{
                            uri: avatar_url,
                        }}
                    />
                    <Text style={styles.userName}>{login}</Text>
                </View>

                <View style={styles.titleWrapper}>
                    <Text style={styles.repoName} numberOfLines={1}>{name}</Text>
                    {/*  <TouchableOpacity style={styles.stars} activeOpacity={0.5} onPress={() => toggleIsStarred(id)}>
                        <Icon name={"star"} size={16} color={COLORS_THEME.alert} />
                        <Text style={styles.count} >{stargazers_count}</Text>
                    </TouchableOpacity> */}
                </View>
                {description && <Text style={styles.description}>{description}</Text>}
                {homepage !== "" &&
                    (<View style={styles.iconTextWrapper}>
                        <Icon name={"link"} size={16} color={COLORS_THEME.text_tertiary} />
                        <Text style={styles.text}>{homepage}</Text>
                    </View>)}
                {
                    language && (<View style={styles.iconTextWrapper}>
                        <View style={[styles.languageIcon, { backgroundColor: LANGUAGE_COLOR[language] }]}></View>
                        <Text style={styles.text}>{language}</Text>
                    </View>)
                }
            </View>)
    }


    return (
        _repository ? <RepositoryWrapper /> :
            <View style={styles.container}><ActivityIndicator style={{ flexGrow: 1 }} size="large" color={COLORS_THEME.info} /></View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS_THEME.bg_secondary,
        padding: 16,
        color: COLORS_THEME.text_primary,
    },
    iconTextWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    userPicture: {
        height: 48,
        width: 48,
        borderRadius: 40,
    },
    userName: {
        color: COLORS_THEME.text_tertiary,
        fontSize: 22,
        marginLeft: 16,
    },
    repoName: {
        color: COLORS_THEME.text_primary,
        fontSize: 30,
        fontWeight: "600",
        marginTop: 8,
        marginBottom: 24,
    },
    description: {
        color: COLORS_THEME.text_secondary,
        fontSize: 16,
        marginBottom: 24,
    },
    text: {
        color: COLORS_THEME.border_tertiary,
        marginLeft: 8,
    },
    languageIcon: {
        height: 16,
        width: 16,
        borderRadius: 8
    },
    titleWrapper: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "baseline",
        flexGrow: 1,
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        marginLeft: 8,
    },
});


export default RepositoryView;