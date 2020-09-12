import { useState } from 'react';
import getConfig from 'next/config';
import fetch from 'unfetch';
import useSWR from 'swr';

import Input from '@components/Input';
import Select from '@components/Select';

import styles from './styles.scss';

const defaultFormValues = {
  search: '',
  category: '',
};

const { publicRuntimeConfig: conf } = getConfig();
const fetcher = (url) => fetch(url).then((r) => r.json());

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

export default TableFilter;
