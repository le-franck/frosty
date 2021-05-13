import { RepositoryLightModel } from "../model/repository_light";
import { RepositoryModel } from "../model/repository";
import { UserLightModel } from "../model/user_light";
import { Share } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { STORAGE_KEY } from "../utils/constants";
import { RepositoryLocalModel } from "model/repository_local";

//Need to create your own token : https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
import { github_token } from "../private/tokens";

interface Response {
    incomplete_results: boolean;
    items: RepositoryLightModel[];
    total_count: number;
}

export const getRepos = (repositories: RepositoryLightModel[], setRepositories: Function) => {
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
        .toISOString()
        .split('T')[0];

    const numberPerPage = 24;

    const page = Math.ceil(repositories.length / numberPerPage) + 1;

    const lastMonthUrl = 'https://api.github.com/search/repositories?q=created:>' + lastMonth + '&sort=stars&order=desc&per_page=' + numberPerPage + '&page=' + page;


    fetch(lastMonthUrl, {
        'headers': {
            'Authorization': "token " + github_token,
            'Accept': 'application/vnd.github.v3+json'
        }
    })
        .then(response => response.json())
        .then((responseJson: Response) => {

            if (responseJson.items) {
                const res: RepositoryLightModel[] = responseJson.items.map(({
                    id,
                    name,
                    description,
                    stargazers_count,
                    owner
                }) => {

                    return ({
                        id,
                        name,
                        description,
                        stargazers_count,
                        owner: {
                            login: owner.login,
                        }
                    })
                });
                setRepositories([...repositories, ...res]);
            }
        })
        .catch(error => console.log(error));
}

export const getRepo = (setRepository: Function, fullname: string,) => {
    fetch('https://api.github.com/repos/' + fullname, {
        'headers': {
            'Authorization': "token " + github_token,
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
}

export const onShare = async (link: string) => {
    try {
        const result = await Share.share({
            message: link,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
}

export const readData = async (setStarredRepositories: Function) => {
    try {
        const starredRepositories = await AsyncStorage.getItem(STORAGE_KEY);

        let starredRepositoriesParsed: RepositoryLocalModel[] = [];
        if (starredRepositories)
            starredRepositoriesParsed = JSON.parse(starredRepositories);
        setStarredRepositories(starredRepositoriesParsed);

    } catch (e) {
        console.error("error in the local storage")
    }
}