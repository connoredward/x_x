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

export const createPost = ({ item }: Props): Promise<void | boolean> => {
  const formData = new FormData();
  for (const key in item) formData.append(key, item[key]);

  return fetch(`${conf.api.url}createPost`, {
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

export const deletePost = ({ _id }: { _id: string }): Promise<void | boolean> => {
  return fetch(`${conf.api.url}deletePost/${_id}`, {
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

export const updatePost = (item: Props): Promise<void | boolean> => {
  const formData = new FormData();
  for (const key in item) formData.append(key, item[key]);

  return fetch(`${conf.api.url}updatePost`, {
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
  createPost,
  deletePost,
  updatePost,
};
