import ProgressBar from '@components/ProgressBar';
import DropDown from '@components/DropDown';

import { deleteSub } from '../../api/sub';

import { Post } from '../../interfaces';

import styles from './styles.scss';

const DropDownButton = () => <button className={styles['drop_down_button']}>Options</button>;

const ProgressCard: React.FC<any> = ({ img, title, status, createdAt, _id }: Post) => (
  <div className={styles['progress_card']}>
    <div>
      <div className={styles['placeholder_img']} style={{ backgroundImage: `url(${img})` }} />
    </div>
    <div>
      <span>{title}</span>
    </div>
    <div>
      <span>Owner</span>
      <p>owner</p>
    </div>
    <div>
      <span>Created on</span>
      <p>{createdAt.substr(0, 10)}</p>
    </div>
    <ProgressBar status={status} />
    <div className={styles['center_items']}>
      {status === 'COMPLETE' && (
        <DropDown button={<DropDownButton />}>
          <button onClick={() => deleteSub({ _id })}>Remove</button>
        </DropDown>
      )}
    </div>
  </div>
);

export default ProgressCard;
