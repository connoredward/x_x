import styles from './styles.scss';

type Props = {
  title: string;
  _id: string;
  img: string;
};

const PostCard: React.FC<any> = ({ title, _id, img }: Props) => (
  <div className={styles['post_card']}>
    <img src={img} alt="Sunset in the mountains" />
    <div className={styles['card_content']}>
      <div>{title}</div>
      {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis
        eaque, exercitationem praesentium nihil.
      </p> */}
    </div>
    <a href={`/posts/${_id}`}>EDIT</a>
    {/* <div className={styles['card_sub_content']}>
      <span>#photography</span>
      <span>#travel</span>
      <span>#winter</span>
    </div> */}
  </div>
);

export default PostCard;
