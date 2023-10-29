import { Component } from 'react';
import styles from './characterItem.module.css';

type CharacterProps = {
  name: string;
  status: string;
  type: string;
  location: string;
  image: string;
  species: string;
};

export class CharacterItem extends Component<CharacterProps> {
  render() {
    const {name, status, type, location, image, species} = this.props;

    return (
      <div className={styles.card}>
        <p className={styles.intro}>{`${name} from ${location}`}</p>
        <img className={styles.image} src={image} alt={name} />
        <p className={styles.info}>{`Status: ${status}`}</p>
        <p className={styles.info}>{`Type: ${type}`}</p>
        <p className={styles.info}>{`Species: ${species}`}</p>
      </div>
    );
  }
}