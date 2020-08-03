import { useState } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import { signOutUser } from '../../api/user';

import styles from './styles.scss';

const Navigation: React.FC = () => {
  const router = useRouter();
  const [dropMenuActive, setDropMenuActive] = useState(false);

  async function signOut() {
    const response = await signOutUser();
    if (response === true) router.push('/login');
  }

  return (
    <nav className={styles['navigation_wrapper']}>
      <div>
        <div className={styles['nav_container']}>
          <div className={styles['menu_wrapper']}>
            <div className={styles['logo_wrapper']}>
              <img src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo" />
            </div>
            <div className={styles['buttons_wrapper']}>
              <div>
                <a href="/" className={styles['main_btn']}>
                  Dashboard
                </a>
                <a href="/projects" className={styles['sub_btn']}>
                  Projects
                </a>
                {/* <a href="#" className={styles["sub_btn"]}>Team</a> */}
                {/* <a href="#" className={styles["sub_btn"]}>Calendar</a> */}
                {/* <a href="#" className={styles["sub_btn"]}>Reports</a> */}
              </div>
            </div>
          </div>
          <div className={styles['profile_wrapper']}>
            <div className={styles['profile_icon']}>
              <button aria-label="Notifications">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* <!-- Profile dropdown --> */}
              <div className={styles['profile_dropdown']} onClick={() => setDropMenuActive(!dropMenuActive)}>
                <div>
                  <button aria-label="User menu" aria-haspopup="true">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
                <div className={classnames(styles['link_wrapper'], styles[dropMenuActive ? 'active' : undefined])}>
                  <div role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <a href="#" role="menuitem">
                      Your Profile
                    </a>
                    <a href="#" role="menuitem">
                      Settings
                    </a>
                    <button onClick={signOut}>Sign out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
