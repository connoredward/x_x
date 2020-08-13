import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import fetch from 'isomorphic-unfetch';

import Navigation from '@components/Navigation';
import GridLayout from '@components/GridLayout';
import ProjectCard from '@components/Cards/projectCard';
import SplashScreen from '@components/Splash';

import { getAllProjects } from '../../api/projects';
import { checkToken } from '../../api/auth';
import { Project } from '../../interfaces';

type Props = {
  items?: Project;
};

const Projects: React.FC = () => {
  const router = useRouter();
  const [projectList, setProjectList] = useState([]);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  console.log(projectList);

  async function onLoad() {
    const response = await checkToken();
    if (response === true) {
      setHide(true);
      setProjectList(await getAllProjects());
    } else {
      router.push('/login');
    }
  }

  return (
    <Navigation>
      <SplashScreen hide={hide} />
      <a href="/projects/create">Add project ...</a>
      <GridLayout>
        {projectList.map((item, i) => (
          <ProjectCard key={i} {...item} />
        ))}
      </GridLayout>
    </Navigation>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await fetch(`http://localhost:8080/getAllProjects`)
//   const items = await response.json();
//   return { props: { items } };
// };

export default Projects;
