import fetch from 'isomorphic-unfetch';

type Props = {
  newUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  userDetails: {
    email: string;
    password: string;
  };
};

export const createNewUser = (newUser: {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}): Promise<string | void> => {
  return fetch('http://localhost:8080/createUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      return data;
    });
};

export const loginUser = (userDetails: { email: string; password: string }): Promise<boolean | void> => {
  return fetch('http://localhost:8080/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userDetails),
    credentials: 'include',
  })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        // const error = new Error(res.error);
        // throw error;
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      alert('Error logging in please try again');
    });
};

export const signOutUser = (): Promise<boolean | void> => {
  return fetch('http://localhost:8080/signOut', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      alert('Error signing out please try again');
    });
};

export default {
  createNewUser,
  loginUser,
  signOutUser,
};
