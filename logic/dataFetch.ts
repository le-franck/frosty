import { RepositoryLightModel } from "../model/repository_light";
import { RepositoryModel } from "../model/repository";
import { UserLightModel } from "../model/user_light";

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
            'Authorization': "token 66ef3f80be2e4f109bfbb55831bb0e88006281b1",
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

export const getRepo = (setRepository: Function, owner: string, repo: string) => {
    console.log('https://api.github.com/repos/' + owner + '/' + repo);

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
            console.log(responseJson);
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