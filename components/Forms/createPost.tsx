import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Input from '@components/Input';
import Select from '@components/Select';
import UploadMedia from '@components/UploadMedia';
import RadioSelect from '@components/RadioSelect';

import { Post } from '../../interfaces';

import styles from './styles.scss';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  submitForm: (...args: any[]) => void;
  removePost?: (...args: any[]) => void;
  formData: Post;
};

const CreateForm: React.FC<any> = ({ submitForm, formData, removePost }: Props) => {
  const [value, setValue] = useState(formData);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState([]);

  const { data, error } = useSWR(`${conf.api.url}getCategory`, fetcher);

  useEffect(() => {
    if (formData && formData.img) setUploadedImg([{ preview: formData.img }]);
    if (formData && formData.video) setUploadedVideo([{ preview: formData.video }]);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (value.row) value.row = Number(value.row);
    if (value.column) value.column = Number(value.column);

    submitForm({
      ...value,
      img: uploadedImg[0] instanceof File ? uploadedImg[0] : formData.img,
      video: uploadedVideo[0] instanceof File ? uploadedVideo[0] : formData.video,
    });
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  if (error || !data) return <div>Loading categories...</div>;

  return (
    <form className={styles['create_post_form']} onSubmit={handleSubmit}>
      <Input title={'title'} value={value.title} handleChange={handleChange} />
      <Select
        handleChange={handleChange}
        name={'category'}
        defaultValue={formData.category}
        data={data.map(({ slug }) => {
          return slug;
        })}
      />
      <Select handleChange={handleChange} name={'row'} defaultValue={formData.row || 1} data={[1, 2, 3, 4, 5, 6]} />
      <Select
        handleChange={handleChange}
        name={'column'}
        defaultValue={formData.column || 1}
        data={[1, 2, 3, 4, 5, 6]}
      />
      <UploadMedia
        setFile={(file) => setUploadedImg(file)}
        removeFile={() => setUploadedImg([])}
        files={uploadedImg}
        uploadType={'image'}
      />
      <UploadMedia
        setFile={(file) => setUploadedVideo(file)}
        removeFile={() => setUploadedVideo([])}
        files={uploadedVideo}
        uploadType={'video'}
      />
      <RadioSelect title={'publish'} data={['publish', 'unpublish']} defaultValue={'publish'} />

      <div className={styles['buttons_wrapper']}>
        <span className={styles['submit_button']}>
          <button type="submit">Submit</button>
        </span>
        <span>
          <a href="/posts">Return</a>
        </span>
        {removePost && (
          <span className={styles['remove_button']}>
            <button onClick={removePost}>Remove</button>
          </span>
        )}
      </div>
    </form>
  );
};

export default CreateForm;
