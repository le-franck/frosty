import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { RepositoryModel } from '../model/repository';
import RepositoryLines from './RepositoryLines';
import { COLORS_THEME } from '../constants/colors';

interface Response {
    incomplete_results: boolean;
    items: RepositoryModel[];
    total_count: number;
}

const STORAGE_KEY = '@starred_repositories';

const RepositoryView = () => {

    const [_loading, setLoading] = useState<boolean>(false);
    const [_repositories, setRepositories] = useState<RepositoryModel[]>([]);


    useEffect(() => {
        getRepos();
    }, [])

    const getRepos = () => {
        setLoading(true);


        const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
            .toISOString()
            .split('T')[0];
        const page = Math.ceil(_repositories.length / 24) + 1;

        fetch('https://api.github.com/search/repositories?q=created:>' + lastMonth + '&sort=stars&order=desc&per_page=24&page=' + page, {
            'headers': {
                'Authorization': "token 66ef3f80be2e4f109bfbb55831bb0e88006281b1"
            }
        })
            .then(response => response.json())
            .then((responseJson: Response) => {

                if (responseJson.items) {
                    const res: RepositoryModel[] = responseJson.items.map(({
                        id,
                        name,
                        description,
                        html_url,
                        language,
                        stargazers_count,
                        open_issues,
                        owner
                    }) => {

                        return ({
                            id,
                            name,
                            description,
                            html_url,
                            language,
                            stargazers_count,
                            open_issues,
                            owner: {
                                avatar_url: owner.avatar_url,
                                login: owner.login,
                                html_url: owner.html_url
                            }
                        })
                    });
                    setRepositories([..._repositories, ...res]);
                }
            })
            .catch(error => console.log(error));

        setTimeout(() => {
            setLoading(false);
        }, 1000);

    }


    const endOfList = (info: any) => {

        if (!_loading) {
            getRepos();
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}><Image source={require('../img/GitHub-Mark-Light-120px-plus.png')} style={styles.headerImage} /></View>
            {_repositories && <RepositoryLines repositories={_repositories} fetchMore={(info: any) => endOfList(info)} isLoading={_loading}></RepositoryLines>}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',

    },
    header: {
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        borderBottomWidth: 2,
        borderBottomColor: COLORS_THEME.border_primary,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: COLORS_THEME.bg_primary,
    },
    headerImage: {
        width: 32,
        height: 32,
    }
});

export default RepositoryView;