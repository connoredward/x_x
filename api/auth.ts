import fetch from 'isomorphic-unfetch';

export const checkToken = (): Promise<void | boolean> => {
  return fetch('http://localhost:8080/checkToken', {
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
