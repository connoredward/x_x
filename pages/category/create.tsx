import { useContext } from 'react';
import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import CreateForm from '@components/Forms/createCategory';
import SplashScreen from '@components/Splash';

import { createCategory } from '../../api/category';
import { Context as AuthContext } from '../../store/auth';

const formData = { title: '' };

const CreatePagePage: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  async function submitForm(formData) {
    const res = await createCategory(formData);
    if (res) router.push('/');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;

  return (
    <Navigation>
      <CreateForm submitForm={(formData) => submitForm(formData)} formData={formData} />
    </Navigation>
  );
};

export default CreatePagePage;
