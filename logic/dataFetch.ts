import { RepositoryLightModel } from "../model/repository_light";

interface Response {
    incomplete_results: boolean;
    items: RepositoryLightModel[];
    total_count: number;
}

export const getRepos = (repositories: RepositoryLightModel[], setRepositories: Function) => {
    //setLoading(true);
    const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
        .toISOString()
        .split('T')[0];

    const allTime = new Date("2000-01-01")
        .toISOString()
        .split('T')[0];

    const numberPerPage = 10;

    const page = Math.ceil(repositories.length / numberPerPage) + 1;
    console.log("repositories.length", repositories.length);

    const lastMonthUrl = 'https://api.github.com/search/repositories?q=created:>' + lastMonth + '&sort=stars&order=desc&per_page=' + numberPerPage + '&page=' + page;
    const allTimeUrl = 'https://api.github.com/search/repositories?q=created:>' + allTime + '&sort=stars&order=desc&per_page=' + numberPerPage + '&page=' + page;

    console.log(allTimeUrl);

    fetch(allTimeUrl, {
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

    /* setTimeout(() => {
        setLoading(false);
    }, 1000); */
}