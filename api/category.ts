import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig: conf } = getConfig();

type Props = {
  item: {
    title: string;
    status: string;
  };
};

export const createCategory = ({ item }: Props): Promise<void | boolean> => {
  return fetch(`${conf.api.url}createCategory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export const updateCategory = (item: Props): Promise<void | boolean> => {
  return fetch(`${conf.api.url}updateCategory`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export const deleteCategory = ({ _id }: { _id: string }): Promise<void | boolean> => {
  return fetch(`${conf.api.url}deleteCategory/${_id}`, {
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

export default {
  createCategory,
  updateCategory,
  deleteCategory,
};
