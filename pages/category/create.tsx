import { useContext } from 'react';
import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import CreateForm from '@components/Forms/createCategory';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';

import { createCategory } from '../../api/category';
import { Context as AuthContext } from '../../store/auth';

const formData = { title: '', status: 'unpublished' };

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/category', title: 'Categories' },
    { link: '/category/create', title: 'Create' },
  ],
  title: 'Create Category',
};

const CreatePagePage: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  async function submitForm(formData) {
    const res = await createCategory({ item: formData });
    if (res) router.push('/category');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;

  return (
    <Navigation>
      <PageHeader {...headerData} />
      <CreateForm submitForm={(formData) => submitForm(formData)} formData={formData} />
    </Navigation>
  );
};

export default CreatePagePage;
