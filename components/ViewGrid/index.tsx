// import { useEffect, useState } from 'react';
// import { ListManager } from 'react-beautiful-dnd-grid';

// import { Content } from '../../interfaces';

// import styles from './styles.scss';

// type Props = {
//   gridData: Content[]
// };

// const ListElement = ({ item }) => (
//   <div className={styles['grid_item']} style={{ backgroundImage: `url(${item.img})` }} >
//     sdf
//   </div>
// );

const ViewGrid: React.FC<any> = () => {
  // const [gridList, setGridList] = useState(gridData);
  // useEffect(() => {
  //   setGridList(gridData);
  // }, [gridData]);

  // function endDrag(start, end) {
  //   console.log('orginal pos', start)
  //   console.log('end', end)
  // }

  return (
    <div></div>
    // <ListManager
    //   items={gridList}
    //   direction="horizontal"
    //   maxItems={3}
    //   render={item => <ListElement item={item} />}
    //   onDragEnd={endDrag}
    // />
  );
};

export default ViewGrid;
