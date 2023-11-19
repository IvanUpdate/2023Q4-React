import { hideDetails, setStatusDetails } from '../../../redux/pageSlice';
import { useGetCharacterByIdQuery } from '../../../redux/services/rickApi';
import styles from './details.module.css';
import { useAppDispatch } from '../hook';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type DetailsProps = {
  id: string;
}

const Details: React.FC<DetailsProps> = ({id}) => {

  const {data, isLoading} = useGetCharacterByIdQuery(id);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatusDetails('pending'));
    } else if (!data) {
      dispatch(setStatusDetails('rejected'));
    } else if (data) {
      dispatch(setStatusDetails('fulfilled'));
    }
  }, [isLoading, data, dispatch]);

  if (!data) {
    return false;
  }

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
  } = data;

  const handleExitIcon = () => {
    dispatch(hideDetails());
    navigate(-1);
  };

  return (
    <div className={styles.card}>
      <div data-testid="icon" className={styles.Icon} onClick={handleExitIcon}>
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
