import { useContext } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import UpdateForm from '@components/Forms/createCategory';
import SplashScreen from '@components/Splash';
import PageHeader from '@components/PageHeader';

import { Context as AuthContext } from '../../store/auth';
import { updateCategory, deleteCategory } from '../../api/category';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const headerData = {
  breadcrumbs: [
    { link: '/', title: 'Dashboard' },
    { link: '/category', title: 'Category' },
    { link: '/category/create', title: 'Create' },
  ],
  title: 'Edit Category',
};

const SubCategoryPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { auth } = useContext(AuthContext);
  const { data: category, error } = useSWR(`${conf.api.url}getCategory/${id}`, fetcher);

  async function submitForm(formData) {
    const res = await updateCategory(formData);
    if (res) router.push('/category');
  }

  async function removeCategory(_id) {
    const res = await deleteCategory({ _id });
    if (res) router.push('/category');
  }

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !category) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <PageHeader {...headerData} />
      <UpdateForm
        formData={category}
        submitForm={(formData) => submitForm(formData)}
        removeCategory={() => removeCategory(category._id)}
      />
    </Navigation>
  );
};

export default SubCategoryPage;
