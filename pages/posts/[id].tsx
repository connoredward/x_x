import { useContext } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import UpdateForm from '@components/Forms/createPost';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';

import { Context as AuthContext } from '../../store/auth';
import { updatePost, deletePost } from '../../api/posts';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const SubPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getPost/${id}`, fetcher);

  async function submitForm(formData) {
    const res = await updatePost(formData);
    if (res) router.push('/posts');
  }

  async function removePost(_id) {
    const res = await deletePost({ _id });
    if (res) router.push('/posts');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <PageHeader />
      <UpdateForm
        submitForm={(formData) => submitForm(formData)}
        formData={data}
        removePost={() => removePost(data._id)}
      />
    </Navigation>
  );
};

export default SubPostPage;
