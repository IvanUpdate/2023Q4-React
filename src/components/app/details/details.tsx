import { Character } from '../../../types/character';
import styles from './details.module.css';

interface DetailsProps {
  character: Character;
}

const Details: React.FC<DetailsProps> = ({ character }) => {
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

  const handleDivClick = () => {
    console.log(name);
  };

  return (
    <div className={styles.card} onClick={handleDivClick}>
      <p className={styles.intro}>{`${name} from ${location.name}`}</p>
      <img className={styles.image} src={image} alt={name} />
      <p className={styles.info}>{`Status: ${status}`}</p>
      <p className={styles.info}>{`Gender: ${gender}`}</p>
      <p className={styles.info}>{`Type: ${type}`}</p>
      <p
        className={styles.info}
      >{`Character's origin location: ${origin.name}`}</p>
      <p className={styles.info}>
        List of episodes in which this character appeared:
        <ul>
          {episode.map((ep) => (
            <li key={ep}>{ep}</li>
          ))}
        </ul>
      </p>
      <p className={styles.info}>{`Species: ${species}`}</p>
    </div>
  );
};

export default Details;
