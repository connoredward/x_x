import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';

import { Project } from '../../interfaces';

import styles from './styles.scss';

type Props = {
  submitForm: (...args: any[]) => void;
  formData: Project;
};

const CreateForm: React.FC<any> = ({ submitForm, formData }: Props) => {
  const [value, setValue] = useState(formData);
  const [uploadedFile, setUploadedFile] = useState([]);

  useEffect(() => {
    if (formData && formData.img) setUploadedFile([{ preview: formData.img }]);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    submitForm({
      ...value,
      img: uploadedFile[0] instanceof File ? uploadedFile[0] : formData.img,
    });
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  const thumbs = uploadedFile.map((item, i) => (
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
            setUploadedFile(
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

      <div className={styles['thumbs_wrapper']}>{thumbs}</div>

      <span className={styles['primary_btn']}>
        <button type="submit">Action</button>
      </span>
    </form>
  );
};

export default CreateForm;
