import styles from './styles.scss';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const GridLayout: React.FC = ({ children }: Props) => (
  <div className={styles['grid_wrapper']}>
    <div>{children}</div>
  </div>
);

export default GridLayout;
