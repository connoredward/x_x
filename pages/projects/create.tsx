import { useRouter } from 'next/router';

import Navigation from '@components/Navigation';
import CreateForm from '@components/Forms/createProject';

import { createProject } from '../../api/projects';

const CreateProjectPage: React.FC = () => {
  const router = useRouter();

  async function submitForm(formData) {
    const response = await createProject({ item: formData });
    if (response === true) router.push('/projects');
  }

  return (
    <Navigation>
      <a href="/projects">Return</a>
      <CreateForm submitForm={(formData) => submitForm(formData)} />
    </Navigation>
  );
};

export default CreateProjectPage;
