import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RepositoryModel } from '../model/repository';
import { COLORS_THEME } from '../utils/constants';

const RepositoryView = ({ owner, repo }: { owner: string, repo: string }) => {
    const [_loading, setLoading] = useState<boolean>(false);
    const [_repository, setRepository] = useState<RepositoryModel>()
    useEffect(() => { getRepos() }, [])

    const getRepos = () => {
        setLoading(true);

        fetch('https://api.github.com/repos/' + owner + '/' + repo, {
            'headers': {
                'Authorization': "token 66ef3f80be2e4f109bfbb55831bb0e88006281b1",
                'Accept': 'application/vnd.github.v3+json'
            }
        })
            .then(response => response.json())
            .then((responseJson: RepositoryModel) => {
                const {
                    id,
                    name,
                    description,
                    stargazers_count,
                    owner: {
                        avatar_url,
                        login
                    },
                    html_url,
                    language,
                } = responseJson;
                const res: RepositoryModel = {
                    id,
                    name,
                    description,
                    stargazers_count,
                    owner: {
                        avatar_url,
                        login
                    },
                    html_url,
                    language,
                }
                setRepository(res);
            })

            .catch(error => console.log(error));
        setLoading(false);
    }


    return (
        <View style={styles.container}>
            {_loading ? <ActivityIndicator style={{ flexGrow: 1 }} size="large" color={COLORS_THEME.info} /> :
                <Text style={{ color: COLORS_THEME.info }}>{_repository?.owner.login} / {_repository?.name}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS_THEME.bg_secondary,
    },
    item: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomColor: COLORS_THEME.border_secondary,
        borderBottomWidth: 1,
    }
});


export default RepositoryView;