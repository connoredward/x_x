import { useState } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Input from '@components/Input';
import Select from '@components/Select';

import { deletePost } from '../../api/posts';
import { Post } from '../../interfaces';

import styles from './styles.scss';

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

type Props = {
  tableData: Post[];
  openSide: (...args: any[]) => void;
};

const defaultFormValues = {
  search: '',
  category: '',
};

const TableFilter: React.FC<any> = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);

  const { data, error } = useSWR(`${conf.api.url}getCategory`, fetcher);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues);
  }

  function handleChange(event) {
    const changedValue = { [event.target.name]: event.target.value };
    setFormValues((prevVal) => ({ ...prevVal, ...changedValue }));
  }

  if (error || !data) return <div>Getting categories...</div>;
  return (
    <div className={styles['table_search']}>
      <form onSubmit={handleSubmit}>
        <div className={styles['inputs_container']}>
          <Input
            title={'search'}
            value={formValues.search}
            handleChange={handleChange}
            className={styles['input_changed']}
          />
          <Select
            handleChange={handleChange}
            name={'category'}
            data={data.map(({ slug }) => {
              return slug;
            })}
            className={styles['input_changed']}
          />
        </div>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
};

const Table: React.FC<any> = ({ tableData, openSide }: Props) => {
  const [checkedValues, setCheckedValues] = useState([]);

  function handleChange(event) {
    event.persist();
    const ele = document.getElementsByName('allValue')[0] as HTMLInputElement;
    ele.checked = false;
    if (event.target.checked) setCheckedValues((prev) => [...prev, event.target.value]);
    else setCheckedValues((prev) => prev.filter((item) => item !== event.target.value));
  }

  function handleChangeAll(event) {
    event.persist();
    const checkboxes = document.getElementsByName('tableValue');
    if (event.target.checked) {
      setCheckedValues(event.target.value.split(','));
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

  return (
    <div className={styles['table_wrapper']}>
      <TableFilter />
      <div>
        <div className={styles['table_option']}>
          <div className={styles['content']}>
            <h1>Post Table</h1>
            <div className={styles['options']}>
              <a href="/posts/create">+ Add</a>
            </div>
          </div>

          {checkedValues.length > 0 && (
            <div className={styles['checked_popup']}>
              <p>
                Select <span>{checkedValues.length}</span> items
              </p>
              <button>Delete</button>
            </div>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input
                  onChange={handleChangeAll}
                  type="checkbox"
                  name="allValue"
                  value={tableData.map(({ _id }) => {
                    return _id;
                  })}
                />
              </th>
              <th>Name</th>
              <th>Slug</th>
              <th>Created at</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => {
              const { category, createdAt, title, slug, _id } = item;
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
                  <td>
                    <span>
                      <span aria-hidden className={styles['tags']}></span>
                      <span className={styles['tag_container']}>{category}</span>
                    </span>
                  </td>
                  <td>
                    <a href={`/posts/${_id}`}>Edit</a> | <button onClick={() => deletePost({ _id })}>Delete</button> |{' '}
                    <button onClick={() => openSide(item)}>View</button>
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
