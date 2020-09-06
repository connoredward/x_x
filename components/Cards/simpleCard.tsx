import { ReactNode } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

const CategoryCard: React.FC<any> = ({ children, className }: Props) => (
  <div className={classnames(styles['category_card'], className)}>
    <div className={styles['card']}>{children}</div>
  </div>
);

export default CategoryCard;
