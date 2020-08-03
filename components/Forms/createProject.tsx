import { useState } from 'react';

import { createProject } from '../../api/projects';

import styles from './styles.scss';

const CreateForm: React.FC = () => {
  const [value, setValue] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    const item = { title: value };
    createProject({ item });
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <form className={styles['create_form']} onSubmit={handleSubmit}>
      <div className={styles['container']}>
        <input className={styles['input']} type="text" placeholder="" value={value} onChange={handleChange} />
        <button className={styles['button']} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
