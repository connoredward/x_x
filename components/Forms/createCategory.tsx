import { useState } from 'react';

import Input from '@components/Input';
import RadioSelect from '@components/RadioSelect';

import styles from './styles.scss';

type Props = {
  submitForm: (...args: any[]) => void;
  formData: {
    title: string;
    status: string;
  };
};

const CreateForm: React.FC<any> = ({ submitForm, formData }: Props) => {
  const [value, setValue] = useState(formData);

  async function handleSubmit(event) {
    event.preventDefault();
    submitForm(value);
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    console.log(changedValue);
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  return (
    <form className={styles['create_post_form']} onSubmit={handleSubmit}>
      <Input title={'title'} value={value.title} handleChange={handleChange} />
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
          <a href="/category">Return</a>
        </span>
      </div>
    </form>
  );
};

export default CreateForm;
