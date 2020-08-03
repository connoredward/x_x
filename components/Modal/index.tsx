import classnames from 'classnames';

import styles from './styles.scss';

type Props = {
  active: boolean;
  close: () => void;
  children?: JSX.Element[] | JSX.Element;
};

const Modal: React.FC<any> = ({ active, close, children }: Props) => (
  // <!--Modal-->
  <div className={classnames(styles['modal_wrapper'], styles[active ? 'active' : undefined])}>
    <div className={styles['modal_overlay']} onClick={() => close()}></div>

    <div className={styles['modal_container']}>
      <div className={styles['modal_close']} onClick={() => close()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </div>

      {/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
      <div className={styles['modal_content']}>
        {/* <!--Title--> */}
        <div className={styles['content_title']}>
          {/* <p>Simple Modal!</p> */}
          <div className={styles['icon']} onClick={() => close()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>

        {/* <!--Body--> */}
        <div className={styles['modal_body']}>{children}</div>

        {/* <!--Footer--> */}
        <div className={styles['modal_footer']}>
          <span className={styles['primary_btn']}>
            <button>Action</button>
          </span>
          <span className={styles['cancel_btn']} onClick={() => close()}>
            <button>Close</button>
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
