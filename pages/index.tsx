import { useContext } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';

import { Context as AuthContext } from '../store/auth';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const Main: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getCategory`, fetcher);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <a href="/category/create">create category</a>
      <p>Category manager..</p>
      {data.map(({ title, slug }, index) => (
        <a key={index} href={`/category/${slug}`}>
          {title}
        </a>
      ))}
    </Navigation>
  );
};

export default Main;
