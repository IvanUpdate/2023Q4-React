import { Component } from 'react';
import styles from './character.module.css';

type CharacterProps = {
  name: string;
  status: string;
  type: string;
  location: string;
  image: string;
};

export class Character extends Component<CharacterProps> {
  render() {
    const {name, status, type, location, image} = this.props;

    return (
      <div className={styles.card}>
        <p className={styles.intro}>{`${name} from ${location}`}</p>
        <img className={styles.image} src={image} alt={name} />
        <p className={styles.status}>{`Status: ${status}`}</p>
        <p className={styles.status}>{`Type: ${type}`}</p>
      </div>
    );
  }
}