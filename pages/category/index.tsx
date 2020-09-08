import { useState, useContext } from 'react';
import getConfig from 'next/config';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';
import Table from '@components/Table';
import SideModal from '@components/SideModal';

import { Context as AuthContext } from '../../store/auth';

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/posts', title: 'Categories' },
  ],
  title: 'All Categories',
};

const { publicRuntimeConfig: conf } = getConfig();

const Categories: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getCategory`);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <PageHeader {...headerData} />
      <Table tableData={data} />
    </Navigation>
  );
};

export default Categories;
