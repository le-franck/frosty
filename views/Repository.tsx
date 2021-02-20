import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { RepositoryModel } from '../model/repository';
import { COLORS_THEME } from '../utils/constants';
import { UserLightModel } from '../model/user_light';

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
                } = responseJson;

                const user: UserLightModel = {
                    id: owner.id,
                    avatar_url: owner.avatar_url,
                    login: owner.login
                }

                const res: RepositoryModel = {
                    id,
                    description,
                    forks_count,
                    homepage,
                    language,
                    name,
                    open_issues_count,
                    owner: user,
                    stargazers_count,
                    subscribers_count,
                    watchers_count,
                }
                setRepository(res);
            })

            .catch(error => console.log(error));
        setLoading(false);
    }

    const RepositoryWrapper = () => {
        return (
            <View >
                <Image
                    style={styles.userPicture}
                    source={{
                        uri: _repository?.owner.avatar_url,
                    }}
                />
            </View>)
    }


    return (
        <View style={styles.container}>
            {_loading ? <ActivityIndicator style={{ flexGrow: 1 }} size="large" color={COLORS_THEME.info} /> :
                <RepositoryWrapper />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS_THEME.bg_secondary,
        padding: 16,
    },
    userPicture: {
        height: 80,
        width: 80,
        borderRadius: 40,
    }
});


export default RepositoryView;