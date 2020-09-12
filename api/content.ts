import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

import { Content } from '../interfaces';

const { publicRuntimeConfig: conf } = getConfig();

type Props = {
  content: Content;
};

export const createContent = ({ content }: Props): Promise<void | boolean> => {
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

export const deleteContent = ({ _id }: { _id: string }): Promise<void | boolean> => {
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
