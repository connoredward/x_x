import { useContext } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Navigation from '@components/Navigation';
import GridLayout from '@components/GridLayout';
import ProjectCard from '@components/Cards/projectCard';
import SplashScreen from '@components/Splash';

import { Context as AuthContext } from '../../store/auth';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

const Projects: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const { data, error } = useSWR(`${conf.api.url}getProject`, fetcher);
  if (!auth) return <SplashScreen content={'Authenticating'} />;
  if (error || !data) return <SplashScreen content={'Loading'} />;

  return (
    <Navigation>
      <a href="/projects/create">Add project ...</a>
      <GridLayout>
        {data.map((item, i) => (
          <ProjectCard key={i} {...item} />
        ))}
      </GridLayout>
    </Navigation>
  );
};

export default Projects;
