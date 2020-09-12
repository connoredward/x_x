import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig: conf } = getConfig();

type Props = {
  content: {
    title: string;
    img?: File | string;
    post: string;
  };
  _id: string;
};

export const createContent = (content: Props): Promise<void | boolean> => {
  const formData = new FormData();
  for (const key in content) formData.append(key, content[key]);
  return fetch(`${conf.api.url}createContent`, {
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

export const deleteContent = (_id: Props): Promise<void | boolean> => {
  return fetch(`${conf.api.url}deleteContent/${_id}`, {
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

export const updateContent = (content: Props): Promise<void | boolean> => {
  const formData = new FormData();
  for (const key in content) formData.append(key, content[key]);
  return fetch(`${conf.api.url}updateContent`, {
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
  createContent,
  deleteContent,
  updateContent,
};
