import { UserLightModel } from "./user_light";

export interface RepositoryModel {
  id: string;
  description: string;
  forks_count: number;
  homepage: string;
  language: string;
  name: string;
  open_issues_count: number;
  owner: UserLightModel
  stargazers_count: number;
  subscribers_count: number
  watchers_count: number

}