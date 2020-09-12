import { useState } from 'react';
import getConfig from 'next/config';
import useSWR from 'swr';

import Modal from '@components/Modal';
import ContentForm from '@components/Forms/createContent';
import Table from '@components/Table';
import ViewGrid from '@components/ViewGrid';

import { createContent } from '../../api/content';

import styles from './styles.scss';

const { publicRuntimeConfig: conf } = getConfig();

const emptyContentData = { title: '', row: 2, column: 3 };

const SubContent: React.FC = () => {
  const [modalActive, setModalActive] = useState(false);

  const [viewMode, setViewMode] = useState('table');

  const { data: content } = useSWR(`${conf.api.url}getContent`);

  console.log(content);

  async function submitForm(formData) {
    const res = await createContent(formData);
    if (res) console.log('saved content');
  }

  return (
    <div>
      <div className={styles['add_content_wrapper']}>
        <button onClick={() => setModalActive(true)}>add content</button>
        <button onClick={() => setViewMode('table')}>table mode</button>
        <button onClick={() => setViewMode('grid')}>grid mode</button>
      </div>
      <Modal active={modalActive} close={() => setModalActive(false)}>
        <ContentForm submitForm={(formData) => submitForm(formData)} formData={emptyContentData} />
      </Modal>
      {content &&
        content.length > 0 &&
        (viewMode === 'table' ? <Table tableData={content} /> : <ViewGrid gridData={content} />)}
    </div>
  );
};

export default SubContent;
