import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { RepositoryModel } from '../model/repository';
import RepositoryLine from './RepositoryLine';


const RepositoryLines = ({ repositories, fetchMore, isLoading }: { repositories: RepositoryModel[], fetchMore: Function, isLoading: boolean }) => {


    const footer = () => {
        return isLoading ? <ActivityIndicator style={{ flexGrow: 1 }} size="large" color="#608BB3" /> : <View style={styles.item}></View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={repositories}
                renderItem={({ item }: { item: RepositoryModel }) => <RepositoryLine repository={item} />}
                ListFooterComponent={footer}
                ListFooterComponentStyle={styles.loader}
                keyExtractor={(item: { id: string; }) => item.id + ''}
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
        display: "flex",
        flex: 1,
        width: "100%",
    },
    loader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        marginTop: 16,
        marginBottom: 16,

    }
});


export default RepositoryLines;