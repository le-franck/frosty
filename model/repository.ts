export interface RepositoryModel {
  id: string,
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  owner: {
    avatar_url: string;
    login: string;
  };
}