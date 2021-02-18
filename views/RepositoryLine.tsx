import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RepositoryModel } from '../model/repository';
import Icon from 'react-native-vector-icons/FontAwesome';


const RepositoryLine = ({ repository, isStarred, toggleIsStarred }: { repository: RepositoryModel, isStarred: boolean, toggleIsStarred: Function }) => {

    return (
        repository ?
            (<View style={styles.item}>
                <View style={styles.firstLine}>
                    <Text style={styles.title} numberOfLines={1}>{repository.owner.login} / {repository.name} </Text>
                    <TouchableOpacity style={styles.stars} activeOpacity={0.5} onPress={() => toggleIsStarred(repository.id)}>
                        <Icon name={isStarred ? "star" : "star-o"} size={16} color={"#4C4C58"} />
                        <Text style={{ marginLeft: 2 }} >{repository.stargazers_count}</Text>
                    </TouchableOpacity>
                </View>
                {repository.description && < Text style={styles.description} numberOfLines={2}>{repository.description}</Text>}
                {/*item.language && <Text style={styles.language} >{item.language}</Text>*/}
            </View >) : <ActivityIndicator style={{ flexGrow: 1 }} size="large" color="#608BB3" />
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 8,
        marginHorizontal: 16,
        borderBottomColor: "#E6E6E6",
        borderBottomWidth: 1,
        fontSize: 14,
        color: "#4C4C58",
    },
    stars: {
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        marginLeft: 8,
    },
    title: {
        color: "#608BB3",
        flexShrink: 1,
    },
    description: {
        color: "#4C4C58",
        fontSize: 12,
        marginBottom: 8,
    },
    language: {
        color: "#4C4C58",
        fontSize: 12,
        fontWeight: 'bold'
    },
    firstLine: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 1,
        position: "relative"
    },
});


export default RepositoryLine;