import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig: conf } = getConfig();

type Props = {
  item: {
    title: string;
    img?: File | string;
    video?: File | string;
    category: string;
  };
};

export const createProject = ({ item }: Props): Promise<void | boolean> => {
  const formData = new FormData();
  for (const key in item) formData.append(key, item[key]);

  return fetch(`${conf.api.url}createProject`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export const deleteProject = ({ _id }: { _id: string }): Promise<void | boolean> => {
  return fetch(`${conf.api.url}deleteProject/${_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export const updateProject = (item: Props): Promise<void | boolean> => {
  const formData = new FormData();
  for (const key in item) formData.append(key, item[key]);

  return fetch(`${conf.api.url}updateProject`, {
    method: 'PUT',
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export default {
  createProject,
  deleteProject,
  updateProject,
};
