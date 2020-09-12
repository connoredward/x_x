import { useState, useContext } from 'react';
import getConfig from 'next/config';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';
import Table from '@components/Table';
import SideModal from '@components/SideModal';

import { deleteCategory, createCategory } from '../../api/category';
import { Context as AuthContext } from '../../store/auth';

const { publicRuntimeConfig: conf } = getConfig();

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/category', title: 'Categories' },
  ],
  title: 'All Categories',
};

const tableHeaders = ['Name', 'Slug', 'Created at', 'status', ''];

const dataFormater = (selectedId, categories) => {
  const { title, status } = categories.find(({ _id }) => _id === selectedId);
  return { title, status };
};

const Categories: React.FC = () => {
  const [sideModalContent, setSideModalContent] = useState(null);

  const { auth } = useContext(AuthContext);
  const { data: categories, error } = useSWR(`${conf.api.url}getCategory`);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !categories) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      {sideModalContent && <SideModal data={sideModalContent} close={() => setSideModalContent(null)} />}
      <PageHeader {...headerData} />
      <Table
        type={'category'}
        tableHeaders={tableHeaders}
        tableData={categories}
        deleteTable={(_ids) =>
          Promise.all([
            _ids.map((_id) => {
              return deleteCategory({ _id });
            }),
          ])
        }
        copyTable={(selectedId) => createCategory({ item: dataFormater(selectedId, categories) })}
        openSideModal={(selectedId) =>
          setSideModalContent(
            categories.find(({ _id }) => {
              return _id === selectedId;
            })
          )
        }
        deletePost={(_id) => deleteCategory({ _id })}
      />
    </Navigation>
  );
};

export default Categories;
