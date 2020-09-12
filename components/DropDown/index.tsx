import { useState, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

type Props = {
  children?: ReactNode;
  button?: ReactNode;
};

const DropDown: React.FC<any> = ({ children, button }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles['profile_dropdown']} onClick={() => setActive(!active)}>
      <div>{button}</div>
      <div className={classnames(styles['link_wrapper'], styles[active ? 'active' : undefined])}>
        <div role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
