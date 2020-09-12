import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig: conf } = getConfig();

type Props = {
  _id: string;
};

export const deleteSub = ({ _id }: Props): Promise<boolean> => {
  return fetch(`${conf.api.url}deleteSub/${_id}`, {
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
  deleteSub,
};
