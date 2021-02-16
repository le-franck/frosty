import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import { RepositoryModel } from '../model/repository';
import RepositoryLine from './RepositoryLine';

interface Response {
    incomplete_results: boolean;
    items: RepositoryModel[];
    total_count: number;
}


const RepositoryView = () => {

    const [loading, setLoading] = useState(false);
    const [_repositories, setRepositories] = useState<RepositoryModel[]>();
    const [_page, setPage] = useState<number>(1);

    useEffect(() => {
        getRepos(null);
    })

    const getRepos = (info: any) => {
        setLoading(false);
        if (info) setPage(_page + 1);
        const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
            .toISOString()
            .split('T')[0];

        fetch('https://api.github.com/search/repositories?q=created:>' + lastMonth + '&sort=stars&order=desc&page=' + _page, {
            'headers': {
                'Authorization': "token 66ef3f80be2e4f109bfbb55831bb0e88006281b1"
            }
        })
            .then(response => response.json())
            .then((responseJson: Response) => {
                console.log('getting data from fetch', responseJson)
                const res: RepositoryModel[] = responseJson.items.map(({
                    id,
                    name,
                    description,
                    html_url,
                    created_at,
                    stargazers_count,
                    open_issues,
                    owner
                }) => ({
                    id,
                    name,
                    description,
                    html_url,
                    created_at: new Date(created_at),
                    stargazers_count,
                    open_issues,
                    owner: {
                        avatar_url: owner.avatar_url,
                        login: owner.login,
                        html_url: owner.html_url
                    }
                }));
                console.log(res);

                setLoading(false);
                setRepositories(res);
            })
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            {_repositories && <RepositoryLine repositories={_repositories} fetchMore={getRepos}></RepositoryLine>}
            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#9a9ec9',
        backgroundColor: '#4b56a4',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RepositoryView;