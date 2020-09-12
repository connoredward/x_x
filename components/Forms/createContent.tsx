import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Input from '@components/Input';
import Select from '@components/Select';
import UploadMedia from '@components/UploadMedia';
import RadioSelect from '@components/RadioSelect';

import { Content } from '../../interfaces';

import styles from './styles.scss';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  submitForm: (...args: any[]) => void;
  removeContent?: (...args: any[]) => void;
  formData: Content;
};

const CreateForm: React.FC<any> = ({ submitForm, removeContent, formData }: Props) => {
  const [value, setValue] = useState(formData);
  const [uploadedImg, setUploadedImg] = useState([]);

  useEffect(() => {
    if (formData && formData.img) setUploadedImg([{ preview: formData.img }]);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (value.row) value.row = Number(value.row);
    if (value.column) value.column = Number(value.column);
    submitForm({
      ...value,
      img: uploadedImg[0] instanceof File ? uploadedImg[0] : formData.img,
    });
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  const { data: posts, error } = useSWR(`${conf.api.url}getPost`, fetcher);
  if (error || !posts) return <div>Getting posts...</div>;

  return (
    <form className={styles['create_post_form']} onSubmit={handleSubmit}>
      <Input title={'title'} value={value.title} handleChange={handleChange} />
      <Select
        handleChange={handleChange}
        name={'post'}
        defaultValue={formData.post}
        data={posts.map(({ slug, _id }) => {
          return { value: slug, _id };
        })}
      />
      <Select
        handleChange={handleChange}
        name={'row'}
        defaultValue={formData.row || 1}
        data={[1, 2, 3, 4, 5, 6].map((value) => {
          return { value };
        })}
      />
      <Select
        handleChange={handleChange}
        name={'column'}
        defaultValue={formData.column || 1}
        data={[1, 2, 3, 4, 5, 6].map((value) => {
          return { value };
        })}
      />
      <UploadMedia
        setFile={(file) => setUploadedImg(file)}
        removeFile={() => setUploadedImg([])}
        files={uploadedImg}
        uploadType={'image'}
      />
      <RadioSelect
        handleChange={handleChange}
        title={'status'}
        data={['published', 'unpublished']}
        defaultValue={value.status}
      />
      <div className={styles['buttons_wrapper']}>
        <span className={styles['submit_button']}>
          <button type="submit">Submit</button>
        </span>
        <span>
          <a href="/content">Return</a>
        </span>
        {removeContent && (
          <span className={styles['remove_button']}>
            <button onClick={removeContent}>Remove</button>
          </span>
        )}
      </div>
    </form>
  );
};

export default CreateForm;
