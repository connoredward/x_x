import { useContext } from 'react';
import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import CreateForm from '@components/Forms/createContent';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';

import { createContent } from '../../api/content';
import { Context as AuthContext } from '../../store/auth';

const formData = { title: '', row: 2, column: 2, status: 'unpublished' };

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/content', title: 'Content' },
    { link: '/content/create', title: 'Create' },
  ],
  title: 'Create Content',
};

const CreateContentPage: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  function submitForm(formData) {
    createContent({ content: formData });
    router.push('/content');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;

  return (
    <Navigation>
      <PageHeader {...headerData} />
      <CreateForm submitForm={(formData) => submitForm(formData)} formData={formData} />
    </Navigation>
  );
};

export default CreateContentPage;
