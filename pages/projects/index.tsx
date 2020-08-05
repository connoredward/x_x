import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import GridLayout from '@components/GridLayout';
import Modal from '@components/Modal';
import CreateForm from '@components/Forms/createProject';
import ProjectCard from '@components/Cards/projectCard';
import SplashScreen from '@components/Splash';

import { getAllProjects } from '../../api/projects';
import { checkToken } from '../../api/auth';

import styles from './styles.scss';

const CreateModal: React.FC = () => {
  const [modalActive, setModalActice] = useState(false);

  return (
    <>
      <button onClick={() => setModalActice(!modalActive)}>Add project ...</button>
      <Modal active={modalActive} close={() => setModalActice(false)}>
        <CreateForm />
      </Modal>
    </>
  );
};

const Projects: React.FC = () => {
  const router = useRouter();
  const [projectList, setProjectList] = useState([]);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

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
    <>
      <Navigation />
      <SplashScreen hide={hide} />
      <div className={styles['content_wrapper']}>
        <CreateModal />
        <GridLayout>
          {projectList.map((item, i) => (
            <ProjectCard key={i} {...item} />
          ))}
        </GridLayout>
      </div>
    </>
  );
};

export default Projects;
