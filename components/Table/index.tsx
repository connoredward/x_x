import { Post } from '../../interfaces';

import styles from './styles.scss';

type Props = {
  data: Post[];
};

const Table: React.FC<any> = ({ data }: Props) => {
  return (
    <div className={styles['table_wrapper']}>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Created at</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ category, createdAt, title, slug, img }, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className={styles['img_cell']}>
                      <div className={styles['img_wrapper']}>
                        <img src={img} />
                      </div>
                      <div className={styles['title']}>
                        <p>{title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{slug}</p>
                  </td>
                  <td>
                    <p>{createdAt}</p>
                  </td>
                  <td>
                    <span>
                      <span aria-hidden className={styles['tags']}></span>
                      <span className={styles['tag_container']}>{category}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
