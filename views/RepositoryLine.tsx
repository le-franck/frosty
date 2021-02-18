import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RepositoryModel } from '../model/repository';
import Icon from 'react-native-vector-icons/FontAwesome';

const RepositoryLine = ({ repositories, fetchMore, isLoading }: { repositories: RepositoryModel[], fetchMore: Function, isLoading: boolean }) => {

    const renderItem = ({ item }: { item: RepositoryModel }) => {

        return (
            <View style={styles.item}>
                <View style={styles.firstLine}>
                    <Text style={styles.title} numberOfLines={1}>{item.owner.login} / {item.name} </Text>
                    <TouchableOpacity style={styles.stars} activeOpacity={0.5} onPress={() => {
                        alert('Star-it');
                    }}>
                        <Icon name="star-o" size={16} color={"#4C4C58"} />
                        <Text style={{ marginLeft: 2 }} >{item.stargazers_count}</Text>
                    </TouchableOpacity>
                </View>
                {item.description && < Text style={styles.description} numberOfLines={2}>{item.description}</Text>}
                {/*item.language && <Text style={styles.language} >{item.language}</Text>*/}
            </View >
        )
    }
        ;

    const footer = () => {
        return isLoading ? <ActivityIndicator style={{ flexGrow: 1 }} size="large" color="#608BB3" /> : <View style={styles.item}></View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={repositories}
                renderItem={renderItem}
                ListFooterComponent={footer}
                ListFooterComponentStyle={styles.loader}
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
        display: "flex",
        flex: 1,
        width: "100%",
    },
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
    loader: {
        display: "flex",
        flexGrow: 1,
        alignContent: "center",
        marginTop: 16,
        marginBottom: 16,

    }
});


export default RepositoryLine;