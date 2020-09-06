import { useContext } from 'react';
import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import CreateForm from '@components/Forms/createPost';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';

import { createPost } from '../../api/posts';
import { Context as AuthContext } from '../../store/auth';

const formData = { title: '', row: 2, column: 2 };

const CreatePostPage: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  async function submitForm(formData) {
    const res = await createPost({ item: formData });
    if (res) router.push('/posts');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;

  return (
    <Navigation>
      <PageHeader />
      <CreateForm submitForm={(formData) => submitForm(formData)} formData={formData} />
    </Navigation>
  );
};

export default CreatePostPage;
