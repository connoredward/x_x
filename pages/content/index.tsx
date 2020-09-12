import { useState, useContext } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';
import Table from '@components/Table';
import SideModal from '@components/SideModal';

import { deleteContent, createContent } from '../../api/content';
import { Context as AuthContext } from '../../store/auth';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/content', title: 'Content' },
  ],
  title: 'All Content',
};

const tableHeaders = ['Name', 'Slug', 'Created at', 'Post', 'Status', ''];

const dataFormater = (selectedId, content) => {
  const { title, img, video, post, row, column, status } = content.find(({ _id }) => _id === selectedId);
  return { title, img, video, post, row, column, status };
};

const Content: React.FC = () => {
  const [sideModalContent, setSideModalContent] = useState(null);

  const postTagData = (_id) => {
    const category = posts.find((item) => {
      return item._id === _id;
    });
    return { color: category?.color, title: category?.title };
  };

  const { auth } = useContext(AuthContext);
  const { data: posts } = useSWR(`${conf.api.url}getPost`, fetcher);
  const { data: content, error } = useSWR(`${conf.api.url}getContent`);

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !content || !posts) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      {sideModalContent && <SideModal data={sideModalContent} close={() => setSideModalContent(null)} />}
      <PageHeader {...headerData} />
      <Table
        type={'content'}
        tableHeaders={tableHeaders}
        tableData={content.map((item) => {
          return {
            ...item,
            tag: postTagData(item.post),
          };
        })}
        deleteTable={(_ids) =>
          Promise.all(
            _ids.map((_id) => {
              return deleteContent({ _id });
            })
          )
        }
        copyTable={(selectedId) => createContent({ content: dataFormater(selectedId, content) })}
        openSideModal={(selectedId) =>
          setSideModalContent(
            content.find(({ _id }) => {
              return _id === selectedId;
            })
          )
        }
        deletePost={(_id) => deleteContent({ _id })}
      />
    </Navigation>
  );
};

export default Content;
