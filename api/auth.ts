import fetch from 'isomorphic-unfetch';
import config from '../config/var';

const apiUrl = config.api.dev;

export const checkToken = (): Promise<void | boolean> => {
  return fetch(apiUrl + 'checkToken', {
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
