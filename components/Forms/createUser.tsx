import { useState } from 'react';

import { createNewUser } from '../../api/user';

import styles from './styles.scss';

const CreateUserForm: React.FC = () => {
  const [value, setValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const e = await createNewUser(value);
    console.log('a return value', e);
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  return (
    <form className={styles['create_user_form']} onSubmit={handleSubmit}>
      {/* NAME CREDENTIALS */}
      <div className={styles['name_credentials']}>
        <div className={styles['first_name']}>
          <label>First Name</label>
          <input name="firstName" type="text" value={value.firstName} onChange={handleChange} />
          <p>Please fill out this field.</p>
        </div>
        <div className={styles['last_name']}>
          <label>Last Name</label>
          <input name="lastName" type="text" value={value.lastName} onChange={handleChange} />
        </div>
      </div>

      {/* EMAIL */}
      <div className={styles['main_row']}>
        <div>
          <label>Email</label>
          <input name="email" type="text" value={value.email} onChange={handleChange} />
        </div>
      </div>

      {/* PASSWORD */}
      <div className={styles['main_row']}>
        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="******************"
            value={value.password}
            onChange={handleChange}
          />
          <p>Make it as long and as crazy as youd like</p>
        </div>
      </div>

      <div className={styles['modal_footer']}>
        <span className={styles['primary_btn']}>
          <button type="submit">Action</button>
        </span>
        <span className={styles['cancel_btn']} onClick={() => close()}>
          <button>Close</button>
        </span>
      </div>
    </form>
  );
};

export default CreateUserForm;
