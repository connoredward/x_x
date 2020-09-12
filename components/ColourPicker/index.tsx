import { useState } from 'react';

import { BlockPicker } from 'react-color';

import styles from './styles.scss';

type Props = {
  color: string;
  handleChange: (...args: any[]) => void;
};

const ColourPicker: React.FC<any> = ({ color, handleChange }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles['colour_picker_wrapper']}>
      <div className={styles['label_container']}>
        <label>colour</label>
      </div>
      <div className={styles['colour_picker_container']}>
        <button onClick={() => setActive(!active)} type="button">
          <div style={{ backgroundColor: color }} className={styles['button_colour']} />
        </button>
        {active && (
          <div className={styles['colour_modal']}>
            <BlockPicker onChange={handleChange} color={color} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColourPicker;
