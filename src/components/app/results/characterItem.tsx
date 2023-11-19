import React from 'react';
import { showDetails } from '../../../redux/pageSlice';
import styles from './characterItem.module.css';
import { useAppDispatch } from '../hook';
import { Link } from 'react-router-dom';

type CharacterProps = {
  id: number;
  name: string;
  status: string;
  type: string;
  location: string;
  image: string;
  species: string;
};

const CharacterItem: React.FC<CharacterProps> = ({
  id,
  name,
  status,
  type,
  location,
  image,
  species,
}) => {


  const dispatch = useAppDispatch();


  const handleClickItem = () => {
    console.log(id);
    dispatch(showDetails(String(id)));
  };

  return (
    <Link to={`details/${id}`}>
    <div className={styles.card} onClick={() => handleClickItem()} data-testid='div-container'>
      <p className={styles.intro}>{`${name} from ${location}`}</p>
      <img className={styles.image} src={image} alt={name} />
      <p className={styles.info}>{`Status: ${status}`}</p>
      <p className={styles.info}>{`Type: ${type}`}</p>
      <p className={styles.info}>{`Species: ${species}`}</p>
    </div>
    </Link>
  );
};

export default CharacterItem;
