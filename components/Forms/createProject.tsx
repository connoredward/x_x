import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import { Project } from '../../interfaces';

import styles from './styles.scss';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  submitForm: (...args: any[]) => void;
  formData: Project;
};

const CreateForm: React.FC<any> = ({ submitForm, formData }: Props) => {
  const [value, setValue] = useState(formData);
  const [uploadedFile, setUploadedFile] = useState([]);
  const { data, error } = useSWR(`${conf.api.url}getCategory`, fetcher);

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

  if (error || !data) return <div>Loading categories...</div>;

  return (
    <form className={styles['create_project_form']} onSubmit={handleSubmit}>
      <div className={styles['main_row']}>
        <div>
          <label>Title</label>
          <input name="title" type="text" value={value.title} onChange={handleChange} />
        </div>
      </div>

      <div className={styles['drop_down_select']}>
        <label htmlFor="grid-state">Category</label>
        <div className={styles['drop_down_wrapper']}>
          <select name="category" onChange={handleChange}>
            <option></option>
            {data.map(({ slug }, idx) => {
              return (
                <option selected={slug === formData.category ? true : false} key={idx}>
                  {slug}
                </option>
              );
            })}
          </select>
          <div className={styles['icon_wrapper']}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
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
