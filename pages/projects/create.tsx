import { useState, useEffect } from 'react';

import Navigation from '@components/Navigation';
import CreateForm from '@components/Forms/createProject';

const CreateProjectPage: React.FC = () => {
  return (
    <Navigation>
      <a href="/projects">Return</a>
      <CreateForm />
    </Navigation>
  );
};

export default CreateProjectPage;
