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
  formData: Content;
};

const CreateForm: React.FC<any> = ({ submitForm, formData }: Props) => {
  const [value, setValue] = useState(formData);
  const [uploadedImg, setUploadedImg] = useState([]);

  const { data, error } = useSWR(`${conf.api.url}getPost`, fetcher);

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

  if (error || !data) return <div>Getting posts...</div>;

  return (
    <form className={styles['create_content_form']} onSubmit={handleSubmit}>
      <Input title={'title'} value={value.title} handleChange={handleChange} />
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
      <RadioSelect title={'publish'} data={['publish', 'unpublish']} defaultValue={'publish'} />
      <div className={styles['button_wrapper']}>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreateForm;
