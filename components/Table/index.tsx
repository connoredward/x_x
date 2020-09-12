import { useState } from 'react';
import classnames from 'classnames';

import TableFilter from '@components/Table/filter';

import { Post } from '../../interfaces';

import styles from './styles.scss';
import { table } from 'console';

type Props = {
  type: string;
  tableHeaders: string[];
  tableData: Post[];
  deleteTable: (...args: any[]) => void;
  copyTable: (...args: any[]) => void;
  openSideModal: (...args: any[]) => void;
  deletePost: (...args: any[]) => void;
};

const Table: React.FC<any> = ({
  type,
  tableHeaders,
  tableData,
  deleteTable,
  copyTable,
  openSideModal,
  deletePost,
}: Props) => {
  const [checkedValues, setCheckedValues] = useState([]);
  console.log(tableData);

  async function deleteAll() {
    await deleteTable(checkedValues);
    setCheckedValues([]);
    const allCheck = document.getElementsByName('allValue')[0] as HTMLInputElement;
    allCheck.checked = false;
    const checkboxes = document.getElementsByName('tableValue');
    for (let i = 0, n = checkboxes.length; i < n; i++) {
      const ele = checkboxes[i] as HTMLInputElement;
      ele.checked = false;
    }
  }

  function handleChangeAll(event) {
    const checkboxes = document.getElementsByName('tableValue');
    if (event.target.checked) {
      setCheckedValues(
        tableData.map(({ _id }) => {
          return _id;
        })
      );
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        const ele = checkboxes[i] as HTMLInputElement;
        ele.checked = true;
      }
    } else {
      setCheckedValues([]);
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        const ele = checkboxes[i] as HTMLInputElement;
        ele.checked = false;
      }
    }
  }

  function handleChange(event) {
    event.persist();
    const ele = document.getElementsByName('allValue')[0] as HTMLInputElement;
    ele.checked = false;
    if (event.target.checked) setCheckedValues((prev) => [...prev, event.target.value]);
    else setCheckedValues((prev) => prev.filter((item) => item !== event.target.value));
  }

  return (
    <div className={styles['table_wrapper']}>
      <TableFilter />
      <div>
        <div className={styles['table_option']}>
          <div className={styles['content']}>
            <h1>{type} Table</h1>
            <div className={styles['options']}>
              <a href={`/${type}/create`}>+ Add</a>
            </div>
          </div>

          {checkedValues.length > 0 && (
            <div className={styles['checked_popup']}>
              <p>
                Select <span>{checkedValues.length}</span> items
              </p>
              {checkedValues.length === 1 && <button onClick={() => copyTable(checkedValues[0])}>Copy</button>}
              <button onClick={deleteAll}>Delete</button>
            </div>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input onChange={handleChangeAll} type="checkbox" name="allValue" />
              </th>
              {tableHeaders.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map(({ tag, createdAt, title, slug, _id, status }, index) => {
              console.log('tag', tag);
              return (
                <tr key={index}>
                  <td>
                    <input onChange={handleChange} type="checkbox" name="tableValue" value={_id} />
                  </td>
                  <td>
                    <p>{title}</p>
                  </td>
                  <td>
                    <p>{slug}</p>
                  </td>
                  <td>
                    <p>{createdAt && createdAt.substring(0, 10)}</p>
                  </td>
                  {tag && (
                    <td>
                      <span className={styles['tags_wrapper']} style={{ color: tag.color }}>
                        <span aria-hidden className={styles['tags']} style={{ backgroundColor: tag.color }}></span>
                        <span className={styles['tag_container']}>{tag.title}</span>
                      </span>
                    </td>
                  )}
                  <td className={styles['status_wrapper']}>
                    <p>{status}</p>
                    <div className={classnames(styles['status_icon'], styles[status])} />
                  </td>
                  <td>
                    <a href={`/${type}/${_id}`}>Edit</a> | <button onClick={() => deletePost({ _id })}>Delete</button> |{' '}
                    <button onClick={() => openSideModal(_id)}>View</button>
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
