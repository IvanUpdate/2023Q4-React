import React from 'react';
import styles from './characterItem.module.css';

type CharacterProps = {
  id: number;
  name: string;
  status: string;
  type: string;
  location: string;
  image: string;
  species: string;
  changeCharacter: (id: number) => void;
};

const CharacterItem: React.FC<CharacterProps> = ({
  id,
  name,
  status,
  type,
  location,
  image,
  species,
  changeCharacter,
}) => {
  const handleDivClick = (id: number) => {
    changeCharacter(id);
  };

  return (
    <div className={styles.card} onClick={() => handleDivClick(id)}>
      <p className={styles.intro}>{`${name} from ${location}`}</p>
      <img className={styles.image} src={image} alt={name} />
      <p className={styles.info}>{`Status: ${status}`}</p>
      <p className={styles.info}>{`Type: ${type}`}</p>
      <p className={styles.info}>{`Species: ${species}`}</p>
    </div>
  );
};

export default CharacterItem;
