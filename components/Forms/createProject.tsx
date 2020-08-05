import { useState } from 'react';
import Dropzone from 'react-dropzone';

import { createProject } from '../../api/projects';

import styles from './styles.scss';

const CreateForm: React.FC = () => {
  const [value, setValue] = useState();
  const [imgFile, setImgFile] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const item = { title: value, imgFile };
    createProject({ item });
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <form className={styles['create_form']} onSubmit={handleSubmit}>
      <div className={styles['container']}>
        <input className={styles['input']} type="text" placeholder="" value={value} onChange={handleChange} />
        <Dropzone onDrop={(acceptedFiles) => setImgFile(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag n drop some files here, or click fsdfsdf</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button className={styles['button']} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
