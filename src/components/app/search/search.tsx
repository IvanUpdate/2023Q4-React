import { Component } from 'react';
import styles from './search.module.css';

type SearchProps = {
  request: string;
};

export class Search extends Component<SearchProps> {
  render() {
    const request = this.props.request;

    return (
      <div className={styles.search}>
        <div className={styles.wrapperInput}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={request}
        />
        </div>
        <div className={styles.wrapperButton}>
        <button>
          <a href="#">
            <div className={`${styles.scale} ${styles.rotate1}`}>s</div>
            <div className={`${styles.scale} ${styles.rotate2}`}>e</div>
            <div className={`${styles.scale} ${styles.rotate3}`}>a</div>
            <div className={`${styles.scale} ${styles.rotate4}`}>r</div>
            <div className={`${styles.scale} ${styles.rotate5}`}>c</div>
            <div className={`${styles.scale} ${styles.rotate6}`}>h</div>
          </a>
        </button>
        </div>
      </div>
    );
  }
}
