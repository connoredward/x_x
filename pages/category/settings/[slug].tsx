import { useContext } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import UpdateForm from '@components/Forms/createCategory';
import SplashScreen from '@components/Splash';

import { updateCategory, deleteCategory } from '../../../api/category';
import { Context as AuthContext } from '../../../store/auth';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const SettingsCategoryPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getCategory/${slug}`, fetcher);

  async function submitForm(formData) {
    const res = await updateCategory(formData);
    if (res) router.push('/');
  }

  async function removeCategory(_id) {
    const res = await deleteCategory(_id);
    if (res) router.push('/');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <button onClick={() => removeCategory(data._id)}>Delete category</button>
      <UpdateForm submitForm={(formData) => submitForm(formData)} formData={data} />
    </Navigation>
  );
};

export default SettingsCategoryPage;
