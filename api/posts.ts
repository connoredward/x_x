import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

import { Post } from '../interfaces';

type Props = {
  post: Post;
};

const { publicRuntimeConfig: conf } = getConfig();

export const createPost = ({ post }: Props): Promise<void | boolean> => {
  console.log(post);
  const formData = new FormData();
  for (const key in post) formData.append(key, post[key]);

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

export const updatePost = (post: Props): Promise<void | boolean> => {
  const formData = new FormData();
  for (const key in post) formData.append(key, post[key]);

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
