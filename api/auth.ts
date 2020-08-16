import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig: conf } = getConfig();

export const checkToken = (): Promise<void | boolean> => {
  return fetch(`${conf.api.url}checkToken`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .then((data) => {
      return data;
    });
};

export default {
  checkToken,
};
