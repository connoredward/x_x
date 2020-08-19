import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { checkToken } from '../api/auth';

type Props = {
  children?: JSX.Element | JSX.Element[];
  auth: boolean;
};

export const Context = React.createContext<Props | null>(null);

export const Store: React.FC = ({ children }: Props) => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function authApp() {
      const res = await checkToken();
      if (!res) router.push('/login');
      if (res && router.pathname === '/login') router.push('/');
      setAuth(true);
    }
    authApp();
  }, []);

  return <Context.Provider value={{ auth }}>{children}</Context.Provider>;
};

export default {
  Store,
  Context,
};
