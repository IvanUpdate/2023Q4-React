import React from 'react';
import styles from './search.module.css';
import { useAppContext } from '../AppContext';

type SearchProps = {
  handleSearch: (request: string) => void;
};

const Search: React.FC<SearchProps> = (props) => {
  const { input, setInput } = useAppContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.search}>
      <div className={styles.wrapperInput}>
        <input
          data-testid="search-input"
          value={input}
          onChange={handleInputChange}
          type="text"
          className={styles.searchInput}
          placeholder={input}
        />
      </div>
      <div className={styles.wrapperButton}>
        <button
          data-testid="search-button"
          className={styles.searchButton}
          onClick={() => props.handleSearch(input)}
        >
          <div className={styles.apply}>
            <div className={`${styles.scale} ${styles.rotate1}`}>s</div>
            <div className={`${styles.scale} ${styles.rotate2}`}>e</div>
            <div className={`${styles.scale} ${styles.rotate3}`}>a</div>
            <div className={`${styles.scale} ${styles.rotate4}`}>r</div>
            <div className={`${styles.scale} ${styles.rotate5}`}>c</div>
            <div className={`${styles.scale} ${styles.rotate6}`}>h</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Search;
