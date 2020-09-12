import { useContext } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import UpdateForm from '@components/Forms/createContent';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';

import { Context as AuthContext } from '../../store/auth';
import { updateContent, deleteContent } from '../../api/content';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/content', title: 'Content' },
    { link: '/content/create', title: 'Create' },
  ],
  title: 'Edit Content',
};

const SubContentPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useContext(AuthContext);
  const { data: content, error } = useSWR(`${conf.api.url}getContent/${id}`, fetcher);

  async function submitForm(formData) {
    const res = await updateContent(formData);
    if (res) router.push('/content');
  }

  async function removeContent(_id) {
    const res = await deleteContent({ _id });
    if (res) router.push('/content');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !content) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <PageHeader {...headerData} />
      <UpdateForm
        submitForm={(formData) => submitForm(formData)}
        formData={content}
        removeContent={() => removeContent(content._id)}
      />
    </Navigation>
  );
};

export default SubContentPage;
