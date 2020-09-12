import { useState, useContext } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';
import Table from '@components/Table';
import SideModal from '@components/SideModal';

import { deletePost, createPost } from '../../api/posts';
import { Context as AuthContext } from '../../store/auth';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/posts', title: 'Posts' },
  ],
  title: 'All Posts',
};

const tableHeaders = ['Name', 'Slug', 'Created at', 'Category', 'Status', ''];

const dataFormater = (selectedId, post) => {
  const { title, img, video, category, row, column, status } = post.find(({ _id }) => _id === selectedId);
  return { title, img, video, category, row, column, status };
};

const Posts: React.FC = () => {
  const [sideModalContent, setSideModalContent] = useState(null);

  const categoryTagData = (_id) => {
    const category = categories.find((item) => {
      return item._id === _id;
    });
    return { color: category.color, title: category.title };
  };

  const { auth } = useContext(AuthContext);
  const { data: categories } = useSWR(`${conf.api.url}getCategory`, fetcher);
  const { data: post, error } = useSWR(`${conf.api.url}getPost`);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !post || !categories) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      {sideModalContent && <SideModal data={sideModalContent} close={() => setSideModalContent(null)} />}
      <PageHeader {...headerData} />
      <Table
        type={'posts'}
        tableHeaders={tableHeaders}
        tableData={post.map((item) => {
          return {
            ...item,
            tag: categoryTagData(item.category),
          };
        })}
        deleteTable={(_ids) =>
          Promise.all(
            _ids.map((_id) => {
              return deletePost({ _id });
            })
          )
        }
        copyTable={(selectedId) => createPost({ post: dataFormater(selectedId, post) })}
        openSideModal={(selectedId) =>
          setSideModalContent(
            post.find(({ _id }) => {
              return _id === selectedId;
            })
          )
        }
        deletePost={(_id) => deletePost({ _id })}
      />
    </Navigation>
  );
};

export default Posts;
