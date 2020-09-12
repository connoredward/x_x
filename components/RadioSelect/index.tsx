import styles from './styles.scss';

type Props = {
  title: string;
  data: string[];
  handleChange: (...args: any[]) => void;
  defaultValue?: string;
};

const RadioSelect: React.FC<any> = ({ title, data, defaultValue, handleChange }: Props) => (
  <div className={styles['radio_wrapper']}>
    <div className={styles['label_container']}>
      <label>{title}</label>
    </div>
    <div className={styles['radio_container']}>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <input
              onChange={handleChange}
              type="radio"
              name={title}
              value={item}
              checked={defaultValue == item || (!defaultValue && item === 'unpublish') ? true : false}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        );
      })}
    </div>
  </div>
);

export default RadioSelect;
