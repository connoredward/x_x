import { useContext } from 'react';
import getConfig from 'next/config';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import PageHeader from '@components/PageHeader';
import SplashScreen from '@components/Splash';
import ProgressCard from '@components/Cards/progressCard';

import { Context as AuthContext } from '../../store/auth';

import styles from './styles.scss';

const { publicRuntimeConfig: conf } = getConfig();

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/progress', title: 'Progress' },
  ],
  title: 'All tasks progress',
};

const Progress: React.FC<any> = () => {
  const { auth } = useContext(AuthContext);
  const { data: subscriptions, error } = useSWR(`${conf.api.url}getSub`);

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !subscriptions) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <PageHeader {...headerData} />
      <div className={styles['card_wrapper']}>
        {subscriptions.map((item, index) => {
          return <ProgressCard key={index} {...item} />;
        })}
      </div>
    </Navigation>
  );
};

export default Progress;
