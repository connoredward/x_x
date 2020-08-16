import fetch from 'isomorphic-unfetch';
import config from '../config/var';

const api = config.api.uri;

export const checkToken = (): Promise<void | boolean> => {
  return fetch(api + 'checkToken', {
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
