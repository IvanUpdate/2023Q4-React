import { Character } from '../../../types/character';
import styles from './details.module.css';

interface DetailsProps {
  character: Character;
  exitDetails: () => void;
}

const Details: React.FC<DetailsProps> = ({ character, exitDetails }) => {
  const {
    name,
    status,
    gender,
    species,
    type,
    origin,
    location,
    image,
    episode,
  } = character;

  const handleClick = () => {
    exitDetails();
  };

  return (
    <div className={styles.card}>
      <div id="icon" className={styles.Icon} onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className={styles.intro}>{`${name} from ${location.name}`}</p>
      <img className={styles.image} src={image} alt={name} />
      <p className={styles.info}>{`Status: ${status}`}</p>
      <p className={styles.info}>{`Gender: ${gender}`}</p>
      <p className={styles.info}>{`Type: ${type}`}</p>
      <p
        className={styles.info}
      >{`Character's origin location: ${origin.name}`}</p>
      <div className={styles.info}>
        List of episodes in which this character appeared:
        <ul>
          {episode.map((ep) => (
            <li key={ep}>{ep.slice(40)} episode</li>
          ))}
        </ul>
      </div>
      <p className={styles.info}>{`Species: ${species}`}</p>
    </div>
  );
};

export default Details;
