import styles from './styles.scss';

type Props = {
  title: string;
};

const ProjectCard: React.FC<any> = ({ title }: Props) => (
  <div className={styles['project_card']}>
    <img
      src="data:image/jpeg;base64,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"
      alt="Sunset in the mountains"
    />
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

export default ProjectCard;
