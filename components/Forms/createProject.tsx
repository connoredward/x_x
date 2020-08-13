import { useState } from 'react';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';

import { createProject } from '../../api/projects';

import styles from './styles.scss';

const CreateForm: React.FC = () => {
  const router = useRouter();
  const [value, setValue] = useState({
    title: '',
  });
  const [imgFile, setImgFile] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const item = { title: value.title, imgFile };
    const response = await createProject({ item });
    if (response === true) router.push('/projects');
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  const thumbs = imgFile.map((item, i) => (
    <div key={i}>
      <img src={item.preview} />
    </div>
  ));

  return (
    <form className={styles['create_project_form']} onSubmit={handleSubmit}>
      <div className={styles['main_row']}>
        <div>
          <label>Title</label>
          <input name="title" type="text" value={value.title} onChange={handleChange} />
        </div>
      </div>

      <div className={styles['file_uploader']}>
        <Dropzone
          onDrop={(acceptedFiles) =>
            setImgFile(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            )
          }
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag n drop some files or click here...</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      <div>{thumbs}</div>

      <span className={styles['primary_btn']}>
        <button type="submit">Action</button>
      </span>
    </form>
  );
};

export default CreateForm;
