import { useContext } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import UpdateForm from '@components/Forms/createProject';
import SplashScreen from '@components/Splash';

import { Context as AuthContext } from '../../store/auth';
import { updateProject, deleteProject } from '../../api/projects';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const SubProjectPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getProject/${id}`, fetcher);

  async function submitForm(formData) {
    const res = await updateProject(formData);
    if (res) router.push('/projects');
  }

  async function removeProject(_id) {
    const res = await deleteProject({ _id });
    if (res) router.push('/projects');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <a href="/projects">Return</a>
      <button onClick={() => removeProject(data._id)}>DELETE PROJECT</button>
      <UpdateForm submitForm={(formData) => submitForm(formData)} formData={data} />
    </Navigation>
  );
};

export default SubProjectPage;
