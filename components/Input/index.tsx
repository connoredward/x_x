import classnames from 'classnames';

import styles from './styles.scss';

type Props = {
  title: string;
  value: string;
  handleChange: (...args: any[]) => void;
  className?: string;
};

const Input: React.FC<any> = ({ title, value, handleChange, className }: Props) => (
  <div className={styles['input_wrapper']}>
    <div className={classnames(styles['label_container'], className)}>
      <label>{title}</label>
    </div>
    <div className={styles['input_container']}>
      <input name={title} type="text" value={value} onChange={handleChange} />
    </div>
  </div>
);

export default Input;
