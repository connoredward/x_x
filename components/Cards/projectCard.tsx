import { deleteProject } from '../../api/projects';

import styles from './styles.scss';

type Props = {
  title: string;
  _id: string;
  img: string;
};

const ProjectCard: React.FC<any> = ({ title, _id, img }: Props) => {
  async function deleteProj() {
    const response = await deleteProject({ _id });
  }

  return (
    <div className={styles['project_card']}>
      <button onClick={deleteProj}>delete this</button>
      <img src={img} alt="Sunset in the mountains" />
      <div className={styles['card_content']}>
        <div>{title}</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis
          eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className={styles['card_sub_content']}>
        <span>#photography</span>
        <span>#travel</span>
        <span>#winter</span>
      </div>
    </div>
  );
};

export default ProjectCard;
