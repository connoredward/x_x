import styles from './styles.scss';

type Props = {
  title: string;
  value: string;
  handleChange: (...args: any[]) => void;
};

const Input: React.FC<any> = ({ title, value, handleChange }: Props) => (
  <div className={styles['input_wrapper']}>
    <div className={styles['label_container']}>
      <label>{title}</label>
    </div>
    <div className={styles['input_container']}>
      <input name={title} type="text" value={value} onChange={handleChange} />
    </div>
  </div>
);

export default Input;
