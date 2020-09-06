import { useContext } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import SplashScreen from '@components/Splash';

import { Context as AuthContext } from '../../store/auth';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  slug: string;
};

const Content: React.FC<any> = ({ slug }: Props) => {
  const { data, error } = useSWR(`${conf.api.url}getProject`, fetcher);
  if (error || !data) return <div>Loading...</div>;
  return (
    <div>
      {data
        .filter(({ category }) => category === slug)
        .map(({ title, category, _id }, index) => {
          return (
            <div key={index}>
              <p>
                {title} - {category}
              </p>
              <a href={`/projects/${_id}`}>edit project...</a>
            </div>
          );
        })}
    </div>
  );
};

const SubCategoryPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getCategory/${slug}`, fetcher);

  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <a href={`/category/settings/${slug}`}>Edit category settings</a>
      <a href="/projects/create">Add project</a>
      <Content slug={slug} />
    </Navigation>
  );
};

export default SubCategoryPage;
