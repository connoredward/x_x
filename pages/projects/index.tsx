import { useState, useEffect } from 'react';

import Navigation from '@components/Navigation';
import GridLayout from '@components/GridLayout';

import Modal from '@components/Modal';
import CreateForm from '@components/Forms/createProject';

import ProjectCard from '@components/Cards/projectCard';

import { getAllProjects } from '../../api/projects';

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
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    onLoadPage();
  }, []);

  async function onLoadPage() {
    setProjectList(await getAllProjects());
  }

  return (
    <>
      <Navigation />
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
