import { Component } from 'react';
import styles from './search.module.css';

type SearchProps = {
  request: string;
  handleSearch: (request: string) => void;
};

type SearchState = {
  input: string;
};

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      input: this.props.request,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  render() {
    const handleSearch = this.props.handleSearch;

    return (
      <div className={styles.search}>
        <div className={styles.wrapperInput}>
          <input
            value={this.state.input}
            onChange={this.handleInputChange}
            type="text"
            className={styles.searchInput}
            placeholder={this.state.input}
          />
        </div>
        <div className={styles.wrapperButton}>
          <button
            className={styles.searchButton}
            onClick={() => handleSearch(this.state.input)}
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
  }
}
