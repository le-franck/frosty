import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RepositoryLightModel } from '../model/repository_light';
import { RepositoryLocalModel } from '../model/repository_local';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS_THEME } from '../utils/constants';
import { onShare } from '../logic/dataFetch';


const RepositoryStarredLine = ({ repository, toggleIsStarred, navigation, route }: { repository: RepositoryLocalModel, toggleIsStarred: Function, navigation: any, route: any }) => {

    const [_pressed, setPressed] = useState<boolean>(false);

    const handleOnPress = () => {
        navigation.navigate('Repository', { fullname: repository.fullname })
    }

    const savableRepo: RepositoryLocalModel = {
        id: repository.id,
        fullname: repository.fullname,
        description: repository.description,
    }

    const splitedFullName: string[] = repository.fullname.split("/");
    const link: string = "https://github.com/" + repository.fullname;

    return (
        repository ?
            (<TouchableOpacity activeOpacity={1} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} onPress={() => handleOnPress()} onLongPress={() => onShare(link)}>
                <View style={[_pressed && styles.item_pressed, styles.item]}>
                    <View style={styles.firstLine}>
                        <Text style={styles.title} numberOfLines={1}>{splitedFullName[0]} / {splitedFullName[1]} </Text>
                        <TouchableOpacity style={styles.stars} activeOpacity={0.5} onPress={() => toggleIsStarred(savableRepo)}>
                            <Icon name={"star"} size={16} color={COLORS_THEME.alert} />
                        </TouchableOpacity>
                    </View>
                    {repository.description && < Text style={styles.description} numberOfLines={2}>{repository.description}</Text>}
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
    },
});


export default RepositoryStarredLine;