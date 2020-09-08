import styles from './styles.scss';

type Props = {
  breadcrumbs: {
    link: string;
    title: string;
  }[];
  title: string;
};

const PageHeader: React.FC<any> = ({ breadcrumbs, title }: Props) => {
  return (
    <div className={styles['page_header']}>
      <div>
        {breadcrumbs &&
          breadcrumbs.map(({ link, title }, index) => {
            return (
              <span key={index}>
                <a href={link}>{title}</a> /{' '}
              </span>
            );
          })}
        <h1>{title}</h1>
        {/* <p>random text here maybe? possible explain something</p> */}
      </div>
    </div>
  );
};

export default PageHeader;
