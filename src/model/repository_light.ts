export interface RepositoryLightModel {
  id: string;
  name: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
  };
}