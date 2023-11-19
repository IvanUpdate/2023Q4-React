import React from 'react';
import { showDetails } from '../../../redux/pageSlice';
import styles from './characterItem.module.css';

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



  const handleClickItem = () => {
    showDetails(String(id));
  };

  return (
    <article>
    <div className={styles.card} onClick={() => handleClickItem()} data-testid='div-container'>
      <p className={styles.intro}>{`${name} from ${location}`}</p>
      <img className={styles.image} src={image} alt={name} />
      <p className={styles.info}>{`Status: ${status}`}</p>
      <p className={styles.info}>{`Type: ${type}`}</p>
      <p className={styles.info}>{`Species: ${species}`}</p>
    </div>
    </article>
  );
};

export default CharacterItem;
