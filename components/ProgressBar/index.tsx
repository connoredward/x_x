import classnames from 'classnames';

import styles from './styles.scss';

const STEPS = ['', 'CREATING', 'UPLOADING_IMAGE', 'UPLOADING_VIDEO', 'COMPLETE'];

type Props = {
  status: string;
};

const ProgressBar: React.FC<any> = ({ status }: Props) => {
  console.log(status);
  return (
    <div className={styles['main']}>
      <div className={styles['progress_bar_wrapper']}>
        <div className={classnames(styles['progress_bar'], styles[status])} />
      </div>
      <span>
        {STEPS.findIndex((item) => {
          return item === status;
        })}
        /4
      </span>
    </div>
  );
};

export default ProgressBar;
