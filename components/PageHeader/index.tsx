import styles from './styles.scss';

const PageHeader: React.FC<any> = () => {
  return (
    <div className={styles['page_header']}>
      <div>
        <p>Home / Form / Create Form</p>
        <h1>Create Post</h1>
        <p>random text here maybe? possible explain something</p>
      </div>
    </div>
  );
};

export default PageHeader;
