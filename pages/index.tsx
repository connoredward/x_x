import { useContext } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';
import SimpleCard from '@components/Cards/simpleCard';
import GridLayout from '@components/GridLayout';
import Table from '@components/Table';

import { Context as AuthContext } from '../store/auth';

import styles from './styles.scss';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const RecentlyAdded: React.FC = () => {
  const { data, error } = useSWR(`${conf.api.url}getProject`, fetcher);
  if (error || !data) return <div>Loading...</div>;

  return (
    <div>
      <Table data={data} />
    </div>
  );
};

const Main: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getCategory`, fetcher);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;
  return <Navigation data={data}></Navigation>;
};

export default Main;
