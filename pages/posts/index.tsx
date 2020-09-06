import { useContext } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import GridLayout from '@components/GridLayout';
import PostCard from '@components/Cards/postCard';
import SplashScreen from '@components/Splash';

import { Context as AuthContext } from '../../store/auth';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const Posts: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getPost`, fetcher);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <a href="/posts/create">Add post...</a>
      <GridLayout>
        {data.map((item, i) => (
          <PostCard key={i} {...item} />
        ))}
      </GridLayout>
    </Navigation>
  );
};

export default Posts;
