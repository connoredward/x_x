import { useState } from 'react';

import Input from '@components/Input';
import RadioSelect from '@components/RadioSelect';
import ColourPicker from '@components/ColourPicker';

import styles from './styles.scss';

type Props = {
  submitForm: (...args: any[]) => void;
  removeCategory: (...args: any[]) => void;
  formData: {
    title: string;
    status: string;
    color: string;
  };
};

const CreateForm: React.FC<any> = ({ submitForm, formData, removeCategory }: Props) => {
  const [value, setValue] = useState(formData);

  async function handleSubmit(event) {
    event.preventDefault();
    submitForm(value);
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
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
      <ColourPicker
        handleChange={(event) => setValue((prevVal) => ({ ...prevVal, color: event.hex }))}
        color={value.color}
      />

      <div className={styles['buttons_wrapper']}>
        <span className={styles['submit_button']}>
          <button type="submit">Submit</button>
        </span>
        <span>
          <a href="/category">Return</a>
        </span>
        {removeCategory && (
          <span className={styles['remove_button']}>
            <button onClick={removeCategory}>Remove</button>
          </span>
        )}
      </div>
    </form>
  );
};

export default CreateForm;
