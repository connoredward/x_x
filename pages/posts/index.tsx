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
    { link: '/posts', title: 'Posts' },
  ],
  title: 'All Posts',
};

const { publicRuntimeConfig: conf } = getConfig();

const Posts: React.FC = () => {
  const [sideModalActive, setSideModalActve] = useState(false);
  const [sideModalContent, setSideModalContent] = useState({});

  function closeSideModal() {
    setSideModalActve(false);
    setSideModalContent({});
  }

  function openSideModal(value) {
    setSideModalActve(true);
    setSideModalContent(value);
  }

  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getPost`);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <SideModal active={sideModalActive} data={sideModalContent} close={() => closeSideModal()} />
      <PageHeader {...headerData} />
      <Table tableData={data} openSide={(value) => openSideModal(value)} />
    </Navigation>
  );
};

export default Posts;
