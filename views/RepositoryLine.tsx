import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RepositoryLightModel } from '../model/repository_light';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS_THEME } from '../utils/constants';


const RepositoryLine = ({ repository, isStarred, toggleIsStarred, navigation }: { repository: RepositoryLightModel, isStarred: boolean, toggleIsStarred: Function, navigation: any }) => {

    const [_pressed, setPressed] = useState<boolean>(false);

    return (
        repository ?
            (<TouchableOpacity activeOpacity={1} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} onPress={() => navigation.navigate('Repository', { owner: repository.owner.login, repo: repository.name })}>
                <View style={[_pressed && styles.item_pressed, styles.item]}>
                    <View style={styles.firstLine}>
                        <Text style={styles.title} numberOfLines={1}>{repository.owner.login} / {repository.name} </Text>
                        <TouchableOpacity style={styles.stars} activeOpacity={0.5} onPress={() => toggleIsStarred(repository.id)}>
                            <Icon name={isStarred ? "star" : "star-o"} size={16} color={isStarred ? COLORS_THEME.alert : COLORS_THEME.text_tertiary} />
                            <Text style={styles.count} >{repository.stargazers_count}</Text>
                        </TouchableOpacity>
                    </View>
                    {repository.description && < Text style={styles.description} numberOfLines={2}>{repository.description}</Text>}
                    {/*item.language && <Text style={styles.language} >{item.language}</Text>*/}
                </View>
            </TouchableOpacity >) : <ActivityIndicator style={{ flexGrow: 1 }} size="large" color={COLORS_THEME.info} />
    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomColor: COLORS_THEME.border_secondary,
        borderBottomWidth: 1,
    },
    item_pressed: {
        backgroundColor: COLORS_THEME.bg_tertiary,
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        marginLeft: 8,
    },
    count: {
        fontSize: 16,
        color: COLORS_THEME.text_primary,
        marginLeft: 4,
    },
    title: {
        fontSize: 18,
        color: COLORS_THEME.text_primary,
        fontWeight: "600",
        flexShrink: 1,
    },
    description: {
        color: COLORS_THEME.text_secondary,
        fontSize: 14,
        marginTop: 8,
    },
    firstLine: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "baseline",
        flexGrow: 1,
        position: "relative"
    },
});


export default RepositoryLine;