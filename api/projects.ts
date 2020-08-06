import fetch from 'isomorphic-unfetch';
import config from '../config/var';

const apiUrl = config.api.prod;

type Props = {
  item: {
    title: string;
    imgFile?: File | unknown;
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
  const files = item.imgFile;
  const formData = new FormData();
  formData.append('title', item.title);
  formData.append('myFile', files[0]);

  formData.forEach((file) => console.log('File: ', file));

  const response = await fetch(apiUrl + 'createProject', {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    body: formData,
  });
  return await response.json();
};

export const deleteProject = ({ _id }: { _id: string }): Promise<void | boolean> => {
  console.log(_id);
  return fetch(`${apiUrl}deleteProject/${_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => {
    console.log('delete response', response);
  });
  // .then(data => { return data });
};

export default {
  getAllProjects,
  createProject,
  deleteProject,
};
