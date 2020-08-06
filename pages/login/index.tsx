import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Modal from '@components/Modal';
import CreateUserForm from '@components/Forms/createUser';
import SplashScreen from '@components/Splash';

import { loginUser } from '../../api/user';
import { checkToken } from '../../api/auth';

import styles from './styles.scss';

const CreateUserModal: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <button onClick={() => setModalActive(!modalActive)}>start your 14-day free trial</button>
      <Modal active={modalActive} close={() => setModalActive(false)}>
        <CreateUserForm close={() => setModalActive(false)} />
      </Modal>
    </>
  );
};

const Login: React.FC = () => {
  const router = useRouter();
  const [value, setValue] = useState({
    email: '',
    password: '',
  });
  const [hide, setHide] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const response = await checkToken();
    if (response === true) router.push('/');
    setHide(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await loginUser(value);
    if (response === true) router.push('/');
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    setValue((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  return (
    <div className={styles['page_wrapper']}>
      <SplashScreen hide={hide} />
      <div className={styles['content_header']}>
        <div>
          <img src="../../static/images/happy-bunch.png" />
          <h2>Sign in to your account</h2>
          {/* USER CREATE MODAL */}
          <div className={styles['button_wrapper']}>
            <p>Or</p>
            <CreateUserModal />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className={styles['form_wrapper']}>
            <div>
              <input
                aria-label="Email address"
                name="email"
                type="email"
                required
                className={styles['email_input']}
                placeholder="Email address"
                value={value.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles['password_input_wrapper']}>
              <input
                aria-label="Password"
                name="password"
                type="password"
                required
                className={styles['password_input']}
                placeholder="Password"
                value={value.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles['form_extra_wrapper']}>
            <div className={styles['form_remember_me']}>
              <input id="remember_me" type="checkbox" />
              <label htmlFor="remember_me">Remember me</label>
            </div>

            <div className={styles['form_forgot_password']}>
              <a href="#">Forgot your password?</a>
            </div>
          </div>

          <div className={styles['form_button_wrapper']}>
            <button type="submit">
              <span>
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
