import fetch from 'isomorphic-unfetch';

type Props = {
  item: {
    title: string;
  };
};

export const getAllProjects = async (): Promise<[] | undefined> => {
  const response = await fetch('http://localhost:8080/getAllProjects', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

export const createProject = async ({ item }: Props): Promise<void> => {
  const response = await fetch('http://localhost:8080/createProject', {
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
