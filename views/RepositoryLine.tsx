import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { RepositoryModel } from '../model/repository';




const RepositoryLine = ({ repositories, fetchMore }: { repositories: RepositoryModel[], fetchMore: Function }) => {
    console.log(repositories);

    const renderItem = ({ item }: { item: RepositoryModel },) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={repositories}
                renderItem={renderItem}
                keyExtractor={item => item.name}
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
        backgroundColor: '#fff',
        padding: 8,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 12,
    },
});

export default RepositoryLine;