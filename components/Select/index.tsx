import classnames from 'classnames';

import styles from './styles.scss';

type Props = {
  handleChange: (...args: any[]) => void;
  name: string;
  defaultValue: string;
  data: string[];
  className?: string;
};

const Select: React.FC<any> = ({ handleChange, name, defaultValue, data, className }: Props) => (
  <div className={styles['drop_down_select']}>
    <div className={classnames(styles['label_container'], className)}>
      <label htmlFor="grid-state">{name}</label>
    </div>
    <div className={styles['select_container']}>
      <div className={styles['drop_down_wrapper']}>
        <select name={name} onChange={handleChange}>
          <option></option>
          {data.map((item, idx) => {
            return (
              <option selected={item == defaultValue ? true : false} key={idx}>
                {item}
              </option>
            );
          })}
        </select>
        <div className={styles['icon_wrapper']}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default Select;
