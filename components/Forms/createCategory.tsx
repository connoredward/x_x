import { useState } from 'react';

import styles from './styles.scss';

type Props = {
  submitForm: (...args: any[]) => void;
  formData: {
    title: string;
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
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  return (
    <form className={styles['create_project_form']} onSubmit={handleSubmit}>
      <div className={styles['main_row']}>
        <div>
          <label>Title</label>
          <input name="title" type="text" value={value.title} onChange={handleChange} />
        </div>
      </div>

      <span className={styles['primary_btn']}>
        <button type="submit">Action</button>
      </span>
    </form>
  );
};

export default CreateForm;
