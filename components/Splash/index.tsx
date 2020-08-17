import { useState, useEffect } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

type Props = {
  content?: string;
  hide?: boolean;
};

const dots = ['', '.', '..', '...'];

const Splash: React.FC<any> = ({ hide, content }: Props) => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCounter((count) => (count === 4 ? 0 : count + 1)), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={classnames(styles['splash_screen'], styles[hide ? 'hide' : undefined])}>
      <h1>
        {content}
        {dots[counter]}
      </h1>
    </div>
  );
};

export default Splash;
