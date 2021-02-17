import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator, Button } from 'react-native';
import { RepositoryModel } from '../model/repository';




const RepositoryLine = ({ repositories, fetchMore, isLoading }: { repositories: RepositoryModel[], fetchMore: Function, isLoading: boolean }) => {
    const renderItem = ({ item }: { item: RepositoryModel }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.owner.login} / {item.name}</Text>
            {item.description && < Text style={styles.description} >{item.description}</Text>}
            <View style={styles.lastLine}>
                {item.language && <Text style={styles.language} >{item.language}</Text>}
                <Text style={styles.language} >{item.stargazers_count}</Text>
            </View>
        </View >
    );

    const footer = () => {
        return isLoading ? <ActivityIndicator size="large" color="#608BB3" /> : <View style={styles.item}><Button title={"More"} onPress={() => fetchMore()}></Button></View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={repositories}
                renderItem={renderItem}
                ListFooterComponent={footer}
                keyExtractor={item => item.id + ''}
                onEndReachedThreshold={0.01}
                onEndReached={info => {
                    fetchMore(info);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 8,
        marginHorizontal: 16,
        borderBottomColor: "#E6E6E6",
        borderBottomWidth: 1,
    },
    title: {
        marginBottom: 8,
        color: "#608BB3",
        fontSize: 14,
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
    lastLine: {
        flexDirection: "row",
        alignItems: "center"
    },
    swipe: {
        flex: 1,
        backgroundColor: "#aaa"
    }
});


export default RepositoryLine;