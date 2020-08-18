import { useContext } from 'react';
import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import CreateForm from '@components/Forms/createProject';
import SplashScreen from '@components/Splash';

import { createProject } from '../../api/projects';
import { Context as AuthContext } from '../../store/auth';

const CreateProjectPage: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  async function submitForm(formData) {
    const response = await createProject({ item: formData });
    if (response === true) router.push('/projects');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  return (
    <Navigation>
      <a href="/projects">Return</a>
      <CreateForm submitForm={(formData) => submitForm(formData)} />
    </Navigation>
  );
};

export default CreateProjectPage;
