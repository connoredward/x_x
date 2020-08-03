import classnames from 'classnames';

import styles from './styles.scss';

const Splash: React.FC<any> = ({ hide }: { hide: boolean }) => (
  <div className={classnames(styles['splash_screen'], styles[hide ? 'hide' : undefined])}>
    <h1>Loading...</h1>
  </div>
);

export default Splash;
