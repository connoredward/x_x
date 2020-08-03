import fetch from 'isomorphic-unfetch';
import config from '../config/var';

const apiUrl = config.api.prod;

type Props = {
  item: {
    title: string;
  };
};

export const getAllProjects = async (): Promise<[] | undefined> => {
  const response = await fetch(apiUrl + 'getAllProjects', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

export const createProject = async ({ item }: Props): Promise<void> => {
  const response = await fetch(apiUrl + 'createProject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item }),
  });
  return await response.json();
};

export default {
  getAllProjects,
  createProject,
};
