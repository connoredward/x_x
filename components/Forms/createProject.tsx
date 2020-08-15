import { useState } from 'react';
import Dropzone from 'react-dropzone';

import styles from './styles.scss';

type Props = {
  submitForm: (...args: any[]) => void;
};

const CreateForm: React.FC<any> = ({ submitForm }: Props) => {
  const [value, setValue] = useState({
    title: '',
  });
  const [imgFile, setImgFile] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    submitForm({ title: value.title, imgFile });
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
