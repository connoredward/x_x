import { useState } from 'react';

import classnames from 'classnames';

import { deletePost } from '../../api/posts';
import { Post } from '../../interfaces/';

import styles from './styles.scss';

type Props = {
  active: boolean;
  data?: Post;
  close: (...args: any[]) => void;
};

const SideModal: React.FC<any> = ({ active, data, close }: Props) => {
  const [popupActive, setPopupActive] = useState(false);
  const { title, slug, _id, img, video, createdAt, updatedAt, row, column, category } = data;
  function closeModal() {
    close();
    setPopupActive(false);
  }
  async function deleteItem() {
    const res = await deletePost({ _id });
    if (res) closeModal();
  }

  return (
    <div className={classnames(styles['side_modal'], styles[active ? 'active' : undefined])}>
      <div className={styles['background_modal']} onClick={closeModal} />
      <div className={styles['modal_content']}>
        <div className={styles['header']}>
          <h1>{title}</h1>
          <div>
            <a href={`/posts/${_id}`}>Edit</a> | <button onClick={() => setPopupActive(true)}>Delete</button>
          </div>
        </div>

        {popupActive && (
          <div className={styles['delete_popup']}>
            <span>are you sure you want to delete: {title}?</span>
            <button onClick={deleteItem}>Yes</button>
            <button onClick={() => setPopupActive(false)}>No</button>
          </div>
        )}

        <table>
          <tbody>
            <tr>
              <td>
                <span>slug: {slug}</span>
              </td>
              <td>
                <span>category: {category}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>status: published</span>
              </td>
              <td>
                <span>created at: {createdAt && createdAt.substring(0, 10)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>last updated: {updatedAt && updatedAt.substring(0, 10)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <h2>styling options</h2>
              </td>
            </tr>
            <tr>
              <td>
                <span>row: {row}</span>
              </td>
              <td>
                <span>column: {column}</span>
              </td>
            </tr>
            <tr>
              <td>
                <h2>media</h2>
              </td>
            </tr>
            <tr>
              <td>
                <img src={img} />
              </td>
              <td>
                {video && (
                  <video controls>
                    <source src={video} type="video/mp4" />
                  </video>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SideModal;
